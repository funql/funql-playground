import { Icons } from "@/components/Icons";
import {siteConfig} from "@/config/site";
import {Button} from "@workspace/ui/components/button";
import {ThemeSelector} from "@/app/[locale]/(app)/_components/header/ThemeSelector";
import LocaleSwitcher from "@/app/[locale]/(app)/_components/header/LocaleSwitcher";
import {Link} from "@/i18n/navigation";

export function AppHeader() {
  return (
    <header className="flex h-[var(--header-height)] shrink-0 items-center justify-between gap-2 px-3 py-2 bg-card text-card-foreground md:bg-sidebar md:text-sidebar-foreground">
      <Link
        href="/"
        className="flex min-w-0 items-center gap-2"
      >
        <Icons.Logo className="size-7 shrink-0"/>

        <h1 className="text-base font-medium line-clamp-1">FunQL Playground</h1>
      </Link>

      <div className="flex items-center justify-end">
        <LocaleSwitcher/>

        <Button asChild size="icon" variant="ghost">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
          >
            <Icons.GitHub className="size-5"/>
          </a>
        </Button>

        <ThemeSelector/>
      </div>
    </header>
  )
}