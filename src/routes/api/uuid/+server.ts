// src/routes/api/uuid/+server.ts
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ setHeaders }) => {
  const data = await fetch("https://uuid.rocks/json");
  const uuid: uuidJson = await data.json();
  setHeaders({
    "cache-control": "public, max-age=7200, stale-while-revalidate=3600",
    "cdn-cache-control": "max-age=7200, stale-while-revalidate=3600",
  });
  return json({
    uuid,
  });
};

type uuidJson = {
  apiVersion: string;
  uuid: string;
  is_readable_uuid: false;
  is_short_uuid: false;
  is_ulid: false;
  timestamp: string;
};
