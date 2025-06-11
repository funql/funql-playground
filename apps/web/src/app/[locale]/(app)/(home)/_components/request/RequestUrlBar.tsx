"use client"

import React, {useMemo} from "react";
import {cn} from "@workspace/ui/lib/utils";
import {useEditorState} from "@/app/[locale]/(app)/(home)/_hooks/useEditorState";
import {RequestMethodText} from "@/components/request/RequestMethodText";
import {Input} from "@workspace/ui/components/input";
import RequestSendButton from "@/app/[locale]/(app)/(home)/_components/request/RequestSendButton";
import {buildFullUrl} from "@/lib/request";

export default function RequestUrlBar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { activeRequest } = useEditorState()

  const fullUrl = useMemo(() => {
    return buildFullUrl(activeRequest)
  }, [activeRequest])

  return (
    <div
      className={cn(
        "flex gap-2 items-center",
        className
      )}
      {...props}
    >
      <div className="relative flex-1 flex items-center h-9">
        <div className="h-6 w-16 flex items-center justify-center z-10 border-e">
          <RequestMethodText
            className="font-semibold mt-px"
            method={activeRequest.method}
            fullText={true}
          />
        </div>

        <Input
          className="absolute ps-18 rounded-sm shadow-none"
          value={fullUrl}
          readOnly
        />
      </div>

      <RequestSendButton className="rounded-sm min-w-20"/>
    </div>
  )
}