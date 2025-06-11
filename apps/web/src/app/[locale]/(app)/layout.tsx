import {ReactNode} from "react";
import {AppHeader} from "@/app/[locale]/(app)/_components/header/AppHeader";

type AppLayoutProps = {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-svh [--header-height:calc(theme(spacing.14))]">
      <AppHeader/>
      <main className="flex flex-1 flex-col">
        {children}
      </main>
    </div>
  )
}