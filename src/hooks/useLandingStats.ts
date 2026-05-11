import { useEffect, useRef, useState } from 'react';

const POLL_INTERVAL = 5000;

export function useLandingStats() {
  const [total, setTotal] = useState<number | null>(null);
  const prevTotal = useRef<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchTotal = async () => {
      try {
        const res = await fetch('/api/results', { signal: controller.signal });
        if (!res.ok) return;
        const data = await res.json();
        prevTotal.current = total;
        setTotal(data.total);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTotal();
    const id = setInterval(fetchTotal, POLL_INTERVAL);
    return () => {
      clearInterval(id);
      controller.abort();
    };
  }, []);

  return { total };
}
