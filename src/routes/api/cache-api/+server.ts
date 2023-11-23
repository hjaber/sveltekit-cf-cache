// src/routes/api/cache-api/+server.ts
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ platform }) => {
  // Assuming we have access to the Cache API through the platform object,
  // which is not normally the case outside of a Cloudflare Worker.
  const cache = platform?.caches?.default;
  let data;
  let response = await cache?.match("https://httpbin.org/delay/0.3");

  if (!response) {
    // Cache miss, fetch from origin
    response = await fetch("https://httpbin.org/delay/0.3");
    data = await response.json();
    // Attempt to cache the fetched response
    response = new Response(JSON.stringify(data), response);
    await cache?.put("https://httpbin.org/delay/0.3", response.clone());
  } else {
    // Cache hit, extract the data
    data = await response.json();
  }

  // Cache TTL is handled by the Cache API, no need to set it manually
  return json(data);
};
