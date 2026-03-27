const CACHE_NAME = 'iamgoing-cache-v1';

const PRECACHE_URLS = [
  '/iamgoingtobeout/',
  '/iamgoingtobeout/index.html',
  '/iamgoingtobeout/css/styles.css',
  '/iamgoingtobeout/js/app.js',
  '/iamgoingtobeout/assets/images/avatar.jpg',
  '/iamgoingtobeout/assets/images/sebts-logo.png',
  '/iamgoingtobeout/assets/icons/icon-192.png',
  '/iamgoingtobeout/assets/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const cloned = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
        return response;
      });
    })
  );
});
