// ============================================================
// LYON ASESOR — JS COMPARTIDO (v2)
// 
// Este archivo SOLO hace dos cosas:
//   1. Inyecta CSS con el fix del botón hamburguesa en móvil
//   2. Tracking de afiliados (?ref=CODIGO)
//
// NO maneja el clic del botón hamburguesa — cada HTML ya tiene
// su propio listener inline. Duplicarlo causaba que el toggle
// se ejecutara DOS VECES y el menú nunca se abría.
// ============================================================

// ============================================================
// FIX BOTÓN HAMBURGUESA EN MÓVIL (solo CSS)
// Área táctil 44×44px + z-index correcto + bloqueo de scroll
// ============================================================
(function fixNavToggleMobile() {
    if (document.getElementById('lyon-nav-fix-style')) return;
    const style = document.createElement('style');
    style.id = 'lyon-nav-fix-style';
    style.textContent = `
        .nav-toggle {
            position: relative !important;
            z-index: 2000 !important;
            padding: 12px !important;
            min-width: 44px !important;
            min-height: 44px !important;
            align-items: center !important;
            justify-content: center !important;
            -webkit-tap-highlight-color: transparent !important;
            user-select: none !important;
            touch-action: manipulation;
        }
        .nav-toggle span {
            width: 24px !important;
            pointer-events: none !important;
        }
        body.menu-open {
            overflow: hidden !important;
        }
        @media (max-width: 768px) {
            .nav-links.active {
                z-index: 1000 !important;
            }
        }
    `;
    document.head.appendChild(style);
})();

// ============================================================
// BLOQUEO DE SCROLL CUANDO EL MENÚ ESTÁ ABIERTO
// Detecta cambios en la clase 'active' de #navLinks mediante
// MutationObserver y aplica/quita 'menu-open' al <body>.
// ============================================================
(function watchMenuOpenState() {
    function attach() {
        const links = document.getElementById('navLinks');
        if (!links) return false;
        const observer = new MutationObserver(() => {
            const isOpen = links.classList.contains('active');
            document.body.classList.toggle('menu-open', isOpen);
        });
        observer.observe(links, { attributes: true, attributeFilter: ['class'] });
        return true;
    }
    if (!attach()) {
        document.addEventListener('DOMContentLoaded', attach);
    }
})();

// ============================================================
// TRACKING DE AFILIADOS (?ref=CODIGO)
// Guarda el código de afiliado en localStorage por 45 días
// al llegar cualquier página del sitio con ese parámetro,
// y registra el clic en Firebase (afiliados_clics/{codigo}).
// ============================================================
(function trackAffiliateRef() {
    try {
        const params = new URLSearchParams(window.location.search);
        const ref = params.get('ref');
        if (!ref) return;

        // Validación mínima del formato del código (ej. AF-XXXXXX)
        if (!/^[A-Z]{2,4}-[A-Z0-9]{4,10}$/i.test(ref)) {
            console.warn('Formato de código de afiliado inválido:', ref);
            return;
        }

        // Guardar en localStorage con expiración de 45 días
        const registro = {
            codigo: ref,
            expira: Date.now() + (45 * 24 * 60 * 60 * 1000),
            capturado: new Date().toISOString()
        };
        localStorage.setItem('lyon_ref', JSON.stringify(registro));

        // Registrar el clic en Firebase (si está disponible)
        if (window.database) {
            window.database.ref('afiliados_clics/' + ref).push({
                timestamp: Date.now(),
                fecha: new Date().toISOString(),
                fechaLegible: new Date().toLocaleString('es-ES'),
                pagina: window.location.pathname,
                referrer: document.referrer || 'directo',
                userAgent: navigator.userAgent.substring(0, 120)
            }).catch(err => {
                console.warn('No se pudo registrar el clic del afiliado:', err);
            });
        }
    } catch (e) {
        console.warn('No se pudo procesar el parámetro de afiliado:', e);
    }
})();

/**
 * Devuelve el código de afiliado activo (si existe y no ha expirado).
 * @returns {string|null}
 */
function obtenerAfiliadoActivo() {
    try {
        const raw = localStorage.getItem('lyon_ref');
        if (!raw) return null;
        const data = JSON.parse(raw);
        if (Date.now() > data.expira) {
            localStorage.removeItem('lyon_ref');
            return null;
        }
        return data.codigo;
    } catch (e) {
        return null;
    }
}
window.obtenerAfiliadoActivo = obtenerAfiliadoActivo;

/**
 * Registra una venta atribuible a un afiliado (si hay uno activo).
 * @param {string} producto - Nombre del producto
 * @param {number} monto - Monto total de la venta en USD
 * @param {number} comisionPorcentaje - Porcentaje de comisión (ej. 30)
 */
function registrarVentaAfiliado(producto, monto, comisionPorcentaje) {
    const codigo = obtenerAfiliadoActivo();
    if (!codigo || !window.database) {
        console.warn('No se registró la venta del afiliado: sin código activo o sin Firebase.');
        return;
    }
    const comision = +(monto * (comisionPorcentaje / 100)).toFixed(2);
    window.database.ref('afiliados_ventas/' + codigo).push({
        producto: producto,
        monto: monto,
        comision: comision,
        estadoComision: 'pendiente',
        timestamp: Date.now(),
        fecha: new Date().toISOString(),
        fechaLegible: new Date().toLocaleString('es-ES')
    }).then(() => {
        console.log(`✅ Venta de afiliado ${codigo} registrada: $${monto} → comisión $${comision}`);
    }).catch(err => {
        console.error('❌ Error al registrar la venta del afiliado:', err);
    });
}
window.registrarVentaAfiliado = registrarVentaAfiliado;

/**
 * Marca al afiliado activo como "usado" para que no se atribuya dos veces
 * la misma conversión (se ejecuta tras una compra exitosa).
 */
function limpiarAfiliadoActivo() {
    try {
        localStorage.removeItem('lyon_ref');
    } catch (e) {}
}
window.limpiarAfiliadoActivo = limpiarAfiliadoActivo;

console.log('✅ lyon-shared.js v2 cargado (sin listener duplicado del nav)');
