"use client"

import {useEditorState} from "@/app/[locale]/(app)/(home)/_hooks/useEditorState";
import * as React from "react";
import {cn} from "@workspace/ui/lib/utils";
import ResponseNoResponse from "@/app/[locale]/(app)/(home)/_components/response/ResponseNoResponse";
import ResponseBodyTab from "@/app/[locale]/(app)/(home)/_components/response/ResponseBodyTab";
import ResponseHeadersTab from "@/app/[locale]/(app)/(home)/_components/response/ResponseHeadersTab";

export default function ResponseContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { activeRequest } = useEditorState()

  return (
    <div
      className={cn(
        "flex flex-col flex-1 h-0 w-full overflow-auto",
        activeRequest.executing ? "opacity-50" : "",
        className
      )}
      {...props}
    >
      {!activeRequest.response && (
        <ResponseNoResponse/>
      )}

      {activeRequest.response && (
        <>
          <ResponseBodyTab/>

          <ResponseHeadersTab/>
        </>
      )}
    </div>
  )
}