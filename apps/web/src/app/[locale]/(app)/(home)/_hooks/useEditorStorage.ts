"use client"

import {useLocalStorageState} from "ahooks";
import {z} from "zod";

const KeyValueSchema = z.tuple([z.string(), z.string()])
const RequestStorageDataSchema = z.object({
  id: z.string(),
  body: z.string(),
  pathParameters: KeyValueSchema.array(),
  queryParameters: KeyValueSchema.array(),
  headers: KeyValueSchema.array(),
})
const EditorStorageDataSchema = z.object({
  selectedItemId: z.string(),
  requests: RequestStorageDataSchema.array(),
})

export type RequestStorageData = z.infer<typeof RequestStorageDataSchema>
export type EditorStorageData = z.infer<typeof EditorStorageDataSchema>

function parseEditorStorageData(text: string): EditorStorageData|undefined {
  const result = EditorStorageDataSchema.safeParse(JSON.parse(text))
  if (result.error)
    console.log(`Failed to parse LocalStorage '${text}': ${result.error}`)

  return result.data
}

const editorStateDataKey = "editorState"

export function useEditorStorage(): ReturnType<typeof useLocalStorageState<EditorStorageData|undefined>> {
  return useLocalStorageState<EditorStorageData|undefined>(
    editorStateDataKey,
    {
      deserializer: parseEditorStorageData
    }
  )
}