"use client"

import React from "react";
import {Button} from "@workspace/ui/components/button";
import {useExecution} from "@/app/[locale]/(app)/(home)/_hooks/useExecution";
import {useEditorState} from "@/app/[locale]/(app)/(home)/_hooks/useEditorState";
import {useTranslations} from "next-intl";

export default function RequestSendButton({
  ...props
}: Omit<React.ComponentProps<typeof Button>, "onClick">) {
  const t = useTranslations("HomePage.request.RequestSendButton")

  const { activeRequest } = useEditorState()
  const { execute, cancel } = useExecution()

  return (
    <Button
      onClick={() => !activeRequest.executing ? execute(activeRequest.id) : cancel(activeRequest.id)}
      variant={activeRequest.executing ? "secondary" : "default"}
      {...props}
    >
      {!activeRequest.executing ? t("sendText") : t("cancelText")}
    </Button>
  )
}