"use client"

import React from "react";
import {cn} from "@workspace/ui/lib/utils";
import {ResizablePanelTrigger} from "@workspace/ui/components/resizable";
import {ArrowRightLeft, ChevronsUp} from "lucide-react";
import {Button} from "@workspace/ui/components/button";
import ResponseMetadata from "@/app/[locale]/(app)/(home)/_components/request-item/response/ResponseMetadata";
import {TabsList, TabsTrigger} from "@workspace/ui/components/tabs";
import {Separator} from "@workspace/ui/components/separator";
import {useEditorState} from "@/app/[locale]/(app)/(home)/_hooks/useEditorState";
import {isFetchResponse} from "@/lib/request";
import {useTranslations} from "next-intl";

export default function ResponseHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("HomePage.response.ResponseHeader")

  const { activeRequest } = useEditorState()

  return (
    <div
      className={cn(
        "flex items-center justify-between !h-[var(--response-header-height)] ps-4 pe-2 text-muted-foreground text-sm",
        className
      )}
      {...props}
    >
      <div className="flex h-full items-center gap-2">
        <ResizablePanelTrigger
          className={cn(
            "inline-flex items-center gap-1 hover:text-foreground",
            activeRequest?.response && "hidden sm:inline-flex"
          )}
        >
          <ArrowRightLeft className="size-4"/>
          {t("titleText")}
        </ResizablePanelTrigger>

        {activeRequest?.response && (
          <>
            <Separator orientation="vertical" className="max-h-4 hidden sm:block"/>

            <ResponseTabsList/>
          </>
        )}
      </div>


      <div className="flex gap-1 items-center">
        <ResponseMetadata/>

        <ResizablePanelTrigger asChild>
          <Button variant="ghost" size="icon">
            <ChevronsUp
              className="transition-transform rotate-180 group-data-[panel-size=0.0]/panel:rotate-0"
            />
          </Button>
        </ResizablePanelTrigger>
      </div>
    </div>
  )
}

function ResponseTabsList() {
  const t = useTranslations("HomePage.response.ResponseHeader.tabs")

  const { activeRequest } = useEditorState()
  const fetchResponse = activeRequest?.response && isFetchResponse(activeRequest.response)
    ? activeRequest.response
    : undefined

  return (
    <TabsList className="gap-3 p-0">
      <TabsTrigger value="body" className="gap-1">
        {t("bodyText")}
        {fetchResponse?.body.length && <div className="bg-success rounded-full size-1.5"/> }
      </TabsTrigger>
      <TabsTrigger value="headers" className="gap-1">
        {t("headersText")}
        {fetchResponse?.headers.length && <span className="text-success">{`(${fetchResponse.headers.length})`}</span>}
      </TabsTrigger>
    </TabsList>
  )
}