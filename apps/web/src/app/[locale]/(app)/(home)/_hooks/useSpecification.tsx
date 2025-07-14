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
  SpecificationGroupItem, SpecificationItem,
  walkItem,
} from "@/lib/specification";
import useHistorySearchParams from "@/app/[locale]/(app)/(home)/_hooks/useHistorySearchParams";

type SpecificationContextProps = {
  specification: Specification,
  selectedItem: [SpecificationGroupItem[], SpecificationItem]
  selectedItemId: string
  setSelectedItemId: Dispatch<SetStateAction<string>>
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
  initialSelectedItemId: string,
  children: ReactNode
}

export function SpecificationProvider({
  specification,
  initialSelectedItemId,
  children
}: SpecificationProviderProps) {
  const [searchParams] = useHistorySearchParams()

  const findInitialId = () => {
    const urlItemId = searchParams.find(it => it[0] === "item")?.at(1)
    let firstRequestId = undefined
    let foundUrlId = undefined
    let foundStoredId = undefined
    let foundInitialId = undefined
    for (const [, currentItem] of walkItem(specification)) {
      if (!firstRequestId && isRequest(currentItem)) {
        firstRequestId = currentItem.id
      }

      if (currentItem.id === initialSelectedItemId) {
        foundInitialId = currentItem.id
        if (!urlItemId)
          break
      }

      if (currentItem.id === urlItemId) {
        foundUrlId = currentItem.id
        break
      }
    }

    const foundId = foundUrlId ?? foundStoredId ?? foundInitialId ?? firstRequestId
    if (!foundId)
      throw new Error("No initial item found")
    return foundId
  }

  const [selectedItemId, setSelectedItemId] = useState(findInitialId())
  const selectedItem: [SpecificationGroupItem[], SpecificationItem] = useMemo(() => {
    const foundItem = findItem(specification, selectedItemId)
    if (!foundItem)
      throw new Error(`selectedItemId '${selectedItemId}' was not found in specification`)

    return [foundItem[0], foundItem[1]]
  }, [selectedItemId, specification])

  return (
    <SpecificationContext.Provider
      value={{
        specification,
        selectedItem,
        selectedItemId,
        setSelectedItemId
      }}
    >
      {children}
    </SpecificationContext.Provider>
  )
}