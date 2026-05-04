import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";

const MOCK_RESULTS = {
  red: 3812,
  blue: 5944,
  total: 9756,
  redPct: 39,
  bluePct: 61,
  countries: [
    { country: "US", red: 1200, blue: 2100, total: 3300 },
    { country: "GB", red: 420, blue: 810, total: 1230 },
    { country: "DE", red: 310, blue: 590, total: 900 },
    { country: "JP", red: 280, blue: 540, total: 820 },
    { country: "BR", red: 390, blue: 430, total: 820 },
    { country: "FR", red: 260, blue: 480, total: 740 },
    { country: "AU", red: 195, blue: 340, total: 535 },
    { country: "CA", red: 180, blue: 320, total: 500 },
    { country: "IN", red: 220, blue: 240, total: 460 },
    { country: "XX", red: 357, blue: 94, total: 451 },
  ],
};

function mockApiPlugin(): Plugin {
  return {
    name: "mock-api",
    configureServer(server) {
      server.middlewares.use("/api/results", (_req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(MOCK_RESULTS));
      });

      server.middlewares.use("/api/vote", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }
        let body = "";
        req.on("data", (chunk: Buffer) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          const { choice } = JSON.parse(body || "{}");
          const survived =
            choice === "red" || MOCK_RESULTS.blue >= MOCK_RESULTS.red;

          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ survived, results: MOCK_RESULTS }));
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), mockApiPlugin()],
});
