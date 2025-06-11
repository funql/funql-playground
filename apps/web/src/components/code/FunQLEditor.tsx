"use client"

import {Diagnostic, linter} from "@codemirror/lint";
import {syntaxTree} from "@codemirror/language";
import CodeEditor from "@/components/code/CodeEditor";
import {FunQL} from "@workspace/lezer-funql";
import React from "react";
import {funqlFunctionTooltip} from "@/components/code/funqlFunctionTooltip";
import {useLocale, useMessages} from "next-intl";

export function simpleFunQLLinter() {
  return linter(view => {
    const diagnostics: Diagnostic[] = []

    // No errors if value is empty
    if (!view.state.doc.length) {
      return diagnostics
    }

    syntaxTree(view.state).iterate({
      enter: node => {
        if (node.type.isError) {
          diagnostics.push({
            from: node.from,
            to: node.from + 1,
            severity: "error",
            message: "Syntax error"
          })
        }
      },
    })

    return diagnostics
  })
}

export default function FunQLEditor({
  inline = false,
  placeholder,
  value,
  onChange,
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'placeholder'> & {
  inline?: boolean,
  placeholder?: string,
  value?: string,
  onChange?: (value: string) => void
}) {
  const locale = useLocale()
  const messages = useMessages()

  return (
    <CodeEditor
      basicSetup={{
        lineNumbers: !inline,
        foldGutter: !inline,
        highlightActiveLine: !inline,
        highlightActiveLineGutter: !inline,
      }}
      extensions={[FunQL(), simpleFunQLLinter(), funqlFunctionTooltip(locale, messages)]}
      placeholder={placeholder}
      value={value}
      onChange={val => {
        if (onChange) {
          onChange(val)
        }
      }}
      {...props}
    />
  )
}