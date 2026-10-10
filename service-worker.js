// ============================================================
// Service Worker · Pausa Lyon v3.6.3
// ============================================================
// CAMBIOS v3.6.3 (vs v3.3):
//   - AISLADO: este SW SOLO gestiona /pausa-lyon.html y sus
//     assets. Ignora por completo el resto del sitio web
//     (home, blog, otras páginas) para no interferir con ellas.
//   - NETWORK-FIRST para HTML → siempre ves la versión más
//     reciente subida a GitHub.
//   - CACHE-FIRST solo para assets estáticos (iconos, fuentes).
//   - Fallback offline corregido (ya no redirige todo a la app).
// ============================================================

const CACHE_NAME = 'pausa-lyon-v3.6.3';

// Assets estáticos propios de la app
const CACHE_STATIC = [
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// Página principal de la app (fallback offline)
const PAGINA_APP = '/pausa-lyon.html';

// ============================================================
// Utilidad: ¿Esta petición pertenece a Pausa Lyon?
// ============================================================
function esDeLaApp(url) {
  // Página principal
  if (url.pathname === PAGINA_APP) return true;
  if (url.pathname === '/pausa-lyon') return true;

  // Manifest e iconos
  if (CACHE_STATIC.indexOf(url.pathname) !== -1) return true;

  // Otros iconos que empiecen por /icon-
  if (url.pathname.startsWith('/icon-')) return true;

  // Fuentes de Google (las cacheamos porque son estáticas y universales)
  if (url.hostname.indexOf('fonts.google') !== -1) return true;
  if (url.hostname.indexOf('fonts.gstatic') !== -1) return true;

  return false;
}

// ============================================================
// INSTALACIÓN
// ============================================================
self.addEventListener('install', function(event) {
  console.log('[SW] Instalando Pausa Lyon v3.6.3');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHE_STATIC).catch(function(err) {
        console.warn('[SW] Algunos assets estáticos fallaron al cachear:', err);
      });
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// ============================================================
// ACTIVACIÓN
// ============================================================
self.addEventListener('activate', function(event) {
  console.log('[SW] Activando Pausa Lyon v3.6.3');
  event.waitUntil(
    caches.keys().then(function(keys) {
      // Borramos TODOS los cachés antiguos (incluidos v3.3, v3.6.1, etc.)
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) {
              console.log('[SW] Borrando caché antiguo:', k);
              return caches.delete(k);
            })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// ============================================================
// FETCH · Estrategia mixta y aislada a Pausa Lyon
// ============================================================
self.addEventListener('fetch', function(event) {
  const req = event.request;

  // Solo manejamos GET
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // ⭐ FILTRO CLAVE: si no es de la app, dejamos pasar la petición
  // sin interceptarla. Así el resto del sitio web NO se ve afectado.
  if (!esDeLaApp(url)) {
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
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(req, clone).catch(function() {});
            });
          }
          return response;
        })
        .catch(function() {
          return caches.match(req).then(function(cached) {
            if (cached) return cached;
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
    url.hostname.indexOf('fonts.google') !== -1 ||
    url.hostname.indexOf('fonts.gstatic') !== -1;

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
  // 3) RESTO → NETWORK con fallback a caché
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
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) { return caches.delete(k); }));
    }).then(function() {
      console.log('[SW] Caché borrado manualmente por petición del cliente');
    });
  }
});
