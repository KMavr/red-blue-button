import { useEffect, useRef, useState } from 'react';

const POLL_INTERVAL = 5000;

export function useLandingStats() {
  const [total, setTotal] = useState<number | null>(null);
  const prevTotal = useRef<number | null>(null);

  useEffect(() => {
    async function fetchTotal() {
      try {
        const res = await fetch('/api/results');
        if (!res.ok) return;
        const data = await res.json();
        prevTotal.current = total;
        setTotal(data.total);
      } catch {
        // silently ignore
      }
    }

    fetchTotal();
    const id = setInterval(fetchTotal, POLL_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return { total };
}
