import React from "react";
import {cn} from "@workspace/ui/lib/utils";
import GroupHeader from "@/app/[locale]/(app)/(home)/_components/group-item/GroupHeader";
import Markdown from "@/components/Markdown";
import {useSpecification} from "@/app/[locale]/(app)/(home)/_hooks/useSpecification";
import {isGroup} from "@/lib/specification";
import GroupTryRequests from "@/app/[locale]/(app)/(home)/_components/group-item/GroupTryRequests";

export default function GroupItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
        <div className="grid grid-cols-4 gap-2">
          <div className="flex flex-col col-span-3">
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
              <span className="text-muted-foreground">This folder doesn't have a description</span>
            )}
          </div>

          <div className="flex flex-col gap-2 border-s h-fit p-2">
            <GroupTryRequests />
          </div>
        </div>

      </div>
    </div>
  )
}