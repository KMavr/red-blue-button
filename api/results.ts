import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!.replace(/\/$/, ''),
  process.env.SUPABASE_SERVICE_KEY!
);

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const { data, error } = await supabase
    .from('votes')
    .select('choice, country');

  if (error) {
    return res.status(500).json({ error: 'Failed to fetch results' });
  }

  const votes = data ?? [];
  const red = votes.filter((v) => v.choice === 'red').length;
  const blue = votes.filter((v) => v.choice === 'blue').length;
  const total = red + blue;
  const redPct = total > 0 ? Math.round((red / total) * 100) : 50;
  const bluePct = 100 - redPct;

  // Aggregate by country
  const countryMap = new Map<string, { red: number; blue: number }>();
  for (const vote of votes) {
    const code = vote.country ?? 'XX';
    const entry = countryMap.get(code) ?? { red: 0, blue: 0 };
    if (vote.choice === 'red') entry.red++;
    else entry.blue++;
    countryMap.set(code, entry);
  }

  const countries = Array.from(countryMap.entries())
    .map(([country, counts]) => ({
      country,
      red: counts.red,
      blue: counts.blue,
      total: counts.red + counts.blue,
    }))
    .sort((a, b) => b.total - a.total);

  return res.status(200).json({ red, blue, total, redPct, bluePct, countries });
}
