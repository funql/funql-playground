import * as React from "react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@workspace/ui/components/resizable";
import {funqlPlaygroundApiSpec} from "@/config/spec";
import {SpecificationProvider} from "@/app/[locale]/(app)/(home)/_hooks/useSpecification";
import SidebarSection from "@/app/[locale]/(app)/(home)/_components/sidebar/SidebarSection";
import ContentSection from "@/app/[locale]/(app)/(home)/_components/ContentSection";
import {EditorStateProvider} from "@/app/[locale]/(app)/(home)/_hooks/useEditorState";

export default function HomePage() {
  return (
    <SpecificationProvider specification={funqlPlaygroundApiSpec} initialSelectedItemId={funqlPlaygroundApiSpec.id}>
      <ResizablePanelGroup
        direction="horizontal"
        className="!h-[calc(100svh-var(--header-height))] bg-sidebar !overflow-visible"
      >
        <ResizablePanel
          defaultSize={15}
          minSize={15}
          className="flex-col pt-2 hidden md:flex md:min-w-48 xl:min-w-0"
        >
          <SidebarSection/>
        </ResizablePanel>
        <ResizableHandle
          className="bg-transparent data-[resize-handle-active]:bg-primary data-[resize-handle-state=hover]:bg-primary after:z-10 after:transition-all mt-4 hidden md:flex"
        />
        <ResizablePanel
          defaultSize={85}
          minSize={15}
          className="flex flex-col md:drop-shadow-2xl"
        >
          <EditorStateProvider>
            <ContentSection/>
          </EditorStateProvider>
        </ResizablePanel>
      </ResizablePanelGroup>
    </SpecificationProvider>
  )
}
