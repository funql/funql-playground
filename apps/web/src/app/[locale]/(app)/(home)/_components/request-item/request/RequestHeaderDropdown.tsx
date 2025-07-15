"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@workspace/ui/components/dropdown-menu";
import {Button} from "@workspace/ui/components/button";
import {EllipsisVerticalIcon} from "lucide-react";
import React from "react";
import {useEditorState} from "@/app/[locale]/(app)/(home)/_hooks/useEditorState";
import {useTranslations} from "next-intl";

export default function RequestHeaderDropdown({
  ...props
}: Omit<React.ComponentProps<typeof Button>, "onClick">) {
  const t = useTranslations("HomePage.request.RequestHeaderDropdown")

  const { resetActiveRequest } = useEditorState()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          {...props}
        >
          <EllipsisVerticalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={resetActiveRequest}>
          {t("resetText")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}