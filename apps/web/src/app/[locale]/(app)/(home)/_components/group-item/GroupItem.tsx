import React from "react";
import {cn} from "@workspace/ui/lib/utils";
import GroupHeader from "@/app/[locale]/(app)/(home)/_components/group-item/GroupHeader";
import Markdown from "@/components/Markdown";
import {useSpecification} from "@/app/[locale]/(app)/(home)/_hooks/useSpecification";
import {isGroup} from "@/lib/specification";
import GroupTryRequests from "@/app/[locale]/(app)/(home)/_components/group-item/GroupTryRequests";
import {useTranslations} from "next-intl";

export default function GroupItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("HomePage.group-item.GroupItem")

  const { selectedItem: [parents, item] } = useSpecification()

  if (!isGroup(item))
    return undefined

  return (
    <div
      className={cn(
        "flex flex-1 h-0 flex-col",
        className
      )}
      {...props}
    >
      <GroupHeader/>

      <div
        className={cn(
          "flex flex-1 flex-col overflow-auto px-4 pt-1 gap-4",
        )}
      >
        <div className="@container flex flex-wrap gap-2">
          <div className="flex flex-col flex-1">
            {parents.length > 0 && (
              <span className="text-lg font-medium">{item.name}</span>
            )}

            {item.description && (
              <Markdown
                className="min-w-full prose-sm"
                text={item.description}
              />
            )}

            {!item.description && (
              <span className="text-muted-foreground">
                {t("noDescriptionText")}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 h-fit p-2 @min-3xl:border-s @min-3xl:w-72 @max-3xl:px-0 @max-3xl:border-t @max-3xl:w-full">
            <GroupTryRequests />
          </div>
        </div>

      </div>
    </div>
  )
}