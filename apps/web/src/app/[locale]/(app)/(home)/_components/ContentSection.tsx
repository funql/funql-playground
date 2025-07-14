"use client"

import {useSpecification} from "@/app/[locale]/(app)/(home)/_hooks/useSpecification";
import {isRequest} from "@/lib/specification";
import GroupItem from "@/app/[locale]/(app)/(home)/_components/group-item/GroupItem";
import RequestItem from "@/app/[locale]/(app)/(home)/_components/request-item/RequestItem";

export default function ContentSection() {
  const { selectedItem: [, item] } = useSpecification()

  const Item = isRequest(item) ? RequestItem : GroupItem

  return (
    <Item
      className="md:rounded-tl-2xl border-t md:border-l bg-background"
    />
  )
}