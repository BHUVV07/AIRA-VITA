"use client";

import React, { Suspense, useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { GA_MEASUREMENT_ID, pageview } from "@/lib/analytics/gtag";

/**
 * Client-side route listener for App Router client navigation.
 * Uses Suspense boundary to support Next.js static generation.
 */
function GoogleAnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedUrl = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    // Avoid tracking internal admin dashboard (/admin/*)
    if (pathname.startsWith("/admin")) return;

    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    // Prevent duplicate page_view events on identical URL / rerenders
    if (lastTrackedUrl.current === url) return;
    lastTrackedUrl.current = url;

    pageview(url);
  }, [pathname, searchParams]);

  return null;
}

/**
 * Google Analytics 4 Script & Navigation Tracking Component
 */
export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              send_page_view: false
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <GoogleAnalyticsTracker />
      </Suspense>
    </>
  );
}
