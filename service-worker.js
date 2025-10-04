const CACHE_NAME = "v1";
const CACHE_ASSETS = [
  "/",
  "/index.html",
  "/main.css", 
  "/main.js",
  "/images/logo.png"
];

// Cache strategy: Cache First with Network Fallback for static assets
self.addEventListener("fetch", (e) => {
  // For static assets, try cache first
  if (e.request.url.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/)) {
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        // Return cached version if exists
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Otherwise fetch from network and cache
        return fetch(e.request).then((networkResponse) => {
          // Don't cache if not successful
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          
          // Clone and cache the response
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
          
          return networkResponse;
        });
      })
    );
  } 
  // For HTML documents, try network first
  else if (e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request).then((networkResponse) => {
        // Update cache with fresh HTML
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Fallback to cache if network fails
        return caches.match(e.request);
      })
    );
  }
});
