// src/routes/api/timestamp/+server.ts
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = () => {
  const now = new Date();
  return json({
    serverTime: now.toISOString(),
  });
};
