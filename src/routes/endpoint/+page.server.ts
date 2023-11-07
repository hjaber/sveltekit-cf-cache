// src/routes/endpoint/+page.server.ts
import type { PageServerLoad } from "./$types";

type uuidJson = {
  apiVersion: string;
  uuid: string;
  is_readable_uuid: false;
  is_short_uuid: false;
  is_ulid: false;
  timestamp: string;
};

export const load: PageServerLoad = async ({ fetch }) => {
  const startTimeDynamic = performance.now();
  const dynamicData = await fetch("https://uuid.rocks/json");
  const endTimeDynamic = performance.now();

  const startTimeCached = performance.now();
  const cachedData = await fetch("/api/uuid");
  const endTimeCached = performance.now();

  const dynamicUuid: uuidJson = await dynamicData.json();
  const cachedUuid: uuidJson = await cachedData.json();

  return {
    cachedUuid,
    dynamicUuid,
    dynamicDuration: Math.round(endTimeDynamic - startTimeDynamic),
    cachedDuration: Math.round(endTimeCached - startTimeCached),
  };
};
