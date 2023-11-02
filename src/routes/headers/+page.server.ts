import type { PageServerLoad } from "./$types";

export const load = (({ setHeaders }) => {
  setHeaders({
    "CDN-Cache-Control": "public, max-age=14400",
  });
  return {};
}) satisfies PageServerLoad;
