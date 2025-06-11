"use client"

import React, {Fragment} from "react";
import {cn} from "@workspace/ui/lib/utils";
import {useSpecification} from "@/app/[locale]/(app)/(home)/_hooks/useSpecification";
import {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@workspace/ui/components/breadcrumb";

export default function RequestBreadcrumb({
  className,
  ...props
}: React.ComponentProps<typeof BreadcrumbList>) {
  const { selectedRequest: [parents, request] } = useSpecification()

  return (
    <BreadcrumbList
      className={cn(
        "gap-1 sm:gap-1 flex-nowrap overflow-auto",
        className
      )}
      {...props}
    >
      {parents.map((it, index) => (
        <Fragment key={it.id}>
          <BreadcrumbItem
            className={cn(
              "shrink-0",
              index > 0 && "hidden sm:block"
            )}
          >
            {it.name}
          </BreadcrumbItem>
          <BreadcrumbSeparator
            className={cn(
              "shrink-0",
              index > 0 && "hidden sm:block"
            )}
          />
        </Fragment>
      ))}

      {parents.length > 2 && (
        <>
          <BreadcrumbEllipsis className="sm:hidden w-5" />
          <BreadcrumbSeparator className="sm:hidden" />
        </>
      )}

      <BreadcrumbItem>
        <BreadcrumbPage>
          {request.name}
        </BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  )
}