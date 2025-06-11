"use client"

import { Button } from "@workspace/ui/components/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@workspace/ui/components/dropdown-menu";
import {MoonIcon, SunIcon} from "lucide-react";
import {useTheme} from "next-themes";
import {useTranslations} from "next-intl";
import React from "react";

export function ThemeSelector({
  ...props
}: React.ComponentProps<typeof Button>) {
  const t = useTranslations("AppLayout.ThemeSwitcher")
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" {...props}>
          <SunIcon className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t("toggleThemeSrText")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {t("lightText")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          {t("darkText")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          {t("systemText")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}