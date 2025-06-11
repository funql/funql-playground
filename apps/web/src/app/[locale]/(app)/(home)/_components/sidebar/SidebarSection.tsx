import React from "react";
import {cn} from "@workspace/ui/lib/utils";
import SelectedSpecificationTree from "@/app/[locale]/(app)/(home)/_components/sidebar/SelectedSpecificationTree";
import SidebarDocsLink from "@/app/[locale]/(app)/(home)/_components/sidebar/SidebarDocsLink";

export default function SidebarSection({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col",
        className
      )}
      {...props}
    >
      <SelectedSpecificationTree
        className="flex-1 px-2"
      />

      <SidebarDocsLink/>
    </div>
  )
}