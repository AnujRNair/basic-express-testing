const cacheKey = 'sw-1';

// first cache the latest HTML file
self.addEventListener('install', (event) => {
  const fetches = ['/index.html'];

  event.waitUntil(
    caches
      .open(cacheKey)
      .then((cache) => {
        return cache
          .addAll(
            fetches.map(
              (urlToPrefetch) => new Request(urlToPrefetch, { mode: 'no-cors' })
            )
          )
          .then(() => self.skipWaiting());
      })
      .catch((error) => {
        console.error('Pre-fetching failed:', error);
        return Promise.reject(error);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('activating service worker', cacheKey);

  // after activating the service worker, also claim any clients which are currently running
  event.waitUntil(self.clients.claim());
});
