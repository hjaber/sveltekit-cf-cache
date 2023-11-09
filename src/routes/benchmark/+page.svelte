<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  // Simplified helper function to format endpoint names for display
  function formatEndpointName(endpoint: string) {
    return endpoint.startsWith("/api/")
      ? `Internal ${endpoint.replace("/api/", "")}`
      : `External ${endpoint.split("/api/").pop()}`;
  }

  // Helper function to filter out error strings and parse the remaining numbers
  function filterNumbers(arr: (number | "Error")[]): number[] {
    return arr.filter((item): item is number => item !== "Error");
  }

  // Compute the fastest and slowest times while excluding "Error" values
  let fastest = Math.min(
    ...filterNumbers(Object.values(data.endpointTimes).map((et) => et.average))
  );
  let slowest = Math.max(
    ...filterNumbers(Object.values(data.endpointTimes).map((et) => et.average))
  );
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
        class:fastest={average !== "Error" && average === fastest}
        class:slowest={average !== "Error" && average === slowest}
      >
        {average !== "Error" ? Math.round(average) : average}
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
