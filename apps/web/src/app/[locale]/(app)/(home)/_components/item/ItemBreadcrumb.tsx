"use client"

import React, {Fragment} from "react";
import {
  BreadcrumbEllipsis,
  BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@workspace/ui/components/breadcrumb";
import {useSpecification} from "@/app/[locale]/(app)/(home)/_hooks/useSpecification";
import {cn} from "@workspace/ui/lib/utils";
import {Link} from "@/i18n/navigation";

export default function ItemBreadcrumb({
  className,
  ...props
}: React.ComponentProps<typeof BreadcrumbList>) {
  const { selectedItem: [parents, item] } = useSpecification()

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
            <BreadcrumbLink asChild>
              <Link href={`?item=${it.id}`}>
                {it.name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator
            className={cn(
              "shrink-0",
              index > 0 && "hidden sm:block"
            )}
          />
        </Fragment>
      ))}

      {parents.length > 1 && (
        <>
          <BreadcrumbEllipsis className="sm:hidden w-5" />
          <BreadcrumbSeparator className="sm:hidden" />
        </>
      )}

      <BreadcrumbItem>
        <BreadcrumbPage>
          {item.name}
        </BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  )
}