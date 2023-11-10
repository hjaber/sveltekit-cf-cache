import type { LayoutServerLoad } from "./$types";
export const prerender = false;

export const load: LayoutServerLoad = async () => {
  const data = await fetch("https://uuid.rocks/json");
  const uuid: uuidJson = await data.json();
  const { timestamp } = uuid;
  return {
    timestamp,
  };
};

type uuidJson = {
  apiVersion: string;
  uuid: string;
  is_readable_uuid: false;
  is_short_uuid: false;
  is_ulid: false;
  timestamp: string;
};
