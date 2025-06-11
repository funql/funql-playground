import {RequestMethod} from "@/lib/request";
import React from "react";
import {cn} from "@workspace/ui/lib/utils";

const methodInfos: Record<RequestMethod, { color: string, shortText: string, fullText: string }> = {
  "GET": { color: "text-request-method-get", shortText: "GET", fullText: "GET" },
  "POST": { color: "text-request-method-post", shortText: "POST", fullText: "POST" },
  "PUT": { color: "text-request-method-put", shortText: "PUT", fullText: "PUT" },
  "PATCH": { color: "text-request-method-patch", shortText: "PATCH", fullText: "PATCH" },
  "DELETE": { color: "text-request-method-delete", shortText: "DEL", fullText: "DELETE" },
  "HEAD": { color: "text-request-method-head", shortText: "HEAD", fullText: "HEAD" },
  "OPTIONS": { color: "text-request-method-options", shortText: "OPT", fullText: "OPTIONS" },
}

type RequestMethodTextProps = {
  method: RequestMethod
  fullText?: boolean
} & React.ComponentProps<"span">

export function RequestMethodText({
  method,
  fullText = false,
  className,
  ...props
}: RequestMethodTextProps) {
  const info = methodInfos[method]
  return (
    <span
      className={cn(
        "text-xs font-mono font-medium",
        info.color,
        className
      )}
      {...props}
    >
      {fullText ? info.fullText : info.shortText}
    </span>
  )
}