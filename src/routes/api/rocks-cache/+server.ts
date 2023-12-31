// src/routes/api/rocks-cache/+server.ts
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ platform }) => {
  const cacheTtl = 180; // Attempt to set cache TTL to 3 min

  const response = await fetch("https://uuid.rocks/json", {
    cf: {
      cacheTtl: cacheTtl,
      cacheEverything: true,
    },
  });
  const data: dataJson = await response.json();
  return json({
    data,
  });
};
