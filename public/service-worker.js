const CACHE_NAME = `cache_${'__TIMESTAMP__'}`

const shell = [
  './',
  './manifest.json',
  './global.css',
  './icons/right.svg',
  './icons/wrong.svg',
  './icons/compare.svg',
  '/dist/index.js',
  '/global.css',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(shell))
      .then(() => {
        self.skipWaiting()
      })
      .catch((err) => {
        console.log('Unable to subscribe to push: ', err)
      })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(async (keys) => {
      // delete old caches
      for (const key of keys) {
        if (key !== CACHE_NAME) await caches.delete(key)
      }

      self.clients.claim()
    })
  )
})

self.addEventListener('fetch', (event) => {
  // try the network first, falling back to cache if offline
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        const response = await fetch(event.request)
        cache.put(event.request, response.clone())
        return response
      } catch (err) {
        const response = await cache.match(event.request)
        if (response) return response

        throw err
      }
    })
  )
})
