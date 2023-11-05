<!-- /src/routes/client/+page.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  export let data;

  let dateAndTime = "Waiting two seconds for client render...";

  onMount(() => {
    setTimeout(() => {
      dateAndTime = `Client rendered at ${new Date().toLocaleString()}`;
    }, 2000);
  });
</script>

<h1>Dynamic data pre-rendered & Client Rendering</h1>
<code>export const prerender = true;</code>
<h3>data call to uuid.rocks</h3>
<pre>{JSON.stringify(data.uuid, null, 2)}</pre>
<p>courtesy of <a href="https://uuid.rocks/">uuid.rocks</a></p>
<h3>Headers in load()</h3>
<pre>"CDN-Cache-Control": "public, max-age=14400"</pre>

<p>{dateAndTime}</p>
