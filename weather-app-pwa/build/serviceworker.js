// CACHE IS LIKE A STORAGE OF A BROWSER

const CACHE_NAME = 'version-1';
// this is the document we are creating when we are done with the serviceworker   and it will display information when the server is offline or no internet connection
const urlsToCache = ['index.html', 'offline.html'];

// now we need to write events for three things

// one:-> Install service worker

const self = this;

// we need to open the cache and add file to the cache

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('cache dey open ooo');

      return cache.addAll(urlsToCache);
    })
  );
});

// two:-> Listen for requests

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(() => {
      return fetch(e.request).catch(() => caches.match('offline.html'));
    })
  );
});

// three:-> Activating the service worker

self.addEventListener('activate', (e) => {
  const cachewhitelist = [];
  cachewhitelist.push(CACHE_NAME);

  e.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          // if the cachewhitlist doesn't include the cachename then we want to delete the specified cachename but if does include it in the cachewhitelist then we wanna keep it
          if (!cachewhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
