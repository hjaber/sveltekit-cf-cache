<script lang="ts">
  export let data;
</script>

<h1>Dynamic data</h1>
<h3>data call to uuid.rocks</h3>
<pre>{JSON.stringify(data.uuid, null, 2)}</pre>
<p>courtesy of <a href="https://uuid.rocks/">uuid.rocks</a></p>

<h3>Headers in load()</h3>
<!-- <pre> "cache-control": "public, max-age=7200, stale-while-revalidate=3600", 
 "CDN-Cache-Control": "public, max-age=14400"</pre> -->
