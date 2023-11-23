// src/routes/api/worker-cache/+server.ts
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request }) => {
  const cacheTtl = 60; // set cache TTL to 1 min

  // Parallel fetching of both resources
  const [httpbinResponse, uuidRocksResponse] = await Promise.all([
    fetch("https://httpbin.org/delay/0.3", {
      cf: {
        cacheTtl: cacheTtl,
        cacheEverything: true,
      },
    }),
    fetch("https://uuid.rocks/json", {
      cf: {
        cacheTtl: cacheTtl,
        cacheEverything: true,
      },
    }),
  ]);

  // Parsing the JSON responses
  await httpbinResponse.json(); // Assuming this is still needed for side effects
  const currentTimeData = await uuidRocksResponse.json();
  const cachedTime = new Date(currentTimeData.timestamp).toUTCString();
  const currentTime = new Date().toUTCString();

  return json({
    currentTime: `Current time: ${currentTime}`,
    cachedTime: `Cached time: ${cachedTime}`,
  });
};
