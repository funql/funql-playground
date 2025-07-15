import React from "react";
import {cn} from "@workspace/ui/lib/utils";
import MobileSidebar from "@/app/[locale]/(app)/(home)/_components/sidebar/MobileSidebar";
import ItemBreadcrumb from "@/app/[locale]/(app)/(home)/_components/item/ItemBreadcrumb";
import RequestHeaderDropdown from "@/app/[locale]/(app)/(home)/_components/request-item/request/RequestHeaderDropdown";

export default function RequestHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-1 !h-[var(--request-header-height)] pe-2",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 h-full items-center gap-1 ps-2 md:ps-4">
        <MobileSidebar/>

        <ItemBreadcrumb className="flex-1 w-0 h-full"/>
      </div>

      <RequestHeaderDropdown/>
    </div>
  )
}