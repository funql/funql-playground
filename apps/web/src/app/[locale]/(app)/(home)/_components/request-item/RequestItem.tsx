import {ComponentProps} from "react";
import {ResizablePanel, ResizablePanelGroup} from "@workspace/ui/components/resizable";
import {cn} from "@workspace/ui/lib/utils";
import ExecuteResizableHandle from "@/app/[locale]/(app)/(home)/_components/ExecuteResizableHandle";
import ResponseSection from "@/app/[locale]/(app)/(home)/_components/request-item/response/ResponseSection";
import * as React from "react";
import RequestSection from "@/app/[locale]/(app)/(home)/_components/request-item/request/RequestSection";
import {ExecutionProvider} from "@/app/[locale]/(app)/(home)/_hooks/useExecution";

export default function RequestItem({
  className,
  ...props
} : Omit<ComponentProps<typeof ResizablePanelGroup>, "direction">) {
  return (
    <ExecutionProvider>
      <ResizablePanelGroup
        direction="vertical"
        className={cn(
          "flex flex-col",
          className
        )}
        {...props}
      >
        <ResizablePanel
          defaultSize={70}
          minSize={15}
          className="flex flex-col [--request-header-height:calc(theme(spacing.12))] min-h-[var(--request-header-height)]"
        >
          <RequestSection/>
        </ResizablePanel>
        <ExecuteResizableHandle/>
        <ResizablePanel
          defaultSize={30}
          collapsible={true}
          minSize={15}
          className="flex flex-col [--response-header-height:calc(theme(spacing.10))] min-h-[var(--response-header-height)]"
        >
          <ResponseSection/>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ExecutionProvider>
  )
}