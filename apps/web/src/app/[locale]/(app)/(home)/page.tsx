import * as React from "react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@workspace/ui/components/resizable";
import {funqlPlaygroundApiSpec} from "@/config/spec";
import {SpecificationProvider} from "@/app/[locale]/(app)/(home)/_hooks/useSpecification";
import SidebarSection from "@/app/[locale]/(app)/(home)/_components/sidebar/SidebarSection";
import RequestSection from "@/app/[locale]/(app)/(home)/_components/request/RequestSection";
import ResponseSection from "@/app/[locale]/(app)/(home)/_components/response/ResponseSection";
import ExecuteResizableHandle from "@/app/[locale]/(app)/(home)/_components/ExecuteResizableHandle";
import {ExecutionProvider} from "@/app/[locale]/(app)/(home)/_hooks/useExecution";
import {Locale} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {EditorStateProvider} from "@/app/[locale]/(app)/(home)/_hooks/useEditorState";

type HomePageProps = {
  params: Promise<{locale: Locale}>
}

export default async function HomePage({
  params
}: HomePageProps) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <SpecificationProvider specification={funqlPlaygroundApiSpec} initialSelectedRequestId={"listSets"}>
      <EditorStateProvider>
        <ExecutionProvider>
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
              <ResizablePanelGroup
                direction="vertical"
                className="flex flex-col md:rounded-tl-2xl border-t md:border-l bg-background"
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
            </ResizablePanel>
          </ResizablePanelGroup>
        </ExecutionProvider>
      </EditorStateProvider>
    </SpecificationProvider>
  )
}
