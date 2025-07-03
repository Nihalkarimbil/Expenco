
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_PAGES = ["/login", "/register"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;


  const { pathname } = req.nextUrl;


  if (token && AUTH_PAGES.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashbord"; 
    return NextResponse.redirect(url);
  }

  
  if (!token && !AUTH_PAGES.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
