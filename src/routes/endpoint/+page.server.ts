// src/routes/endpoint/+page.server.ts
import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const [dynamicData, cachedData] = await Promise.all([
    fetch("https://uuid.rocks/json"),
    fetch("/api/uuid"),
  ]);

  const dynamicUuid: uuidJson = await dynamicData.json();
  const cachedUuid: uuidJson = await cachedData.json();

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
