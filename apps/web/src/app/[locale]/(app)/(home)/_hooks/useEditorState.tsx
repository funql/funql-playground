"use client"

import {createContext, Dispatch, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {isRequest, Specification, SpecificationRequestItem, walkItem} from "@/lib/specification";
import {produce, WritableDraft} from "immer";
import {KeyValue, RequestState} from "@/lib/request";
import {useSpecification} from "@/app/[locale]/(app)/(home)/_hooks/useSpecification";
import {
  EditorStorageData,
  RequestStorageData,
  useEditorStorage
} from "@/app/[locale]/(app)/(home)/_hooks/useEditorStorage";
import useHistorySearchParams from "@/app/[locale]/(app)/(home)/_hooks/useHistorySearchParams";
import {useDebounceEffect} from "ahooks";

type EditorState = {
  requests: RequestState[]
  activeRequest: RequestState
  updateActiveRequest: (reducer: Dispatch<WritableDraft<RequestState>>) => void
  resetActiveRequest: () => void
  updateRequest: (id: string, reducer: Dispatch<WritableDraft<RequestState>>) => void
}

const EditorStateContext = createContext<EditorState | null>(null)

export function useEditorState() {
  const context = useContext(EditorStateContext)
  if (!context)
    throw new Error("useEditorState must be used within a <EditorStateProvider/>")

  return context
}

function restoreRequests(
  specification: Specification,
  selectedRequestItem: SpecificationRequestItem,
  editorStorage: EditorStorageData|undefined,
  searchParams: KeyValue[]
): RequestState[] {
  // Early return if no storage
  if (!editorStorage)
    return [buildRequestState(specification, selectedRequestItem, searchParams)]

  const requests: RequestState[] = []
  for (const [, item] of walkItem(specification)) {
    if (!isRequest(item))
      continue

    const storedRequest = editorStorage.requests.find(it => it.id === item.id)
    if (storedRequest) {
      const state = toRequestState(specification, item)
      // Update state from storage
      updateRequestStateForStorageData(state, storedRequest)
      // Update state from search params as they should override storage
      updateRequestStateForSearchParams(state, searchParams)
      requests.push(state)
    } else if (item.id === selectedRequestItem.id) {
      // Always add the selectedRequestItem even if not in storage
      requests.push(buildRequestState(specification, selectedRequestItem, searchParams))
    }
  }

  return requests
}

function updateRequestStateForStorageData(state: RequestState, storageData: RequestStorageData) {
  if (storageData.id === state.id) {
    state.queryParameters = state.queryParameters.map(([key, value]) => {
      return [key, storageData.queryParameters.find(it => it[0] === key)?.at(1) ?? value]
    })
    state.pathParameters = state.pathParameters.map(([key, value]) => {
      return [key, storageData.pathParameters.find(it => it[0] === key)?.at(1) ?? value]
    })
    state.headers = state.headers.map(([key, value]) => {
      return [key, storageData.headers.find(it => it[0] === key)?.at(1) ?? value]
    })
  }
}
function updateRequestStateForSearchParams(state: RequestState, searchParams: KeyValue[]) {
  if (searchParams.find(([key, value]) => key === "request" && value === state.id)) {
    state.queryParameters = state.queryParameters.map(([key, value]) => {
      return [key, searchParams.find(it => it[0] === key)?.at(1) ?? value]
    })
    state.pathParameters = state.pathParameters.map(([key, value]) => {
      return [key, searchParams.find(it => it[0] === key)?.at(1) ?? value]
    })
    state.headers = state.headers.map(([key, value]) => {
      return [key, searchParams.find(it => it[0] === key)?.at(1) ?? value]
    })
  }
}
function toRequestState(specification: Specification, item: SpecificationRequestItem): RequestState {
  return {
    ...item.request,
    id: item.id,
    url: specification.basePath + item.request.url,
    executing: false
  }
}

function buildRequestState(specification: Specification, item: SpecificationRequestItem, searchParams: KeyValue[]): RequestState {
  const state = toRequestState(specification, item)
  updateRequestStateForSearchParams(state, searchParams)

  return state
}

type EditorStateProviderProps = {
  children: ReactNode
}

export function EditorStateProvider({
  children
}: EditorStateProviderProps) {
  const [searchParams, setSearchParams] = useHistorySearchParams()
  const [editorStorage, setEditorStorage] = useEditorStorage()
  const { specification, selectedRequest: [, item] } = useSpecification()
  const [requests, setRequests] = useState<RequestState[]>(
    restoreRequests(specification, item, editorStorage, searchParams)
  )

  useEffect(() => {
    setRequests(produce(draft => {
      if (!draft.find(it => it.id === item.id)) {
        draft.push(buildRequestState(specification, item, searchParams))
      }
    }))
  }, [setRequests, item, specification, searchParams])

  const activeRequest = useMemo(() => {
    return requests.find(it => it.id === item.id) ?? buildRequestState(specification, item, searchParams)
  }, [requests, item, specification, searchParams])

  const updateActiveRequest = useCallback((reducer: Dispatch<WritableDraft<RequestState>>) => {
    setRequests(produce(draft => {
      const request = draft.find(it => it.id === item.id)
      if (request) {
        reducer(request)
      }
    }))
  }, [setRequests, item.id])

  const resetActiveRequest = useCallback(() => {
    setRequests(produce(draft => {
      const index = draft.findIndex(it => it.id === item.id)
      if (index !== -1) {
        draft[index] = toRequestState(specification, item)
        // Set random changeId to indicate request changed due to reset action
        draft[index].changeId = Math.random().toString()
      }
    }))
  }, [setRequests, specification, item])

  const updateRequest = useCallback((id: string, reducer: Dispatch<WritableDraft<RequestState>>) => {
    setRequests(produce(draft => {
      const request = draft.find(it => it.id === id)
      if (request) {
        reducer(request)
      }
    }))
  }, [setRequests])

  useDebounceEffect(() => {
    const parameters: KeyValue[] = [
      ["request", activeRequest.id]
    ]
    if (activeRequest.body !== item.request.body)
      parameters.push(["body", activeRequest.body])
    for (const [key, value] of activeRequest.queryParameters) {
      // Only add the KeyValue if it differs from the specification
      const specValue = item.request.queryParameters.find(it => it[0] === key)?.at(1)
      if (value !== specValue)
        parameters.push([key, value])
    }
    for (const [key, value] of activeRequest.pathParameters) {
      // Only add the KeyValue if it differs from the specification
      const specValue = item.request.pathParameters.find(it => it[0] === key)?.at(1)
      if (value !== specValue)
        parameters.push([key, value])
    }
    for (const [key, value] of activeRequest.headers) {
      // Only add the KeyValue if it differs from the specification
      const specValue = item.request.headers.find(it => it[0] === key)?.at(1)
      if (value !== specValue)
        parameters.push([key, value])
    }

    setSearchParams(parameters)
  }, [activeRequest.id, requests], { wait: 200 })

  useDebounceEffect(() => {
    setEditorStorage({
      selectedRequestId: activeRequest.id,
      requests: requests.map(it => ({
        id: it.id,
        body: it.body,
        pathParameters: it.pathParameters,
        queryParameters: it.queryParameters,
        headers: it.headers
      }))
    })
  }, [requests], { wait: 500 })

  return (
    <EditorStateContext.Provider
      value={{
        requests,
        activeRequest,
        updateActiveRequest,
        resetActiveRequest,
        updateRequest
      }}
    >
      {children}
    </EditorStateContext.Provider>
  )
}