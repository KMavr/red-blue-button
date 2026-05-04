import { useState } from "react";

const SITE_URL = "https://red-or-blue.vercel.app";

export function useShare(survived: boolean | null, bluePct: number) {
  const [copied, setCopied] = useState(false);

  function share() {
    const outcome = survived ? "survived" : "died";
    const text = `I just pressed a button and ${outcome}. ${bluePct}% of people chose blue (everyone lives). What would you press?\n\n${SITE_URL}`;

    if (navigator.share) {
      navigator.share({ title: "Red or Blue?", text, url: SITE_URL }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  return { copied, share };
}
