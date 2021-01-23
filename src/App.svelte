<script>
  import Welcome from './screens/Welcome.svelte'
  let state = 'welcome'

  const start = (e) => {
    console.log(e)
  }
</script>

<style>
  :global(body) {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
  .App {
    text-align: center;
    padding: 1em;
    max-width: 800px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>

<div class="App">
  {#if state === 'welcome'}
  <Welcome on:select={start} />
  {:else}
  <p>game screen</p>
  {/if}
</div>
