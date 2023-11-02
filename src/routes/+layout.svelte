<nav>
  <a href="/">Home</a>
  <a href="/static">Static</a>
  <a href="headers">Headers</a>
  <a href="/dynamic">Dynamic</a>
  <a href="/prerender">Prerender</a>
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
