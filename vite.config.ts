import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import type { Plugin } from 'vite';

const MOCK_RESULTS_BLUE = {
  red: 3812,
  blue: 5944,
  total: 9756,
  redPct: 39,
  bluePct: 61,
  countries: [
    { country: 'US', red: 1200, blue: 2100, total: 3300 },
    { country: 'GB', red: 420, blue: 810, total: 1230 },
    { country: 'DE', red: 310, blue: 590, total: 900 },
    { country: 'JP', red: 280, blue: 540, total: 820 },
    { country: 'BR', red: 390, blue: 430, total: 820 },
    { country: 'FR', red: 260, blue: 480, total: 740 },
    { country: 'AU', red: 195, blue: 340, total: 535 },
    { country: 'CA', red: 180, blue: 320, total: 500 },
    { country: 'IN', red: 220, blue: 240, total: 460 },
    { country: 'XX', red: 357, blue: 94, total: 451 },
  ],
};

const swapColors = (r: typeof MOCK_RESULTS_BLUE) => ({
  ...r,
  red: r.blue,
  blue: r.red,
  redPct: r.bluePct,
  bluePct: r.redPct,
  countries: r.countries.map((c) => ({ ...c, red: c.blue, blue: c.red })),
});

// Flip to 'red' to exercise the red-majority outcome path in dev.
const MAJORITY = 'blue' as 'red' | 'blue';
const mockResults = MAJORITY === 'red' ? swapColors(MOCK_RESULTS_BLUE) : MOCK_RESULTS_BLUE;

function mockApiPlugin(): Plugin {
  return {
    name: 'mock-api',
    configureServer(server) {
      server.middlewares.use('/api/results', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(mockResults));
      });

      server.middlewares.use('/api/vote', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ results: mockResults }));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), mockApiPlugin()],
});
