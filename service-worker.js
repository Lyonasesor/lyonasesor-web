// ============================================================
// Service Worker · Pausa Lyon v3.3
// Estrategia: network-first para HTML, cache-first para assets
// ============================================================

const CACHE_NAME = 'pausa-lyon-v3.3';
const CACHE_LOCAL = [
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable-512.png'
];

// --- INSTALACIÓN ---
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Pausa Lyon v3.3');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_LOCAL).catch((err) => {
        console.warn('[SW] Algunos assets fallaron al cachear:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// --- ACTIVACIÓN ---
self.addEventListener('activate', (event) => {
  console.log('[SW] Activando Pausa Lyon v3.3');
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
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Ignorar otros orígenes excepto Google Fonts
  if (url.origin !== self.location.origin && 
      !url.hostname.includes('fonts.google') && 
      !url.hostname.includes('fonts.gstatic')) {
    return;
  }

  // ESTRATEGIA NETWORK-FIRST para el HTML y manifest
  // Así siempre servimos la versión más reciente si hay red
  const esHTML = req.mode === 'navigate' || 
                 url.pathname.endsWith('.html') || 
                 url.pathname === '/' ||
                 url.pathname.endsWith('manifest.json');

  if (esHTML) {
    event.respondWith(
      fetch(req).then((response) => {
        if (response && response.status === 200 && response.type !== 'opaque') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, clone).catch(() => {});
          });
        }
        return response;
      }).catch(() => {
        // Si no hay red, servir del cache
        return caches.match(req).then((cached) => {
          if (cached) return cached;
          return caches.match('/pausa-lyon.html');
        });
      })
    );
    return;
  }

  // ESTRATEGIA CACHE-FIRST para imágenes, fuentes, etc.
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((response) => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(req, clone).catch(() => {});
        });
        return response;
      }).catch(() => {
        if (req.mode === 'navigate') {
          return caches.match('/pausa-lyon.html');
        }
        return new Response('Sin conexión', { status: 503 });
      });
    })
  );
});

// --- MENSAJE ---
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
