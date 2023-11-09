// src/routes/benchmark/+page.server.ts
import { dev } from "$app/environment";
import type { PageServerLoad } from "../client/$types";

// Helper function to delay subsequent calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const load: PageServerLoad = async ({ fetch }) => {
  const apiNames = [
    "dynamic",
    "dynamic-cache-headers",
    "prerender",
    "prerender-cache-headers",
  ];

  // Local external endpoints
  const localBaseURL = "http://localhost:5173/api";
  // Production external endpoints
  const prodBaseURL = "https://demo.tripcafe.org/api";
  // Selecting the base URL based on the environment
  const externalBaseURL = dev ? localBaseURL : prodBaseURL;

  // Including both internal (relative URL) and external (absolute URL) endpoints
  const endpoints = apiNames.flatMap((apiName) => [
    `/api/${apiName}`, // Internal endpoints
    `${externalBaseURL}/${apiName}`, // External endpoints
  ]);

  const numberOfTests = 5;
  const fetchWithTiming = async (url: string) => {
    const times: (number | null)[] = [];
    for (let i = 0; i < numberOfTests; i++) {
      if (i > 0) await delay(500); // 500ms delay between each call, except before the first call
      const start = performance.now();
      try {
        await fetch(url);
      } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        times.push(null);
        continue; // Skip to the next iteration
      }
      const end = performance.now();
      times.push(end - start); // Individual times recorded, not cumulative
    }
    const validTimes = times.filter((t): t is number => t !== null);
    return {
      endpoint: url,
      times: times,
      average:
        validTimes.length > 0
          ? validTimes.reduce((a, b) => a + b) / validTimes.length
          : null,
    };
  };

  // Perform the fetch tests
  const results = await Promise.all(
    endpoints.map((endpoint) => fetchWithTiming(endpoint))
  );

  // Sort results into a record for easy access
  const endpointTimes = results.reduce((acc, { endpoint, times, average }) => {
    acc[endpoint] = { times, average: average ?? "Error" };
    return acc;
  }, {} as Record<string, { times: (number | null)[]; average: number | "Error" }>);

  return { endpointTimes };
};
