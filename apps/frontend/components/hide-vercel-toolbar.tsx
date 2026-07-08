"use client";

import { useEffect } from "react";

const toolbarSelectors = [
  "vercel-live-feedback",
  "vercel-toolbar",
  "[data-vercel-toolbar]",
  "[data-vercel-live-feedback]",
  "iframe[src*='vercel.live']",
  "iframe[src*='vercel-toolbar']"
];

export function HideVercelToolbar() {
  useEffect(() => {
    const hideToolbar = () => {
      document.querySelectorAll(toolbarSelectors.join(",")).forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.display = "none";
          element.style.pointerEvents = "none";
          element.setAttribute("aria-hidden", "true");
        }
      });
    };

    hideToolbar();
    const observer = new MutationObserver(hideToolbar);
    observer.observe(document.documentElement, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
