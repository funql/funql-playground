import {Messages, NamespaceKeys, NestedKeyOf, useTranslations} from "next-intl"


export type TranslationKey<NestedKey extends NamespaceKeys<Messages, NestedKeyOf<Messages>> = never> =
  Parameters<ReturnType<typeof useTranslations<NestedKey>>>[0]