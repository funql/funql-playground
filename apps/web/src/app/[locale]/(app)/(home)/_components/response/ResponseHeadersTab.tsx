"use client"

import React, {useMemo} from "react";
import {TabsContent} from "@workspace/ui/components/tabs";
import {useEditorState} from "@/app/[locale]/(app)/(home)/_hooks/useEditorState";
import {isFetchResponse} from "@/lib/request";
import {cn} from "@workspace/ui/lib/utils";
import CodeEditor from "@/components/code/CodeEditor";

export default function ResponseHeadersTab({
  className,
  ...props
}: Omit<React.ComponentProps<typeof TabsContent>, "value">) {
  const { activeRequest } = useEditorState()

  const headers = useMemo(() => {
    return activeRequest.response && isFetchResponse(activeRequest.response)
      ? activeRequest.response.headers
      : []
  }, [activeRequest.response])

  const headersText = useMemo(() => {
    let result = ""
    for (const [index, [key, value]] of headers.entries()) {
      result += `${key}: ${value}`
      if (index != headers.length - 1)
        result += "\n"
    }
    return result
  }, [headers])

  return (
    <TabsContent
      value="headers"
      className={cn(
        "flex flex-col flex-1 w-full h-0 data-[state=inactive]:hidden",
        className
      )}
      {...props}
    >
      <CodeEditor
        className="flex flex-1 shrink-0 w-full h-0"
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
        }}
        editable={false}
        value={headersText}
      />
    </TabsContent>
  )
}