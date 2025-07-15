import React from "react";
import {cn} from "@workspace/ui/lib/utils";
import ResponseHeader from "@/app/[locale]/(app)/(home)/_components/request-item/response/ResponseHeader";
import ResponseContent from "@/app/[locale]/(app)/(home)/_components/request-item/response/ResponseContent";
import {Tabs} from "@workspace/ui/components/tabs";

type ResponseSectionProps = {

} & React.ComponentProps<"div">

export default function ResponseSection({
  className,
  ...props
}: ResponseSectionProps) {
  return (
    <div
      className={cn(
        "flex flex-1 h-0 flex-col",
        className
      )}
      {...props}
    >
      <Tabs
        className="flex flex-1 h-0 flex-col gap-0"
        defaultValue="body"
      >
        <ResponseHeader/>

        <ResponseContent/>
      </Tabs>
    </div>
  )
}