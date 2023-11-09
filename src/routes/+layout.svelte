<script lang="ts">
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<nav>
  <a href="/">{data.timestamp}</a>
  <a href="/static">Static</a>
  <a href="headers">Headers</a>
  <a href="/dynamic">Dynamic</a>
  <a href="/prerender">Prerender</a>
  <a href="/benchmark">benchmark</a>
</nav>
<slot />

<style>
  nav {
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    background: #eee;
  }
</style>
