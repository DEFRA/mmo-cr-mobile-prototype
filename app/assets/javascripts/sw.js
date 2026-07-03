const CACHE_NAME = 'mmo-cr-cache-v1'

// Static assets worth caching (GOV.UK Frontend CSS/JS and images)
const STATIC_ORIGINS = ['/public/', '/plugin-assets/']

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  // Remove any caches from previous versions
  event.waitUntil(
    caches
      .keys()
      .then(names =>
        Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
      )
  )
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return

  const url = new URL(event.request.url)

  // HTML navigation: network-first so session state is always fresh
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(event.request).then(cached => cached || caches.match('/'))
      )
    )
    return
  }

  // Static assets: cache-first
  if (STATIC_ORIGINS.some(prefix => url.pathname.startsWith(prefix))) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached
        return fetch(event.request).then(response => {
          if (response && response.ok) {
            const copy = response.clone()
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy))
          }
          return response
        })
      })
    )
  }
})
