import {KeyValue} from "@/lib/request";

export function encodeSearchParam(value: string): string {
  return encodeURIComponent(value)
    // Revert , as we can just use the unencoded version to match FunQL more closely
    .replace(/%2C/g,",")
    // Revert " as we can just use the unencoded version to match FunQL more closely
    .replace(/%22/g,"\"")
}

export function searchParamsToString(params: KeyValue[]): string {
  return params
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeSearchParam(value)}`)
    .join("&")
}