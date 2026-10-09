// ============================================================
// Service Worker · Pausa Lyon v3.6.2
// ============================================================
// CAMBIOS v3.6.2 (vs v3.3):
//   - Estrategia NETWORK-FIRST para HTML (antes era cache-first).
//     Esto soluciona que los cambios visuales no se veían tras
//     subir el HTML nuevo a GitHub. El navegador ahora siempre
//     intenta descargar el HTML actualizado desde la red.
//   - CACHE-FIRST solo para assets estáticos (iconos, manifest).
//   - Versión de caché subida para invalidar el caché v3.3 anterior.
// ============================================================

const CACHE_NAME = 'pausa-lyon-v3.6.2';

// Assets estáticos que SÍ conviene servir desde caché (no cambian seguido)
const CACHE_STATIC = [
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable-512.png'
];

// Página principal de la app (se sirve como fallback offline)
const PAGINA_APP = '/pausa-lyon.html';

// ============================================================
// INSTALACIÓN
// ============================================================
self.addEventListener('install', function(event) {
  console.log('[SW] Instalando Pausa Lyon v3.6.2');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      // Cacheamos los estáticos (tolerante a fallos: si un icono no existe,
      // el resto se cachea igualmente y no rompemos la instalación).
      return cache.addAll(CACHE_STATIC).catch(function(err) {
        console.warn('[SW] Algunos assets estáticos fallaron al cachear:', err);
      });
    }).then(function() {
      // Forzamos que el SW nuevo tome el control sin esperar a que
      // se cierren todas las pestañas.
      return self.skipWaiting();
    })
  );
});

// ============================================================
// ACTIVACIÓN
// ============================================================
self.addEventListener('activate', function(event) {
  console.log('[SW] Activando Pausa Lyon v3.6.2');
  event.waitUntil(
    caches.keys().then(function(keys) {
      // Borramos TODOS los cachés antiguos (incluido el v3.3).
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) {
              console.log('[SW] Borrando caché antiguo:', k);
              return caches.delete(k);
            })
      );
    }).then(function() {
      // Tomamos el control de todas las pestañas abiertas inmediatamente.
      return self.clients.claim();
    })
  );
});

// ============================================================
// FETCH · Estrategia mixta
// ============================================================
// - HTML y navegaciones → NETWORK-FIRST (siempre lo más nuevo)
// - Assets estáticos     → CACHE-FIRST  (rápido, no cambian)
// - Resto                → NETWORK      (sin caché)
// ============================================================
self.addEventListener('fetch', function(event) {
  const req = event.request;

  // Solo manejamos GET
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Ignoramos dominios externos salvo Google Fonts (que queremos cachear)
  const esFuenteExterna =
    url.hostname.indexOf('fonts.google') !== -1 ||
    url.hostname.indexOf('fonts.gstatic') !== -1;

  if (url.origin !== self.location.origin && !esFuenteExterna) {
    return;
  }

  // --------------------------------------------------------
  // 1) NAVEGACIONES Y HTML → NETWORK-FIRST
  // --------------------------------------------------------
  const esHTML =
    req.mode === 'navigate' ||
    (req.headers.get('accept') && req.headers.get('accept').indexOf('text/html') !== -1) ||
    url.pathname.endsWith('.html') ||
    url.pathname === '/';

  if (esHTML) {
    event.respondWith(
      fetch(req)
        .then(function(response) {
          // Guardamos copia fresca en caché como respaldo offline
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(req, clone).catch(function() {});
            });
          }
          return response;
        })
        .catch(function() {
          // Sin red: intentamos servir la copia cacheada del HTML pedido
          return caches.match(req).then(function(cached) {
            if (cached) return cached;
            // Último recurso: la página principal de la app
            return caches.match(PAGINA_APP);
          });
        })
    );
    return;
  }

  // --------------------------------------------------------
  // 2) ASSETS ESTÁTICOS → CACHE-FIRST
  // --------------------------------------------------------
  const esEstatico =
    CACHE_STATIC.indexOf(url.pathname) !== -1 ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.json') ||
    esFuenteExterna;

  if (esEstatico) {
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
        });
      })
    );
    return;
  }

  // --------------------------------------------------------
  // 3) RESTO → NETWORK normal con fallback a caché
  // --------------------------------------------------------
  event.respondWith(
    fetch(req).catch(function() {
      return caches.match(req);
    })
  );
});

// ============================================================
// MENSAJES DESDE EL CLIENTE
// ============================================================
self.addEventListener('message', function(event) {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data === 'CLEAR_CACHE') {
    // Permite a la app pedir un borrado manual del caché
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) { return caches.delete(k); }));
    }).then(function() {
      console.log('[SW] Caché borrado manualmente por petición del cliente');
    });
  }
});
