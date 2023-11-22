// src/routes/api/worker-cache/+server.ts
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ platform }) => {
  const cacheTtl = 180; // Attempt to set cache TTL to 180 seconds

  // The following is a speculative attempt; typically, platform.cf doesn't provide this capability.
  const response = await fetch(
    "https://cached-db-worker.luna-heavy.workers.dev/",
    {
      cf: {
        cacheTtl: cacheTtl,
        cacheEverything: true,
      },
    }
  );
  const platformObj = JSON.stringify(platform.cf);
  const data: dataJson = await response.json();
  return json({
    data,
    platformObj,
  });
};

type dataJson = {
  args: Record<string, unknown>;
  data: string;
  files: Record<string, unknown>;
  form: Record<string, unknown>;
  headers: {
    Accept: string;
    "Accept-Encoding": string;
    "Accept-Language": string;
    "Cache-Control": string;
    Dnt: string;
    Host: string;
    Pragma: string;
    "Sec-Ch-Ua": string;
    "Sec-Ch-Ua-Mobile": string;
    "Sec-Ch-Ua-Platform": string;
    "Sec-Fetch-Dest": string;
    "Sec-Fetch-Mode": string;
    "Sec-Fetch-Site": string;
    "Sec-Fetch-User": string;
    "Sec-Gpc": string;
    "Upgrade-Insecure-Requests": string;
    "User-Agent": string;
    "X-Amzn-Trace-Id": string;
  };
  origin: string;
  url: string;
};
