import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    const hasLocale = i18n.locales.some(
        (locale) =>
            pathname === `/${locale}` ||
            pathname.startsWith(`/${locale}/`)
    );

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
