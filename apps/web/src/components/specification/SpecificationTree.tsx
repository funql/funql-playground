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

type SpecificationTreeProps = {
  specification: Specification,
  selectedId: string
  onRequestClick: (item: SpecificationRequestItem) => void
} & React.ComponentProps<"ul">

export default function SpecificationTree({
  specification,
  selectedId,
  onRequestClick,
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
        onRequestClick={onRequestClick}/>
    </ul>
  )
}

type SpecificationTreeItemProps = {
  item: SpecificationItem,
  selectedId: string
  onRequestClick: (item: SpecificationRequestItem) => void
} & React.ComponentProps<React.ElementType>

function SpecificationTreeItem({
  item,
  selectedId,
  onRequestClick,
  ...props
}: SpecificationTreeItemProps) {
  return isGroup(item)
    ? SpecificationTreeGroupItem({ item, selectedId, onRequestClick, ...props })
    : SpecificationTreeRequestItem({ item, selectedId, onRequestClick, ...props })
}

type SpecificationTreeGroupItemProps = {
  item: SpecificationGroupItem,
  selectedId: string
  onRequestClick: (item: SpecificationRequestItem) => void
} & React.ComponentProps<"li">

function SpecificationTreeGroupItem({
  item,
  selectedId,
  onRequestClick,
  className,
  ...props
}: SpecificationTreeGroupItemProps) {
  return (
    <li {...props}>
      <Collapsible
        className={cn(
          "group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90",
          className
        )}
        defaultOpen={true}
      >
        <CollapsibleTrigger asChild>
          <TreeButton>
            <ChevronRight className="transition-transform" />
            {item.name}
          </TreeButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="ms-3 translate-x-px flex flex-col gap-1 ps-1 border-l border-transparent group-hover/tree:border-border">
            {item.items.map(child => (
              <SpecificationTreeItem
                key={child.id}
                item={child}
                selectedId={selectedId}
                onRequestClick={onRequestClick}
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
  onRequestClick: (item: SpecificationRequestItem) => void
} & React.ComponentProps<"li">

function SpecificationTreeRequestItem({
  item,
  selectedId,
  onRequestClick,
  ...props
}: SpecificationTreeRequestItemProps) {
  return (
    <li {...props}>
      <TreeButton
        isActive={item.id === selectedId}
        onClick={() => onRequestClick(item)}
      >
        <RequestMethodText
          className="mt-px text-end w-8 shrink-0"
          method={item.request.method}
        />
        {item.name}
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