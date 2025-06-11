import React from "react";
import {siteConfig} from "@/config/site";
import {ExternalLinkIcon} from "lucide-react";
import {cn} from "@workspace/ui/lib/utils";
import {useTranslations} from "next-intl";

export default function SidebarDocsLink({
  className,
  ...props
}: React.ComponentProps<"a">) {
  const t = useTranslations("HomePage.sidebar.SidebarDocsLink")

  return (
    <a
      className={cn(
        "flex flex-col gap-1 bg-card text-card-foreground border rounded-md hover:shadow-md p-3 m-3 hover:-translate-y-0.5 transition-transform",
        className
      )}
      href={siteConfig.links.funqlDocs}
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      <span className="text-sm text-muted-foreground">
        {t("title")}
      </span>
      <span className="inline-flex items-center gap-1 text-sm">
        {t("description")}
        <ExternalLinkIcon className="size-3 shrink-0"/>
      </span>
    </a>
  )
}