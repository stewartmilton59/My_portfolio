const CACHE_NAME = "v1";
const CACHE_ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/main.js",
  "/images/logo.png"
];

// Install event
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Installing");
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching files");
      return cache.addAll(CACHE_ASSETS);
    })
  );
});

// Activate event
self.addEventListener("activate", (e) => {
  console.log("[Service Worker] Activated");
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[Service Worker] Clearing old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  );
});
