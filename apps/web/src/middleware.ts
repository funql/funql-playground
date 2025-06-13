import createMiddleware from 'next-intl/middleware'
import {routing} from './i18n/routing'
import {NextRequest} from "next/server";

const i18nMiddleware = createMiddleware(routing)

export function middleware(request: NextRequest) {
  console.log(`request.url: ${request.url}`)
  console.log(`request.nextUrl.search: ${request.nextUrl.search}`)
  const response = i18nMiddleware(request)
  if (response.status === 307) {
    console.log(`response.url: ${response.url}`)
    console.log(`response.headers["location"]: ${response.headers.get("location")}`)
  }
  return response
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}