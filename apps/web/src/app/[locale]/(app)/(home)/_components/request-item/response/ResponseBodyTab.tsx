"use client"

import React from "react";
import {TabsContent} from "@workspace/ui/components/tabs";
import {json} from "@codemirror/lang-json";
import CodeEditor from "@/components/code/CodeEditor";
import {cn} from "@workspace/ui/lib/utils";
import {useEditorState} from "@/app/[locale]/(app)/(home)/_hooks/useEditorState";
import {isFetchResponse} from "@/lib/request";

export default function ResponseBodyTab({
  className,
  ...props
}: Omit<React.ComponentProps<typeof TabsContent>, "value">) {
  const { activeRequest } = useEditorState()

  const bodyText = activeRequest?.response && isFetchResponse(activeRequest.response)
    ? activeRequest.response.body
    : ""

  return (
    <TabsContent
      value="body"
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
        extensions={[json()]}
        editable={false}
        value={bodyText}
      />
    </TabsContent>
  )
}