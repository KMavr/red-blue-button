import { useState } from "react";

const SITE_URL = "https://red-blue-button.vercel.app";

export function useShare(survived: boolean | null) {
  const [copied, setCopied] = useState(false);

  function share() {
    const outcome = survived ? "survived" : "died";
    const text = `I just pressed a button and ${outcome}. What would you press?\n\n${SITE_URL}`;

    if (navigator.share) {
      navigator
        .share({ title: "Red or Blue?", text, url: SITE_URL })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  return { copied, share };
}
