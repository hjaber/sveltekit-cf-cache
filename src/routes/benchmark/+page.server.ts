// src/routes/benchmark/+page.server.ts
import { dev } from "$app/environment";
import type { PageServerLoad } from "../client/$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const apiNames = [
    "dynamic",
    "dynamic-cache-headers",
    "prerender",
    "prerender-cache-headers",
  ];

  const localBaseURL = "http://localhost:5173/api";
  const prodBaseURL = "https://demo.tripcafe.org/api";
  const externalBaseURL = dev ? localBaseURL : prodBaseURL;

  const endpoints = apiNames.flatMap((apiName) => [
    `/api/${apiName}`,
    `${externalBaseURL}/${apiName}`,
  ]);

  const fetchWithTiming = async (url: string) => {
    const start = performance.now();
    try {
      await fetch(url);
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      return { endpoint: url, time: null };
    }
    const end = performance.now();
    return { endpoint: url, time: end - start };
  };

  const results = await Promise.all(
    endpoints.map((endpoint) => fetchWithTiming(endpoint))
  );

  const endpointTimes = results.reduce((acc, { endpoint, time }) => {
    acc[endpoint] = time ?? "Error";
    return acc;
  }, {} as Record<string, number | "Error">);

  return { endpointTimes };
};
