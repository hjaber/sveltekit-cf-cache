// src/routes/benchmark/+page.server.ts
import { dev } from "$app/environment";
import type { PageServerLoad } from "../client/$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const apiNames = ["dynamic", "dynamic-cache-headers", "prerender"];

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
    const times = [];
    for (let i = 0; i < numberOfTests; i++) {
      const start = performance.now();
      try {
        await fetch(url);
      } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        // Fill the remaining tests with null to indicate failure
        while (times.length < numberOfTests) {
          times.push(null);
        }
        break;
      }
      const end = performance.now();
      times.push(end - start);
    }
    return {
      endpoint: url,
      times: times,
      average:
        times.filter((t) => t !== null).reduce((a, b) => a + b, 0) /
        times.filter((t) => t !== null).length,
    };
  };

  // Perform the fetch tests
  const results = await Promise.all(
    endpoints.map((endpoint) => fetchWithTiming(endpoint))
  );

  // Sort results into a record for easy access
  const endpointTimes = results.reduce((acc, { endpoint, times, average }) => {
    acc[endpoint] = { times, average };
    return acc;
  }, {} as Record<string, { times: number[]; average: number }>);

  return { endpointTimes };
};
