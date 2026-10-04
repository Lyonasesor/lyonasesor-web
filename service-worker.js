// ============================================================
// Service Worker · Pausa Lyon v3.3
// ============================================================

const CACHE_NAME = 'pausa-lyon-v3.3';
const CACHE_LOCAL = [
  '/pausa-lyon.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable-512.png'
];

// --- INSTALACIÓN ---
self.addEventListener('install', function(event) {
  console.log('[SW] Instalando Pausa Lyon v3.3');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHE_LOCAL).catch(function(err) {
        console.warn('[SW] Algunos assets fallaron al cachear:', err);
      });
    }).then(function() { return self.skipWaiting(); })
  );
});

// --- ACTIVACIÓN ---
self.addEventListener('activate', function(event) {
  console.log('[SW] Activando Pausa Lyon v3.3');
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; }).map(function(k) { return caches.delete(k); })
      );
    }).then(function() { return self.clients.claim(); })
  );
});

// --- FETCH ---
self.addEventListener('fetch', function(event) {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin && url.hostname.indexOf('fonts.google') === -1 && url.hostname.indexOf('fonts.gstatic') === -1) {
    return;
  }

  event.respondWith(
    caches.match(req).then(function(cached) {
      if (cached) return cached;

      return fetch(req).then(function(response) {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(req, clone).catch(function() {});
        });
        return response;
      }).catch(function() {
        if (req.mode === 'navigate') {
          return caches.match('/pausa-lyon.html');
        }
        return new Response('Sin conexión', { status: 503, statusText: 'Sin conexión' });
      });
    })
  );
});

self.addEventListener('message', function(event) {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
