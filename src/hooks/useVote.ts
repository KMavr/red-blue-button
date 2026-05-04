import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import type { Choice } from "../types";

export function useVote() {
  const navigate = useNavigate();
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (Cookies.get("voted")) {
      navigate("/results", { replace: true });
    }
  }, [navigate]);

  async function submit(choice: Choice) {
    setVoting(true);
    setError(null);

    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ choice }),
      });

      if (res.status === 429) {
        Cookies.set("voted", "1", { expires: 1 });
        Cookies.set("last_choice", choice, { expires: 365 });
        navigate("/results", { state: { choice } });
        return;
      }

      if (!res.ok) {
        setError("Something went wrong. Try again.");
        setVoting(false);
        return;
      }

      const data = await res.json();
      Cookies.set("voted", "1", { expires: 1 });
      Cookies.set("last_choice", choice, { expires: 365 });
      navigate("/results", {
        state: { choice, survived: data.survived, results: data.results },
      });
    } catch {
      setError("Network error. Try again.");
      setVoting(false);
    }
  }

  return { voting, error, submit };
}
