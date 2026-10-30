const CACHE_NAME = 'broonic-club-v3';
const APP_SHELL = ['/', '/app/', '/menu/', '/bebidas/', '/perfil/', '/carrito/', '/manifest.webmanifest', '/broonic-wordmark.png', '/broonic-round.png', '/broonic-dog.png', '/visit-qr.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then((response) => {
    if (response.ok) {
      const responseCopy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseCopy));
    }
    return response;
  }).catch(async () => (await caches.match(event.request)) || (event.request.mode === 'navigate' ? caches.match('/app/') : Response.error())));
});
