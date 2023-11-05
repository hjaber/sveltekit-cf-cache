//src/routes/client/server.ts
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = () => {
  const now = new Date();
  return json({
    serverTime: now.toISOString(),
  });
};
