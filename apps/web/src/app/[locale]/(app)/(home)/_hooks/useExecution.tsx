"use client"

import {createContext, ReactNode, useCallback, useContext, useRef} from "react";
import {useEditorState} from "@/app/[locale]/(app)/(home)/_hooks/useEditorState";
import {buildFullUrl, FetchResponse} from "@/lib/request";
import {useDebounceFn} from "ahooks";

type ExecutionContextProps = {
  execute: (requestId: string) => void
  cancel: (requestId: string) => void
}

const ExecutionContext = createContext<ExecutionContextProps | null>(null)

export function useExecution() {
  const context = useContext(ExecutionContext)
  if (!context)
    throw new Error("useExecution must be used within a <ExecutionProvider/>")

  return context
}

type UpdateFn = ReturnType<typeof useEditorState>["updateRequest"]

type ExecutionState = {
  id: number
  update: UpdateFn
  cancelUpdate: () => void
}

type Executions = Record<string, ExecutionState>

type ExecutionProviderProps = {
  // Time in milliseconds to wait before updating a request after starting execution
  updateLatchTimeMillis?: number
  children: ReactNode
}

export function ExecutionProvider({
  updateLatchTimeMillis = 750,
  children
}: ExecutionProviderProps) {
  const { requests, updateRequest } = useEditorState()

  // Debounced updateRequestLatch to add minimum delay before response is set to avoid UI flicker
  const { run: updateLatch, cancel: cancelUpdateLatch }: { run: UpdateFn, cancel: () => void } = useDebounceFn(
    updateRequest,
    { wait: updateLatchTimeMillis, leading: true }
  )

  // Current requests being executed
  const executions = useRef<Executions>({})

  const execute = useCallback(async (requestId: string) => {
    // Get request
    const request = requests.find(it => it.id === requestId)
    console.log(request?.id)
    if (!request)
      return

    const currentUpdateLatch = updateLatch

    // Get or create execution state
    const state = executions.current[requestId] ??= {
      id: 0,
      update: currentUpdateLatch,
      cancelUpdate: cancelUpdateLatch
    }

    // Reset state
    state.cancelUpdate()
    state.id++
    state.update = currentUpdateLatch
    state.cancelUpdate = cancelUpdateLatch

    // Build URL to execute
    const executionUrl = buildFullUrl(request)
    // ID to check whether response is stale
    const executionId = state.id

    currentUpdateLatch(requestId, prev => {
      prev.executing = true
    })

    try {
      // Execute
      const startTime = performance.now()
      const response = await fetch(executionUrl, {
        method: request.method,
        body: request.method === "POST" ? request.body : undefined,
        headers: request.headers,
      })
      const responseTime = performance.now() - startTime

      // Early return if response is stale
      if (executionId !== executions.current[requestId]?.id)
        return

      const result: FetchResponse = {
        responseTimeMillis: responseTime,
        statusCode: response.status,
        body: await response.text(),
        headers: [...response.headers]
      }

      currentUpdateLatch(requestId, prev => {
        prev.executing = false
        prev.response = result
      })
    } catch (e) {
      // Early return if response is stale
      if (executionId !== executions.current[requestId]?.id)
        return

      const error: Error = e instanceof Error
        ? e
        : new Error(JSON.stringify(e, null, 2))

      currentUpdateLatch(requestId, prev => {
        prev.executing = false
        prev.response = {
          error: error
        }
      })
    }
  }, [requests, updateLatch, cancelUpdateLatch])

  const cancel = useCallback((requestId: string) => {
    const state = executions.current[requestId]
    if (state) {
      state.id++
      state.cancelUpdate()
      state.update(requestId, prev => {
        prev.executing = false
      })
    }
  }, [])

  return (
    <ExecutionContext.Provider
      value={{
        execute,
        cancel
      }}
    >
      {children}
    </ExecutionContext.Provider>
  )
}