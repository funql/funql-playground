"use client"

import {useSearchParams} from "next/navigation";
import {useCallback, useMemo} from "react";
import {KeyValue} from "@/lib/request";
import {searchParamsToString} from "@/lib/utils/http-utils";

export default function useHistorySearchParams(): [KeyValue[], (params: KeyValue[]) => void] {
  const searchParams = useSearchParams()

  const items = useMemo(() => {
    return [...searchParams.entries()]
  }, [searchParams])

  const setItems = useCallback((params: KeyValue[]) => {
    window.history.replaceState(null, "", `?${searchParamsToString(params)}`)
  }, [])

  return [items, setItems]
}