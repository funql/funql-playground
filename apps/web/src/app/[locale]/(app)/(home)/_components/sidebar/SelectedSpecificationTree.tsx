"use client"

import React from "react";
import SpecificationTree from "@/components/specification/SpecificationTree";
import {useSpecification} from "@/app/[locale]/(app)/(home)/_hooks/useSpecification";

export default function SelectedSpecificationTree({
  ...props
}: React.ComponentProps<React.ElementType>) {
  const { specification, selectedRequestId, setSelectedRequestId } = useSpecification()

  return (
    <SpecificationTree
      specification={specification}
      selectedId={selectedRequestId}
      onRequestClick={item => setSelectedRequestId(item.id)}
      {...props}
    />
  )
}