// ============================================================
// LYON ASESOR — JS COMPARTIDO (nav, scroll reveal, back to top)
// Requiere elementos con id="nav", "navToggle", "navLinks",
// clase .reveal para animaciones, y opcionalmente #backToTop.
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
    const nav = document.getElementById('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            // Bloquea el scroll del body cuando el menú está abierto
            document.body.classList.toggle('menu-open', navLinks.classList.contains('active'));
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        // Cerrar menú con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 500);
        });
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
});

// ============================================================
// FIX BOTÓN HAMBURGUESA EN MÓVIL
// Inyecta CSS con prioridad !important para garantizar:
//   - Área táctil mínima de 44×44px (Apple/Google)
//   - z-index correcto (por encima del menú desplegado)
//   - position: relative para que el z-index surta efecto
//   - Bloqueo de scroll del body cuando el menú está abierto
// Se aplica globalmente a las 8 páginas.
// ============================================================
(function fixNavToggleMobile() {
    if (document.getElementById('lyon-nav-fix-style')) return;
    const style = document.createElement('style');
    style.id = 'lyon-nav-fix-style';
    style.textContent = `
        /* Fix botón hamburguesa — área táctil 44x44 y z-index correcto */
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
        /* Prevenir scroll del fondo cuando el menú móvil está abierto */
        body.menu-open {
            overflow: hidden !important;
        }
        /* El menú desplegado debe quedar por debajo del botón */
        @media (max-width: 768px) {
            .nav-links.active {
                z-index: 1000 !important;
            }
        }
    `;
    document.head.appendChild(style);
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
 * Se llama desde membresia.html / conferencia.html / ebook.html
 * al completar un formulario de compra.
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
