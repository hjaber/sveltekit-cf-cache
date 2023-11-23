// src/routes/api/worker-cache/+server.ts
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ platform }) => {
  const cacheUrl = "https://httpbin.org/delay/0.3";
  let response = await platform?.caches?.default.match(cacheUrl);

  if (!response) {
    // Fetch from origin
    response = await fetch(cacheUrl);

    // Clone the response so we can modify headers
    response = new Response(response.body, response);
    // Attempt to set cache control for 10 seconds
    response.headers.set("Cache-Control", "s-maxage=10");

    // Wait until the cache is updated
    await platform?.caches?.default.put(cacheUrl, response.clone());
  }

  const data = await response.json();
  return json(data);
};
