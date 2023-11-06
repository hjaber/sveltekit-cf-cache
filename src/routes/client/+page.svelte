<!-- /src/routes/client/+page.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  export let data;

  let dateAndTime = "Waiting two seconds for client render...";
  let serverDateAndTime = "Fetching server date and time...";
  let serverUuid = "Fetching server uuid...";
  const fetchServerTime = async () => {
    const response = await fetch("/api/timestamp");
    const { serverTime } = await response.json();
    serverDateAndTime = `Server date and time: ${new Date(
      serverTime
    ).toLocaleString()}`;
  };

  const fetchUuid = async () => {
    const response = await fetch("/api/uuid");
    return (serverUuid = await response.json());
  };

  onMount(() => {
    fetchServerTime();
    fetchUuid();
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
<p>{serverDateAndTime}</p>
<p>Server uuid:</p>
<pre>{JSON.stringify(serverUuid, null, 2)}</pre>
