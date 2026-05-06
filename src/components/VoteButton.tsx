import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { Choice } from "../types";

interface VoteButtonProps {
  color: Choice;
  disabled: boolean;
  onVote: (choice: Choice) => void;
}

function VoteButton({ color, disabled, onVote }: VoteButtonProps) {
  const { t } = useTranslation();
  const [pressed, setPressed] = useState(false);

  function handleClick() {
    if (disabled || pressed) return;
    setPressed(true);
    onVote(color);
  }

  const key =
    color === "red"
      ? "landing-page.vote-button.red.label"
      : "landing-page.vote-button.blue.label";
  const label = t(key);

  return (
    <motion.button
      className={`w-40 h-40 max-[480px]:w-32.5 max-[480px]:h-32.5 rounded-full border-2 border-transparent cursor-pointer font-display text-base max-[480px]:text-[0.85rem] font-black tracking-[0.18em] uppercase text-white transition-shadow duration-200 relative flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50 ${color === "red" ? "vote-btn-red" : "vote-btn-blue"}`}
      onClick={handleClick}
      disabled={disabled || pressed}
      aria-label={label}
      whileHover={!disabled && !pressed ? { scale: 1.06 } : {}}
      whileTap={!disabled && !pressed ? { scale: 0.94 } : {}}
      animate={pressed ? { scale: [0.94, 1.08, 1] } : {}}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <span className="relative z-10 [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
        {label}
      </span>
    </motion.button>
  );
}

export default VoteButton;
