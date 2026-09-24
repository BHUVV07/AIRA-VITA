import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  showTagline?: boolean;
}

export default function AriaVitaLogo({
  className = "",
  variant = "dark",
  showTagline = true,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus:outline-none ${className}`}
      aria-label="ARIA VITA™ Home"
    >
      {/* Official Supplied Logo Asset */}
      <div className="relative h-10 w-[110px] sm:w-[125px] shrink-0 flex items-center justify-center">
        <Image
          src="/images/logo.png"
          alt="ARIA VITA™ Logo - Precision Air. Perfect Comfort."
          fill
          sizes="125px"
          className="object-contain object-left mix-blend-multiply"
          priority
        />
      </div>

      {showTagline && (
        <div className="hidden sm:flex flex-col border-l border-slate-200 pl-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-purple-900 font-heading">
            Precision Air
          </span>
          <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-500">
            Perfect Comfort
          </span>
        </div>
      )}
    </Link>
  );
}
