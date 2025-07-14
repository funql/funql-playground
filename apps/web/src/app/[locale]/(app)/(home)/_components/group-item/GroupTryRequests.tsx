import React, {useMemo} from "react";
import {useSpecification} from "@/app/[locale]/(app)/(home)/_hooks/useSpecification";
import {
  isGroup,
  isRequest,
  SpecificationGroupItem,
  SpecificationRequestItem,
  walkItem
} from "@/lib/specification";
import {cn} from "@workspace/ui/lib/utils";
import {RequestMethodText} from "@/components/request/RequestMethodText";
import {FolderIcon} from "lucide-react";
import {Button} from "@workspace/ui/components/button";
import {Link} from "@/i18n/navigation";

export default function GroupTryRequests({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { setSelectedItemId, selectedItem: [, item] } = useSpecification()

  if (!isGroup(item))
    return undefined

  const requests = useMemo(() => {
    const currentRequests: [SpecificationGroupItem, SpecificationRequestItem][] = []
    for (const [parents, child] of walkItem(item)) {
      if (!isRequest(child))
        continue

      currentRequests.push([parents.at(-1)!, child])

      if (currentRequests.length === 3)
        break
    }

    return currentRequests
  }, [item])

  return (
    <div
      className={cn(
        "flex flex-col gap-2 overflow-hidden",
        className
      )}
      {...props}
    >
      <span className="text-sm font-medium text-accent-foreground">
        Some requests in this folder
      </span>

      <div className="flex flex-col gap-2">
        {requests.map(it => (
          <TryRequestButton
            key={it[1].id}
            request={it}
            onClick={() => setSelectedItemId(it[1].id)}
          />
        ))}
      </div>
    </div>
  )
}

function TryRequestButton({
  request: [group, request],
  className,
  ...props
}: { request: [SpecificationGroupItem, SpecificationRequestItem] } & React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn(
        "flex flex-col gap-1 h-fit items-start",
        className
      )}
      variant="ghost"
      size="lg"
      asChild
      {...props}
    >
      <Link href={`?item=${request.id}`}>
        <div className="flex gap-2 items-center">
          <RequestMethodText className="mt-0.5 w-8 text-right" method={request.request.method} />

          <span className="text-sm font-medium">
          {request.name}
        </span>
        </div>

        <div className="flex gap-1 items-center ms-10">
          <FolderIcon className="size-3 shrink-0"/>
          <span className="text-sm font-light">
          {group.name}
        </span>
        </div>
      </Link>
    </Button>
  )
}