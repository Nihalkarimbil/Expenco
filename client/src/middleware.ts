import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const PUBLIC_PAGES = ["/", "/login", "/register"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isPublicPage = PUBLIC_PAGES.includes(pathname);

  if (token && isPublicPage) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashbord"; 
    return NextResponse.redirect(url);
  }

  if (!token && !isPublicPage) {
    const url = req.nextUrl.clone();
    url.pathname = "/"; 
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); 
}


export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
