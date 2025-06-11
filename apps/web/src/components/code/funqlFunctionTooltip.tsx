"use client"

import {hoverTooltip} from "@uiw/react-codemirror";
import {syntaxTree} from "@codemirror/language";
import {createRoot} from "react-dom/client";
import React from "react";
import {cn} from "@workspace/ui/lib/utils";
import {
  Locale,
  Messages,
  NextIntlClientProvider,
  useTranslations
} from "next-intl";
import {TranslationKey} from "@/i18n/TranslationKey";

export function funqlFunctionTooltip(locale: Locale, messages: Messages) {
  return hoverTooltip((view, pos) => {
    const token = syntaxTree(view.state).resolve(pos, 0)
    if (token.name !== "FunctionCall")
      return null

    const start = token.from
    // First child is the '(' token, which is where the function identifier ends
    const end = token.firstChild!.from

    // Return if 'pos' not inside the identifier token
    if (pos < start || pos > end)
      return null

    const functionName = view.state.sliceDoc(start, end)

    // Return if there is no documentation
    if (!documentationExists(functionName))
      return null

    return {
      pos: start,
      end,
      above: false,
      create: () => {
        const dom = document.createElement("div")
        createRoot(dom).render(
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Tooltip func={functionName}/>
          </NextIntlClientProvider>
        )

        return {
          dom
        }
      }
    }
  })
}

type FunctionInfo = {
  signature: string
  documentation: TranslationKey<"funql.functions">
}

const functionInfos = new Map<string, FunctionInfo>([
  ["year", {
    signature: "year(field: DateTime): Integer",
    documentation: "year.documentation"
  }],
  ["month", {
    signature: "month(field: DateTime): Integer",
    documentation: "month.documentation"
  }],
  ["day", {
    signature: "day(field: DateTime): Integer",
    documentation: "day.documentation"
  }],
  ["hour", {
    signature: "hour(field: DateTime): Integer",
    documentation: "hour.documentation"
  }],
  ["minute", {
    signature: "minute(field: DateTime): Integer",
    documentation: "minute.documentation"
  }],
  ["second", {
    signature: "second(field: DateTime): Integer",
    documentation: "second.documentation"
  }],
  ["millisecond", {
    signature: "millisecond(field: DateTime): Integer",
    documentation: "millisecond.documentation"
  }],
  ["round", {
    signature: "round(field: Float): Integer",
    documentation: "round.documentation"
  }],
  ["floor", {
    signature: "floor(field: Float): Integer",
    documentation: "floor.documentation"
  }],
  ["ceiling", {
    signature: "ceiling(field: Float): Integer",
    documentation: "ceiling.documentation"
  }],
  ["lower", {
    signature: "lower(field: String): String",
    documentation: "lower.documentation"
  }],
  ["upper", {
    signature: "upper(field: String): String",
    documentation: "upper.documentation"
  }]
])

function documentationExists(functionName: string) {
  return functionInfos.has(functionName)
}

function Tooltip({
  func,
  className,
  ...props
}: {
  func: string
} & React.ComponentProps<"div">) {
  const t = useTranslations("funql.functions")

  return (
    <div
      className={cn(
        "flex flex-col text-sm bg-muted p-1 border rounded-sm shadow-sm max-w-96",
        className
      )}
      {...props}
    >
      <span className="text-muted-foreground font-semibold">
        {functionInfos.get(func)?.signature}
      </span>
      <span>
        {t(functionInfos.get(func)!.documentation)}
      </span>
    </div>
  )
}