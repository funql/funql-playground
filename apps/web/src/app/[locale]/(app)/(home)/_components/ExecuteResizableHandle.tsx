"use client"

import {ResizableHandle} from "@workspace/ui/components/resizable";
import React from "react";
import {cn} from "@workspace/ui/lib/utils";
import {useEditorState} from "@/app/[locale]/(app)/(home)/_hooks/useEditorState";

export default function ExecuteResizableHandle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { activeRequest } = useEditorState()

  return (
    <div
      className={cn(
        "relative",
        className
      )}
      {...props}
    >
      <ResizableHandle
        className="peer data-[resize-handle-active]:bg-primary data-[resize-handle-state=hover]:bg-primary after:z-10 after:transition-all"
      />

      <div
        className={cn(
          "absolute top-0 left-0 w-full h-0.5 bg-blue-300 animate-progress origin-left z-20 peer-data-[resize-handle-state=hover]:h-1 peer-data-[resize-handle-state=hover]:-mt-[2px] peer-data-[resize-handle-active]:h-1 peer-data-[resize-handle-active]:-mt-[2px] transition-all pointer-events-none",
          !activeRequest.executing && "hidden"
        )}
      />
    </div>
  )
}