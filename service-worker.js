// ============================================================
// Service Worker · Pausa Lyon v3.2
// ============================================================

const CACHE_NAME = 'pausa-lyon-v3.2';
const CACHE_LOCAL = [
  '/pausa-lyon.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable-512.png'
];

// --- INSTALACIÓN ---
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Pausa Lyon v3.2');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Solo cacheamos recursos locales. Las fuentes se cachean en runtime.
      return cache.addAll(CACHE_LOCAL).catch((err) => {
        console.warn('[SW] Algunos assets fallaron al cachear:', err);
        // Continuar aunque uno falle, para no romper la instalación
      });
    }).then(() => self.skipWaiting())
  );
});

// --- ACTIVACIÓN ---
self.addEventListener('activate', (event) => {
  console.log('[SW] Activando Pausa Lyon v3.2');
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// --- FETCH ---
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Solo interceptar GET
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Ignorar peticiones a otros orígenes (excepto Google Fonts)
  if (url.origin !== self.location.origin && !url.hostname.includes('fonts.google') && !url.hostname.includes('fonts.gstatic')) {
    return;
  }

  // Estrategia: cache-first, fallback a red
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(req).then((response) => {
        // Si la respuesta no es válida, devolverla tal cual
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }

        // Clonar y guardar en cache
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(req, clone).catch(() => {});
        });

        return response;
      }).catch(() => {
        // Si falla la red y es una navegación, devolver la app
        if (req.mode === 'navigate') {
          return caches.match('/pausa-lyon.html');
        }
        return new Response('Sin conexión', {
          status: 503,
          statusText: 'Sin conexión'
        });
      });
    })
  );
});

// --- MENSAJE ---
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
