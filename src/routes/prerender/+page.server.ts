import type { PageServerLoad } from "./$types";
export const prerender = true;

export const load = (async ({ fetch, setHeaders }) => {
  const data = await fetch("https://uuid.rocks/json");
  const uuid: uuidJson = await data.json();
  setHeaders({
    "Cache-Control": "public, max-age=14400",
    "CDN-Cache-Control": "max-age=14400",
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
