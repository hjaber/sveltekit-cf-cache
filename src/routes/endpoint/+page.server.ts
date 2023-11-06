// src/routes/endpoint/+page.server.ts
import { dev } from "$app/environment";
import type { PageServerLoad } from "./$types";

const cachedUrl = dev
  ? "http://localhost:3000/api/uuid"
  : "http://demo.tripcafe.org/api/uuid";

export const load = (async ({ fetch }) => {
  const data = await fetch("https://uuid.rocks/json");
  const dynamicUuid: uuidJson = await data.json();
  const cachedData = await fetch(cachedUrl);
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
