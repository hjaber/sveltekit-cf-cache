// src/routes/api/timestamp/+server.ts
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  const data = await fetch("https://uuid.rocks/json");
  const uuid: uuidJson = await data.json();
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
