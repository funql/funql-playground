"use client"

import * as React from "react"
import {GripVerticalIcon} from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@workspace/ui/lib/utils"
import {createContext, RefObject, useCallback, useContext, useRef, useState} from "react";
import {ImperativePanelHandle} from "react-resizable-panels";
import {Slot} from "@radix-ui/react-slot";

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

type PanelContextProps = {
  handle: RefObject<ImperativePanelHandle | null>,
  size?: number
}

const PanelContext = createContext<PanelContextProps | null>(null)

function usePanel() {
  const context = useContext(PanelContext)

  if (!context) {
    throw new Error("usePanel must be used within a <ResizablePanel />")
  }

  return context
}

function ResizablePanel({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  const ref = useRef<ImperativePanelHandle>(null)
  const [size, setSize] = useState<number|undefined>(undefined)

  return (
    <PanelContext.Provider
      value={{
        handle: ref,
        size: size
      }}
    >
      <ResizablePrimitive.Panel
        data-slot="resizable-panel"
        ref={ref}
        onResize={(size) => setSize(size)}
        className={cn(
          "group/panel",
          className
        )}
        {...props}
      />
    </PanelContext.Provider>
  )
}

function ResizablePanelTrigger({
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"

  const panel = usePanel()
  const onClick = useCallback(() => {
    const handle = panel.handle.current
    if (!handle)
      return

    if (handle.isExpanded()) {
      handle.collapse()
    } else {
      handle.expand()
    }
  }, [panel])

  return (
    <Comp
      data-slot="resizable-panel-trigger"
      onClick={onClick}
      {...props}
    />
  )
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
}

export { ResizablePanelGroup, usePanel, ResizablePanel, ResizablePanelTrigger, ResizableHandle }
