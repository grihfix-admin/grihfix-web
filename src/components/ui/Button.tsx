"use client";

import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
};

type ButtonProps =
  | (CommonProps &
      ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: undefined;
      })
  | (CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

const baseStyles =
  "inline-flex items-center justify-center rounded-full font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500";

const variantMap = {
  primary: "bg-blue-600 text-white hover:bg-blue-500",
  secondary: "bg-white text-blue-700 border border-blue-200 hover:bg-blue-50",
  ghost: "bg-transparent text-blue-700 hover:text-blue-900",
};

const sizeMap = {
  md: "px-4 py-2 text-sm sm:text-base",
  lg: "px-6 py-3 text-base sm:text-lg",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(baseStyles, variantMap[variant], sizeMap[size], className);

  if ("href" in rest && rest.href) {
    const { href, ...anchorProps } = rest;
    if (href.startsWith("/")) {
      return (
        <Link {...(anchorProps as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">)} href={href} className={classes}>
          {children}
        </Link>
      );
    }
    return (
      <a {...(anchorProps as AnchorHTMLAttributes<HTMLAnchorElement>)} href={href} className={classes}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button {...buttonProps} type={buttonProps.type ?? "button"} className={classes}>
      {children}
    </button>
  );
}

