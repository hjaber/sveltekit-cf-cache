<!-- /src/routes/endpoint/+page.svelte -->
<script lang="ts">
  export let data;
</script>

<h1>Cached Endpoint & Dynamic Load Function</h1>

<h3>Dynamic load call to uuid.rocks</h3>
<pre>{JSON.stringify(data.dynamicUuid, null, 2)}</pre>
<p>Duration: {data.dynamicDuration} ms</p>

<h3>External API endpoint call to uuid.rocks</h3>
<pre>{JSON.stringify(data.cachedUuid, null, 2)}</pre>
<p>Duration: {data.cachedDuration} ms</p>

<h3>Internal API endpoint call to uuid.rocks</h3>
<pre>{JSON.stringify(data.internalUuid, null, 2)}</pre>
<p>Duration: {data.internalDuration} ms</p>

<p>courtesy of <a href="https://uuid.rocks/">uuid.rocks</a></p>
