import React, { useState } from "react";
import { X } from "lucide-react";

export default function UrgencyBanner() {
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem("urgency-banner-dismissed") === "true";
  });

  const dismiss = () => {
    localStorage.setItem("urgency-banner-dismissed", "true");
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="bg-accent text-accent-foreground px-4 py-3 flex items-center justify-center gap-3 relative z-[60]">
      <p className="text-sm font-medium text-center">
        ☀️ <strong>Summer 2026 spots are filling fast</strong> — only a few openings remain!{" "}
        <a href="/book-lessons" className="underline font-semibold">Book your lesson today.</a>
      </p>
      <button
        onClick={dismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/10 transition-colors"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </div>
  );
}