<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  // Helper function to format endpoint names for display
  function formatEndpointName(endpoint: string) {
    return endpoint
      .replace("http://localhost:5173", "internal-")
      .replace("https://demo.tripcafe.org", "internal-")
      .replace("/api/", "");
  }
</script>

<div class="benchmark-container">
  <h1>Benchmark Results</h1>
  <div class="benchmark-results">
    <div class="header">Endpoint</div>
    <div class="header">Test 1</div>
    <div class="header">Test 2</div>
    <div class="header">Test 3</div>
    <div class="header">Test 4</div>
    <div class="header">Test 5</div>
    <div class="header">Average</div>
    {#each Object.entries(data.endpointTimes) as [endpoint, { average, times }]}
      <!-- Format the endpoint name for display -->
      <div>{formatEndpointName(endpoint)}</div>

      <!-- Display each individual test time -->
      {#each times as time}
        <div>{time !== null ? Math.round(time) : "Error"}</div>
      {/each}

      <!-- Display the average time, highlighting the fastest and slowest -->
      <div
        class:fastest={average ===
          Math.min(
            ...Object.values(data.endpointTimes).map((et) => et.average)
          )}
        class:slowest={average ===
          Math.max(
            ...Object.values(data.endpointTimes).map((et) => et.average)
          )}
      >
        {average !== null ? Math.round(average) : "Error"}
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
    grid-template-columns: repeat(7, auto);
    gap: 10px;
    text-align: center;
  }

  .header {
    font-weight: bold;
  }

  .fastest {
    color: #006400; /* DarkGreen */
  }

  .slowest {
    color: #8b0000; /* DarkRed */
  }
</style>
