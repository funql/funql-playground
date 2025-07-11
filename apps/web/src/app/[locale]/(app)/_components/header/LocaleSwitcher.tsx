"use client"

import {usePathname, useRouter} from "@/i18n/navigation";
import React, {useTransition} from "react";
import {useParams, useSearchParams} from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@workspace/ui/components/dropdown-menu";
import {Button} from "@workspace/ui/components/button";
import {useLocale, useTranslations} from "next-intl";
import {routing} from "@/i18n/routing";

export default function LocaleSwitcher({
  ...props
}: React.ComponentProps<typeof Button>) {
  const t = useTranslations("AppLayout.LocaleSwitcher.locales")

  const locale = useLocale()
  const router = useRouter()
  const [, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()
  const searchParams = useSearchParams()

  function onClick(locale: string) {
    startTransition(() => {
      router.replace(
        {
          pathname: `${pathname}?${searchParams}`,
          // @ts-expect-error - pathname is not recognized due to '?{searchParams}', meaning params is not recognized,
          // but it'll replace params if there are any just fine
          params: params
        },
        {locale: locale}
      )
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" {...props}>
          {t(`${locale}.codeLabel`)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map(it => (
          <DropdownMenuItem
            key={it}
            onClick={() => onClick(it)}
          >
            {t(`${it}.nameLabel`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}