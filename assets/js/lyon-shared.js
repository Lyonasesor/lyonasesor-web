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
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
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
