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

async function fetchWithPerformance(
  url: string,
  fetch: any
): Promise<[uuidJson, number]> {
  const startTime = performance.now();
  const response = await fetch(url);
  const data: uuidJson = await response.json();
  const endTime = performance.now();
  return [data, Math.round(endTime - startTime)];
}

export const load: PageServerLoad = async ({ fetch }) => {
  const [dynamicResult, cachedResult] = await Promise.all([
    fetchWithPerformance("https://uuid.rocks/json", fetch),
    fetchWithPerformance("/api/uuid", fetch),
  ]);

  return {
    dynamicUuid: dynamicResult[0],
    dynamicDuration: dynamicResult[1],
    cachedUuid: cachedResult[0],
    cachedDuration: cachedResult[1],
  };
};
