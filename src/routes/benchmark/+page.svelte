<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  function formatEndpointName(endpoint: string) {
    return endpoint.startsWith("/api/")
      ? `Internal ${endpoint.replace("/api/", "")}`
      : `External ${endpoint.split("/api/").pop()}`;
  }

  // Extracting only numeric values for computation
  const times = Object.values(data.endpointTimes).filter(
    (time): time is number => time !== "Error"
  );

  let fastest = times.length > 0 ? Math.min(...times) : null;
  let slowest = times.length > 0 ? Math.max(...times) : null;
</script>

<div class="benchmark-container">
  <h1>Benchmark Results</h1>
  <div class="benchmark-results">
    <div class="header">Endpoint</div>
    <div class="header">Time (ms)</div>
    {#each Object.entries(data.endpointTimes) as [endpoint, time]}
      <div>{formatEndpointName(endpoint)}</div>
      <div class:fastest={time === fastest} class:slowest={time === slowest}>
        {time !== "Error" ? Math.round(time) + " ms" : time}
      </div>
    {/each}
  </div>
</div>

<style>
  .benchmark-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .benchmark-results {
    display: grid;
    grid-template-columns: auto auto; /* Two columns: one for endpoint, one for time */
    gap: 10px;
    text-align: center;
  }

  .header {
    font-weight: bold;
  }

  .fastest {
    color: #006400; /* DarkGreen for the fastest time */
  }

  .slowest {
    color: #8b0000; /* DarkRed for the slowest time */
  }
</style>
