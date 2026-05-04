import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { createHash } from 'crypto';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

function hashIp(ip: string): string {
  return createHash('sha256').update(ip + 'salt-rbb').digest('hex');
}

function getIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress ?? 'unknown';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { choice } = req.body ?? {};
  if (choice !== 'red' && choice !== 'blue') {
    return res.status(400).json({ error: 'Invalid choice' });
  }

  const ip = getIp(req);
  const ipHash = hashIp(ip);
  const country = (req.headers['x-vercel-ip-country'] as string) ?? null;

  // Check for duplicate vote via IP
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data: existing } = await supabase
    .from('ip_log')
    .select('last_vote')
    .eq('ip_hash', ipHash)
    .single();

  if (existing && existing.last_vote > cutoff) {
    return res.status(429).json({ error: 'Already voted' });
  }

  // Insert vote
  const { error: voteError } = await supabase
    .from('votes')
    .insert({ choice, country, ip_hash: ipHash });

  if (voteError) {
    console.error('vote insert error:', voteError);
    return res.status(500).json({ error: 'Failed to record vote', detail: voteError.message });
  }

  // Upsert ip_log
  await supabase
    .from('ip_log')
    .upsert({ ip_hash: ipHash, last_vote: new Date().toISOString() });

  // Fetch current totals
  const { data: totals } = await supabase
    .from('votes')
    .select('choice');

  const red = totals?.filter((v) => v.choice === 'red').length ?? 0;
  const blue = totals?.filter((v) => v.choice === 'blue').length ?? 0;
  const total = red + blue;
  const redPct = total > 0 ? Math.round((red / total) * 100) : 50;
  const bluePct = 100 - redPct;

  const blueMajority = blue >= red;
  const survived = blueMajority ? true : choice === 'red';

  return res.status(200).json({
    survived,
    results: { red, blue, total, redPct, bluePct, countries: [] },
  });
}
