// ============================================================
// Service Worker · Pausa Lyon
// Permite que la app funcione sin conexión tras la primera visita
// ============================================================

const CACHE_NAME = 'pausa-lyon-v3.1';
const CACHE_ASSETS = [
  '/pausa-lyon.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700;800&display=swap'
];

// Instalar: cachear los assets base
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Pausa Lyon v3.1');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_ASSETS.map(url => new Request(url, { mode: 'no-cors' })));
    }).then(() => self.skipWaiting())
  );
});

// Activar: limpiar cachés antiguas
self.addEventListener('activate', (event) => {
  console.log('[SW] Activando Pausa Lyon v3.1');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: cache-first con fallback a red
self.addEventListener('fetch', (event) => {
  // No interceptar requests que no sean GET
  if (event.request.method !== 'GET') return;

  // No interceptar llamadas a otros dominios excepto fuentes
  const url = new URL(event.request.url);
  if (url.origin !== location.origin && !url.hostname.includes('fonts.google')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        // No cachear si no es válida
        if (!response || response.status !== 200) return response;

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          try { cache.put(event.request, responseClone); } catch (e) {}
        });

        return response;
      }).catch(() => {
        // Fallback: si es una navegación, devuelve la app
        if (event.request.mode === 'navigate') {
          return caches.match('/pausa-lyon.html');
        }
      });
    })
  );
});

// Mensaje desde la app (opcional para forzar actualización)
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
