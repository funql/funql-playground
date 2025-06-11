import React from "react";
import {cn} from "@workspace/ui/lib/utils";
import RequestHeader from "@/app/[locale]/(app)/(home)/_components/request/RequestHeader";
import RequestUrlBar from "@/app/[locale]/(app)/(home)/_components/request/RequestUrlBar";
import RequestQueryParameters from "@/app/[locale]/(app)/(home)/_components/request/RequestQueryParameters";

export default function RequestSection({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-1 h-0 flex-col",
        className
      )}
      {...props}
    >
      <RequestHeader/>

      <div className="flex flex-1 flex-col gap-4 overflow-auto px-4 pt-1">
        <RequestUrlBar/>

        <RequestQueryParameters/>
      </div>
    </div>
  )
}