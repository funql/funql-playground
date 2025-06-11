"use client"

import React from "react";
import ReactCodeMirror, {EditorView} from "@uiw/react-codemirror";
import {useTheme} from "next-themes";
import {vscodeDark, vscodeLight} from "@uiw/codemirror-theme-vscode";
import {foldGutter} from "@codemirror/language";

/** Overrides for the theme. */
const themeOverrides = EditorView.theme({
  "&": {
    backgroundColor: "transparent"
  },
  // Disable focus outline
  "&.cm-editor.cm-focused": {
    "outline-style": "none"
  },
  // Remove gutter border on the right
  ".cm-gutters": {
    backgroundColor: "transparent",
    border: "none"
  },
  // Remove default padding so we can manage padding ourselves
  ".cm-content": {
    padding: 0
  },
  // Remove tooltip styling so we can style it ourselves
  ".cm-tooltip": {
    background: "none",
    border: "none",
  }
})

export default function CodeEditor({
  basicSetup,
  extensions,
  ...props
}: React.ComponentProps<typeof ReactCodeMirror>) {
  const { resolvedTheme } = useTheme()
  const editorTheme = resolvedTheme === "dark" ? vscodeDark : vscodeLight
  const disableFold = typeof basicSetup !== 'boolean' ? basicSetup?.foldGutter === false : false
  const defaultExtensions = []
  if (!disableFold)
    defaultExtensions.push(foldGutter({
      openText: "\u25be",
      closedText: "\u25b8"
    }))

  return (
    <ReactCodeMirror
      height="100%"
      width="100%"
      theme={[themeOverrides, editorTheme]}
      basicSetup={
        typeof basicSetup === 'boolean'
          ? basicSetup
          : { ...basicSetup, foldGutter: false }
      }
      extensions={[
        ...defaultExtensions,
        ...(extensions ?? [])
      ]}
      {...props}
    />
  )
}