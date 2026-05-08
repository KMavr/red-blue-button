import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!.replace(/\/$/, ''),
  process.env.SUPABASE_SERVICE_KEY!,
);

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const { data, error } = await supabase.rpc('get_results');

  if (error) {
    return res.status(500).json({ error: 'Failed to fetch results' });
  }

  const red = data.red as number;
  const blue = data.blue as number;
  const total = red + blue;
  const redPct = total > 0 ? Math.round((red / total) * 100) : 50;
  const bluePct = 100 - redPct;
  const countries = (data.countries ?? []) as {
    country: string;
    red: number;
    blue: number;
    total: number;
  }[];

  return res.status(200).json({ red, blue, total, redPct, bluePct, countries });
}
