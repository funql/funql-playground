import {parser} from "./syntax.grammar"
import {
  LRLanguage,
  LanguageSupport,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  continuedIndent
} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

export const FunQLLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        FunctionCall: continuedIndent({except: /^\s*\)/}),
        Object: continuedIndent({except: /^\s*}/}),
        Array: continuedIndent({except: /^\s*]/})
      }),
      foldNodeProp.add({
        FunctionCall: foldInside,
        Object: foldInside,
        Array: foldInside
      }),
      styleTags({
        Boolean: t.bool,
        Null: t.null,
        Number: t.number,
        String: t.string,
        Array: t.list,
        Field: t.propertyName,
        "FieldPath/String": t.propertyName,
        FunctionCall: t.modifier,
        Comment: t.comment,
        "( )": t.paren,
        '{ }': t.brace,
        "[ ]": t.squareBracket,
        ',': t.separator,
        '.': t.derefOperator
      })
    ]
  }),
  languageData: {
    closeBrackets: {brackets: ["(", "{", "[", '"']},
    indentOnInput: /^\s*[)}\]]$/,
  }
})

export function FunQL() {
  return new LanguageSupport(FunQLLanguage)
}
