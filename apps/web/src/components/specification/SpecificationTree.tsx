import {
  isGroup,
  Specification,
  SpecificationGroupItem,
  SpecificationItem,
  SpecificationRequestItem
} from "@/lib/specification";
import * as React from "react";
import {cn} from "@workspace/ui/lib/utils";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@workspace/ui/components/collapsible";
import {ChevronRight} from "lucide-react";
import {Button} from "@workspace/ui/components/button";
import {RequestMethodText} from "@/components/request/RequestMethodText";
import {useCallback, useState} from "react";
import {Link, useRouter} from "@/i18n/navigation";

type SpecificationTreeProps = {
  specification: Specification,
  selectedId: string
  onItemClick: (item: SpecificationItem) => void
} & React.ComponentProps<"ul">

export default function SpecificationTree({
  specification,
  selectedId,
  onItemClick,
  className,
  ...props
}: SpecificationTreeProps) {
  return (
    <ul
      className={cn(
        "flex h-0 flex-1 flex-col gap-2 overflow-auto group/tree",
        className
      )}
      {...props}
    >
      <SpecificationTreeItem
        className="min-w-fit"
        item={specification}
        selectedId={selectedId}
        onItemClick={onItemClick}/>
    </ul>
  )
}

type SpecificationTreeItemProps = {
  item: SpecificationItem,
  selectedId: string
  onItemClick: (item: SpecificationItem) => void
} & React.ComponentProps<React.ElementType>

function SpecificationTreeItem({
  item,
  selectedId,
  onItemClick,
  ...props
}: SpecificationTreeItemProps) {
  return isGroup(item)
    ? SpecificationTreeGroupItem({ item, selectedId, onItemClick, ...props })
    : SpecificationTreeRequestItem({ item, selectedId, onItemClick, ...props })
}

type SpecificationTreeGroupItemProps = {
  item: SpecificationGroupItem,
  selectedId: string
  onItemClick: (item: SpecificationItem) => void
} & React.ComponentProps<"li">

function SpecificationTreeGroupItem({
  item,
  selectedId,
  onItemClick,
  className,
  ...props
}: SpecificationTreeGroupItemProps) {
  const [open, setOpen] = useState(true)
  const router = useRouter()

  const onGroupClick = useCallback(() => {
    if (!open) {
      setOpen(true)
    }

    router.push(`/?item=${item.id}`)

    onItemClick(item)
  }, [open, setOpen])

  return (
    <li {...props}>
      <Collapsible
        className={cn(
          "group/collapsible",
          className
        )}
        open={open}
        onOpenChange={setOpen}
      >
        <Button
          data-active={item.id === selectedId}
          onClick={onGroupClick}
          className={cn(
            "w-full items-center justify-start data-[active=true]:bg-accent data-[active=true]:font-medium data-[active=true]:text-accent-foreground !px-1 gap-1 font-normal h-7 cursor-pointer",
            className
          )}
          variant="ghost"
          size="sm"
          asChild
        >
          <div>
            <CollapsibleTrigger
              className="hover:bg-border rounded-full p-0.5"
              onClick={e => {
                e.stopPropagation()
                setOpen(!open)
              }}
            >
              <ChevronRight
                className={cn(
                  "transition-transform hover:bg-border rounded-full",
                  open && "rotate-90"
                )}
              />
            </CollapsibleTrigger>
            <Link href={`?item=${item.id}`}>
              {item.name}
            </Link>
          </div>
        </Button>
        <CollapsibleContent>
          <ul className="ms-3 translate-x-px flex flex-col gap-1 ps-1 border-l border-transparent group-hover/tree:border-border">
            {item.items.map(child => (
              <SpecificationTreeItem
                key={child.id}
                item={child}
                selectedId={selectedId}
                onItemClick={onItemClick}
              />
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </li>
  )
}

type SpecificationTreeRequestItemProps = {
  item: SpecificationRequestItem,
  selectedId: string
  onItemClick: (item: SpecificationItem) => void
} & React.ComponentProps<"li">

function SpecificationTreeRequestItem({
  item,
  selectedId,
  onItemClick,
  ...props
}: SpecificationTreeRequestItemProps) {
  return (
    <li {...props}>
      <TreeButton
        isActive={item.id === selectedId}
        onClick={() => onItemClick(item)}
        asChild
      >
        <Link href={`?item=${item.id}`}>
          <RequestMethodText
            className="mt-px text-end w-8 shrink-0"
            method={item.request.method}
          />
          {item.name}
        </Link>
      </TreeButton>
    </li>
  )
}

export function TreeButton({
  className,
  children,
  isActive = false,
  ...props
}: React.ComponentProps<typeof Button> & {
  isActive?: boolean
}) {
  return (
    <Button
      data-active={isActive}
      className={cn(
        "w-full items-center justify-start data-[active=true]:bg-accent data-[active=true]:font-medium data-[active=true]:text-accent-foreground !px-1.5 font-normal h-7",
        className
      )}
      variant="ghost"
      size="sm"
      {...props}
    >
      {children}
    </Button>
  )
}