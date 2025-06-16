"use client"

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState
} from "react";
import {
  findItem, isRequest,
  Specification,
  SpecificationGroupItem,
  SpecificationRequestItem, walkItem,
} from "@/lib/specification";
import {useEditorStorage} from "@/app/[locale]/(app)/(home)/_hooks/useEditorStorage";
import useHistorySearchParams from "@/app/[locale]/(app)/(home)/_hooks/useHistorySearchParams";

type SpecificationContextProps = {
  specification: Specification,
  selectedRequest: [SpecificationGroupItem[], SpecificationRequestItem]
  selectedRequestId: string
  setSelectedRequestId: Dispatch<SetStateAction<string>>
}

const SpecificationContext = createContext<SpecificationContextProps | null>(null)

export function useSpecification() {
  const context = useContext(SpecificationContext)
  if (!context)
    throw new Error("useSpecification must be used within a <SpecificationProvider/>")

  return context
}

type SpecificationProviderProps = {
  specification: Specification,
  initialSelectedRequestId: string,
  children: ReactNode
}

export function SpecificationProvider({
  specification,
  initialSelectedRequestId,
  children
}: SpecificationProviderProps) {
  const [searchParams] = useHistorySearchParams()
  const [storageData] = useEditorStorage()

  const findInitialId = () => {
    const urlRequest = searchParams.find(it => it[0] === "request")?.at(1)
    let firstRequestId = undefined
    let foundUrlId = undefined
    let foundStoredId = undefined
    let foundInitialId = undefined
    for (const [, currentItem] of walkItem(specification)) {
      if (!firstRequestId && isRequest(currentItem)) {
        firstRequestId = currentItem.id
      }

      if (currentItem.id === initialSelectedRequestId) {
        foundInitialId = currentItem.id
        if (!urlRequest && !storageData?.selectedRequestId)
          break
      }

      if (currentItem.id === storageData?.selectedRequestId) {
        foundStoredId = currentItem.id
        if (!urlRequest)
          break
      }

      if (currentItem.id === urlRequest) {
        foundUrlId = currentItem.id
        break
      }
    }

    const foundId = foundUrlId ?? foundStoredId ?? foundInitialId ?? firstRequestId
    if (!foundId)
      throw new Error("No initial Request found")
    return foundId
  }

  const [selectedRequestId, setSelectedRequestId] = useState(findInitialId())
  const selectedRequest: [SpecificationGroupItem[], SpecificationRequestItem] = useMemo(() => {
    const foundItem = findItem(specification, selectedRequestId)
    if (!foundItem || !isRequest(foundItem[1]))
      throw new Error(`selectedRequestId '${selectedRequestId}' was not found in specification`)

    return [foundItem[0], foundItem[1]]
  }, [selectedRequestId, specification])

  return (
    <SpecificationContext.Provider
      value={{
        specification,
        selectedRequest,
        selectedRequestId,
        setSelectedRequestId
      }}
    >
      {children}
    </SpecificationContext.Provider>
  )
}