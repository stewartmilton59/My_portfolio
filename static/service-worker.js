// public/service-worker.js
const CACHE_NAME = 'static/service-worker.js';
const urlsToCache = [
  'https://stewartmilton.online/',
  'https://stewartmilton.online/static/main.js',
  'https://stewartmilton.online/static/main.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
