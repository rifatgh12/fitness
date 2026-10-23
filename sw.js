/* OtotKu - Service Worker for Offline & PWA Support */
const CACHE_NAME = 'ototku-cache-v3';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './supabase-config.js',
  './supabase.min.js',
  './qrcode.min.js',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './favicon.png'
];

// Install: Cache core assets immediately
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CORE_ASSETS).catch(err => {
        console.warn('Gagal caching beberapa aset saat install:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up previous version caches immediately
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch handler
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // Lewati request non-GET atau request ke Cloud API (Supabase & Firebase) agar data selalu realtime
  if (
    req.method !== 'GET' ||
    !url.protocol.startsWith('http') ||
    url.hostname.includes('supabase.co') ||
    url.hostname.includes('firebaseio.com')
  ) {
    return;
  }

  // 1. Khusus Dokumen HTML / Navigasi: NETWORK-FIRST agar HP selalu memuat kode terbaru dari laptop
  if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const resClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
        }
        return networkResponse;
      }).catch(() => {
        return caches.match('./index.html') || caches.match('./');
      })
    );
    return;
  }

  // 2. Aset Statis (JS, CSS, Gambar, Ikon): Cache-First dengan background update
  event.respondWith(
    caches.match(req).then(cachedResponse => {
      const fetchPromise = fetch(req).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(req, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => null);

      return cachedResponse || fetchPromise;
    })
  );
});
