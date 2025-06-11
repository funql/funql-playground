import {minifyFunQL} from "@/lib/utils/funql-utils";
import {searchParamsToString} from "@/lib/utils/http-utils";

export type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS"
export type KeyValue = [string, string]

export type Request = {
  url: string
  method: RequestMethod
  body: string
  pathParameters: KeyValue[]
  queryParameters: KeyValue[]
  headers: KeyValue[]
}

export type RequestState = { id: string } & Request & {
  executing: boolean
  response?: RequestResponse,
  changeId?: string
}

export function buildFullUrl(request: Request): string {
  const params: KeyValue[] = request.queryParameters
    .map(([key, value]) => ([key, minifyFunQL(value)]))

  return `${request.url}?${searchParamsToString(params)}`
}

export type RequestResponse = FetchResponse | ErrorResponse

export type FetchResponse = {
  responseTimeMillis: number
  statusCode: number
  body: string
  headers: KeyValue[]
}

export type ErrorResponse = {
  error: Error
}

export function isFetchResponse(response: RequestResponse): response is FetchResponse {
  return "statusCode" in response
}

export function isErrorResponse(response: RequestResponse): response is ErrorResponse {
  return "error" in response
}