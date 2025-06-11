"use client"

import React, {useState} from "react";
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@workspace/ui/components/sheet";
import {Button} from "@workspace/ui/components/button";
import {SidebarIcon} from "lucide-react";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import SpecificationTree from "@/components/specification/SpecificationTree";
import {useSpecification} from "@/app/[locale]/(app)/(home)/_hooks/useSpecification";
import {cn} from "@workspace/ui/lib/utils";
import SidebarDocsLink from "@/app/[locale]/(app)/(home)/_components/sidebar/SidebarDocsLink";
import {useTranslations} from "next-intl";

export default function MobileSidebar({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const t = useTranslations("HomePage.sidebar.MobileSidebar")

  const { specification, selectedRequestId, setSelectedRequestId } = useSpecification()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "text-base md:hidden",
            className
          )}
          {...props}
        >
          <SidebarIcon className="size-5" />
          <span className="sr-only">{t("toggleMenuSrText")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        aria-describedby={undefined}
        className="bg-sidebar"
      >
        <VisuallyHidden asChild>
          <SheetTitle>
            {t("titleSrText")}
          </SheetTitle>
        </VisuallyHidden>

        <SpecificationTree
          className="px-4 pt-4"
          specification={specification}
          selectedId={selectedRequestId}
          onRequestClick={item => {
            setSelectedRequestId(item.id)
            setOpen(false)
          }}
        />

        <SidebarDocsLink/>
      </SheetContent>
    </Sheet>
  )
}