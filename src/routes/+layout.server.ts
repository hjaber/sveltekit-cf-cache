import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ fetch, setHeaders }) => {
  // const data = await fetch("https://uuid.rocks/json");
  const data = await fetch("/api/rocks-cache");
  const uuid: uuidJson = await data.json();
  const { timestamp } = uuid.data;
  // Convert ISO 8601 timestamp to HH:MM:SS format
  const readableTimestamp = new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  //create html for a nav element with tailwindcss
  const nav = `
    <a href="/" class="text-2xl font-bold text-gray-800">${readableTimestamp}</a>
    <div class="flex">
      <a href="/about" class="text-gray-500 hover:text-gray-600 mx-4">About</a>
      <a href="/blog" class="text-gray-500 hover:text-gray-600">Blog</a>
    </div>
    <div class="flex">
      <a href="/login" class="text-gray-500 hover:text-gray-600">Login</a>
      <a href="/register" class="ml-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600">Sign Up</a>
    </div>
  `;

  // setHeaders with cache-control for 180seconds
  setHeaders({
    "cache-control": "s-maxage=180",
  });
  return {
    timestamp: readableTimestamp,
    nav,
  };
};

type uuidJson = {
  data: {
    apiVersion: string;
    uuid: string;
    is_readable_uuid: false;
    is_short_uuid: false;
    is_ulid: false;
    timestamp: string;
  };
};
