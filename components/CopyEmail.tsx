"use client";

import { Check, Copy } from "lucide-react";
import * as React from "react";

export default function CopyEmail({ email, className = "" }: { email: string; className?: string }) {
  const [state, setState] = React.useState<"idle" | "copied" | "failed">("idle");

  React.useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2400);
    return () => clearTimeout(t);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <button type="button" onClick={copy} className="btn-ghost">
        {state === "copied" ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
        {state === "copied" ? "Copied" : "Copy email"}
      </button>
      {/* announced to screen readers; the visible button text changes too */}
      <span role="status" aria-live="polite" className="text-sm text-ink">
        {state === "copied" && <span className="sr-only">Email address copied to clipboard.</span>}
        {state === "failed" && "Couldn’t copy — select the address instead."}
      </span>
    </span>
  );
}
