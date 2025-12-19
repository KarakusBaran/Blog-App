import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Statik dosyalar ve API'leri pas geç
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // URL'de locale var mı?
    const hasLocale = i18n.locales.some(
        (locale) =>
            pathname === `/${locale}` ||
            pathname.startsWith(`/${locale}/`)
    );

    // Yoksa default locale ekle
    if (!hasLocale) {
        return NextResponse.redirect(
            new URL(
                `/${i18n.defaultLocale}${pathname === "/" ? "" : pathname}`,
                request.url
            )
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next_|.*\\..*).*)"],
}