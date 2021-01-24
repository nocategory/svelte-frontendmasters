<script>
  import { onMount } from 'svelte'
  import Welcome from './screens/Welcome.svelte'
  import Game from './screens/Game.svelte'
  import { select } from './select'
  import { load_image } from './utils'

  let state = 'welcome'
  let selection

  let celebrities_promise

  const start = async (e) => {
    const { celebs, lookup } = await celebrities_promise

    selection = select(celebs, lookup, e.detail.category.slug)
    state = 'playing'
  }

  const load_celebrities = async () => {
    const res = await fetch('https://cameo-explorer.netlify.app/celebs.json')
    const data = await res.json()

    const lookup = new Map()

    data.forEach((c) => {
      lookup.set(c.id, c)
    })

    const subset = new Set()
    data.forEach((c) => {
      if (c.reviews >= 50) {
        subset.add(c)
        c.similar.forEach((id) => {
          subset.add(lookup.get(id))
        })
      }
    })

    return {
      celebs: Array.from(subset),
      lookup,
    }
  }

  onMount(() => {
    celebrities_promise = load_celebrities()

    load_image('/icons/right.svg')
    load_image('/icons/wrong.svg')
  })
</script>

<div class="App">
  {#if state === 'welcome'}
    <Welcome on:select={start} />
  {:else}
    <Game {selection} on:restart={() => (state = 'welcome')} />
  {/if}
</div>

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
