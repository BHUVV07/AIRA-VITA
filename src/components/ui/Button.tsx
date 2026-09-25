import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "right",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 rounded-lg cursor-pointer";

  const variants = {
    primary:
      "bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-900/10 border border-sky-500 hover:shadow-lg hover:shadow-sky-900/20 active:translate-y-0.5",
    secondary:
      "bg-sky-700 hover:bg-sky-800 text-white shadow-md shadow-sky-900/10 border border-sky-600 hover:shadow-lg active:translate-y-0.5",
    outline:
      "border border-slate-300 hover:border-sky-400 bg-white text-slate-800 hover:bg-sky-50/70 shadow-sm active:translate-y-0.5",
    ghost:
      "text-slate-700 hover:text-sky-700 hover:bg-sky-50/80 active:translate-y-0.5",
    dark: "bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 shadow-md active:translate-y-0.5",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5 font-semibold",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="inline-flex">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="inline-flex">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
