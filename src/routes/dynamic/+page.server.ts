import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch, setHeaders }) => {
  const data = await fetch("https://uuid.rocks/json");
  const uuid: uuidJson = await data.json();
  setHeaders({
    "CDN-Cache-Control": "public, max-age=14400",
  });

  return { uuid };
}) satisfies PageServerLoad;

type uuidJson = {
  apiVersion: string;
  uuid: string;
  is_readable_uuid: false;
  is_short_uuid: false;
  is_ulid: false;
  timestamp: string;
};
