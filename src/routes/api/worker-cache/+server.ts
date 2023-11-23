// src/routes/api/worker-cache/+server.ts
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request }) => {
  const cacheTtl = 60; // set cache TTL to 1 min

  const response = await fetch("https://httpbin.org/delay/0.3", {
    cf: {
      cacheTtl: cacheTtl,
      cacheEverything: true,
    },
  });
  await response.json();
  const country = request.headers.get("CF-IPCountry");

  const cachedTime = new Date().toLocaleString("en-US", {
    timeZone: country || "UTC",
  });

  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: country || "UTC",
  });

  return json({
    cachedTime: `Cached at: ${cachedTime}`,
    currentTime: `Current time: ${currentTime}`,
  });
};
