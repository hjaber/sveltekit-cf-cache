// src/routes/endpoint/+page.server.ts
import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch, setHeaders }) => {
  const data = await fetch("https://uuid.rocks/json");
  const dynamicUuid: uuidJson = await data.json();
  const cachedData = await fetch("/api/uuid");
  const cachedUuid: uuidJson = await cachedData.json();

  setHeaders({
    "Cache-Control": "public, max-age=14400",
    "CDN-Cache-Control": "max-age=14400",
  });

  return { cachedUuid, dynamicUuid };
}) satisfies PageServerLoad;

type uuidJson = {
  apiVersion: string;
  uuid: string;
  is_readable_uuid: false;
  is_short_uuid: false;
  is_ulid: false;
  timestamp: string;
};