"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { nav, site } from "@/data/site";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  // close the mobile menu after navigating, and on Escape
  React.useEffect(() => setOpen(false), [pathname]);
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur-md supports-[backdrop-filter]:bg-paper/75">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group flex items-baseline gap-2" aria-label={`${site.name}, home`}>
          <span className="font-display text-xl leading-none">{site.name}</span>
          <span aria-hidden className="size-1.5 translate-y-[-2px] rounded-full bg-raspberry transition-colors group-hover:bg-raspberry-deep" />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`label inline-flex min-h-[44px] items-center rounded-full px-4 transition-colors ${
                      active ? "bg-ink text-paper" : "text-ink/80 hover:bg-ink/5 hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Main"
        hidden={!open}
        className="border-t border-rule bg-paper md:hidden"
      >
        <ul className="shell flex flex-col py-3">
          {[{ href: "/", label: "Home" }, ...nav].map((item) => {
            const active = item.href === "/" ? pathname === "/" : isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[52px] items-center justify-between border-b border-rule font-display text-2xl last:border-0"
                >
                  {item.label}
                  {active && <span className="label text-raspberry-deep">You are here</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
