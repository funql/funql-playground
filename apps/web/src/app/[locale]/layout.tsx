import {hasLocale, Locale} from 'next-intl'
import {notFound} from 'next/navigation'
import {routing} from '@/i18n/routing'
import { Geist, Geist_Mono } from "next/font/google"
import React, {ReactNode} from "react";
import {Providers} from "@/app/[locale]/providers";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {cn} from "@workspace/ui/lib/utils";
import {Metadata} from "next";
import {Analytics} from "@vercel/analytics/next";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

type LocaleLayoutProps = {
  children: ReactNode
  params: Promise<{locale: Locale}>
}

type MetadataProps = Omit<LocaleLayoutProps, "children">

export async function generateMetadata({
  params
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "LocaleLayout.metadata" })

  return {
    title: "FunQL Playground API",
    description: t("description"),
  }
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  return (
    // Need to suppress hydration warning when using ThemeProvider, see https://github.com/pacocoursey/next-themes#html--css
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-svh font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}