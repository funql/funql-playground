"use client"

import React from "react";
import {cn} from "@workspace/ui/lib/utils";
import {useEditorState} from "@/app/[locale]/(app)/(home)/_hooks/useEditorState";
import {isFetchResponse} from "@/lib/request";
import {getReasonPhrase} from "http-status-codes";
import {useTranslations} from "next-intl";

export default function ResponseMetadata({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("HomePage.response.ResponseMetadata")

  const { activeRequest } = useEditorState()

  const fetchResponse = activeRequest.response && isFetchResponse(activeRequest.response)
    ? activeRequest.response
    : undefined

  return (
    <div
      className={cn(
        "flex gap-1 items-center",
        activeRequest.executing ? "hidden" : "",
        className
      )}
      {...props}
    >
      {fetchResponse && (
        <>
          <span
            className={cn(
            "text-xs text-mono font-semibold p-1 rounded-sm inline-flex gap-1",
              (fetchResponse.statusCode >= 100 && fetchResponse.statusCode < 200) && "bg-status-informational text-status-informational-foreground",
              (fetchResponse.statusCode >= 200 && fetchResponse.statusCode < 300) && "bg-status-success text-status-success-foreground",
              (fetchResponse.statusCode >= 300 && fetchResponse.statusCode < 400) && "bg-status-redirection text-status-redirection-foreground",
              (fetchResponse.statusCode >= 400 && fetchResponse.statusCode < 500) && "bg-status-client-error text-status-client-error-foreground",
              (fetchResponse.statusCode >= 500) && "bg-status-server-error text-status-server-error-foreground"
            )}
          >
            {fetchResponse.statusCode}
            <span className="hidden sm:block">
              {getReasonPhrase(fetchResponse.statusCode)}
            </span>
          </span>

          <div className="size-1 rounded-full bg-muted-foreground shrink-0"/>

          <span className="text-muted-foreground text-xs text-mono p-1 line-clamp-1">
            {t("responseTimeMillisText", { value: fetchResponse.responseTimeMillis.toFixed(0) })}
          </span>
        </>
      )}
    </div>
  )
}