// ============================================================
// LYON ASESOR — MODELO DE DATOS: MEMBRESÍAS Y AFILIADOS
// Versión 2.0 · Octubre 2026
// ============================================================
// CAMBIOS v2.0 (respecto a v1.0):
// - Duración única del programa: 4 meses (110 días)
// - Desbloqueo: 1 clase cada 10 días (goteo continuo)
// - Dos planes: "personal" y "empresarial"
// - Plan Personal: 4 pagos mensuales verificados por admin
// - Plan Empresarial: pago único ($499), desbloqueo automático por fecha
// - Magistral de Cierre obligatoria para el diploma final
// ============================================================
//
// ESTRUCTURA EN FIREBASE REALTIME DATABASE:
//
// solicitudes_membresia/{pushId}
//   { nombre, email, telefono, pais, plan, metodoPago,
//     timestamp, fecha, fechaLegible, estado:'pendiente' }
//
// membresias/{codigoAcceso}
//   {
//     nombre, email, telefono, plan:'personal'|'empresarial',
//     fechaInicio (timestamp),
//     estado:'activo'|'pausado'|'finalizado',
//     clasesCompletadas: { "1": timestamp, "2": timestamp, ... },
//     pagosMensuales: {
//       mes1: { pagado: true|false, fecha, fechaLegible, verificadoPor },
//       mes2: { pagado: ... },
//       mes3: { pagado: ... },
//       mes4: { pagado: ... }
//     },
//     diplomasDescargados: { "1": true, ... , programaCompleto: true },
//     asistioCierre: true|false,
//     fechaAsistenciaCierre: timestamp,
//     codigoDiplomaPrograma: "LYONPROG-XXXXXX"
//   }
//
// afiliados/{codigoAfiliado}
//   { nombre, email, telefono, pais, claveAcceso, fechaRegistro, estado }
//
// afiliados_clics/{codigoAfiliado}/{pushId}
//   { timestamp, fecha, pagina }
//
// afiliados_ventas/{codigoAfiliado}/{pushId}
//   { producto, monto, comision, estadoComision, timestamp, fecha }
// ============================================================

// ============================================================
// LISTADO DE LAS 12 CLASES
// ============================================================

const LYON_CLASES = [
    { n: 1,  titulo: "Autoestima Corporativa",     video: "https://youtu.be/UTnaOklJ0wA" },
    { n: 2,  titulo: "Estrategias de Bienestar",   video: "https://youtu.be/OvbdJiddflU" },
    { n: 3,  titulo: "Código Familiar",            video: "https://youtu.be/jiACly9KSvk" },
    { n: 4,  titulo: "Comunicación Consciente",    video: "https://youtu.be/J_ifUCuKahI" },
    { n: 5,  titulo: "Liderazgo con Alma",         video: "https://youtu.be/yzYB6_Qhxnk" },
    { n: 6,  titulo: "NeuroLiderazgo",             video: "https://youtu.be/XUBQ2lDUh0A" },
    { n: 7,  titulo: "Neuroeducación",             video: "https://youtu.be/Ztg9jsA4Fss" },
    { n: 8,  titulo: "Propósito y Legado",         video: "https://youtu.be/g8bEx6RX024" },
    { n: 9,  titulo: "Reconfigura tu Mente",       video: "https://youtu.be/TAQoQi9wHqQ" },
    { n: 10, titulo: "Resiliencia Organizacional", video: "https://youtu.be/z4S64AzYjyU" },
    { n: 11, titulo: "Vínculos que Sanan",         video: "https://youtu.be/nsZV1u1Uq2M" },
    { n: 12, titulo: "Integración y Cierre",       video: "https://youtu.be/BadvmJwMyns" }
];
window.LYON_CLASES = LYON_CLASES;

// ============================================================
// PDFs DE LAS GUÍAS DE EJERCICIOS (uno por clase)
// ============================================================

const LYON_PDFS = {
    1:  "https://drive.google.com/uc?export=download&id=1Ce9HQ_9EL59mx9pRs7BJ4IPmn1_Nj6r3",
    2:  "https://drive.google.com/uc?export=download&id=1KwkhJx7oxxQPa79EX_74kBbr0U6zvopk",
    3:  "https://drive.google.com/uc?export=download&id=1Eh4wQJEJVC8T1W-ZQZ-DMyZJEoc3Z51l",
    4:  "https://drive.google.com/uc?export=download&id=1hN6ROH7UpSVSiVf_nQdDCezLZTxBM6m1",
    5:  "https://drive.google.com/uc?export=download&id=1en2xf5SdfY9dolonpiPuHOKwKOaWuOVp",
    6:  "https://drive.google.com/uc?export=download&id=10ekPp7iuyCvoDrlHLuKNr7XMAu0kBUFT",
    7:  "https://drive.google.com/uc?export=download&id=1Bfx0EAtHBXgkqZWkQMldBdVn8_bb-5Uj",
    8:  "https://drive.google.com/uc?export=download&id=1QNcM9Sg8aPMlG0YOqurlDvz6pp3BH3p2",
    9:  "https://drive.google.com/uc?export=download&id=1_gB28WyuSvQm1V7yDMaflN2FVzU6RO8j",
    10: "https://drive.google.com/uc?export=download&id=1-ztsFZ-MkZ-yJqwk8bk3TRb-KkFU4U6W",
    11: "https://drive.google.com/uc?export=download&id=16cMPgGnC9qWIi5UeGNQitqS1yoeXmOXW",
    12: "https://drive.google.com/uc?export=download&id=1i5mC5TBy5IPIxNE1zmny6BgXR7Vcm-q0"
};
window.LYON_PDFS = LYON_PDFS;

// ============================================================
// MATERIAL DESCARGABLE PARA AFILIADOS (ZIP)
// ============================================================

const LYON_MATERIAL_AFILIADOS_ZIP = "https://drive.google.com/uc?export=download&id=1SVEBlfLZh8kNIIea1nssLFvZe14H92uZ";
window.LYON_MATERIAL_AFILIADOS_ZIP = LYON_MATERIAL_AFILIADOS_ZIP;

// ============================================================
// CONSTANTES DEL PROGRAMA v2.0
// ============================================================

const LYON_DIAS_ENTRE_CLASES = 10;      // Goteo: 1 clase cada 10 días
const LYON_TOTAL_CLASES       = 12;
const LYON_TOTAL_MESES        = 4;
const LYON_HORAS_PROGRAMA     = 300;    // Duración total del programa (diploma final)
const LYON_HORAS_CONFERENCIA  = 8;      // Duración de conferencias sueltas (diploma propio)

window.LYON_DIAS_ENTRE_CLASES = LYON_DIAS_ENTRE_CLASES;
window.LYON_TOTAL_CLASES       = LYON_TOTAL_CLASES;
window.LYON_TOTAL_MESES        = LYON_TOTAL_MESES;
window.LYON_HORAS_PROGRAMA     = LYON_HORAS_PROGRAMA;
window.LYON_HORAS_CONFERENCIA  = LYON_HORAS_CONFERENCIA;

// ============================================================
// HELPERS DE PLAN
// ============================================================

/**
 * Determina si un plan es "empresarial".
 * Acepta variantes: "empresarial", "Empresarial", "EMPRESARIAL", "empresa".
 */
function esPlanEmpresarial(plan) {
    if (!plan || typeof plan !== 'string') return false;
    const p = plan.toLowerCase();
    return p.includes('empresarial') || p.includes('empresa');
}
window.esPlanEmpresarial = esPlanEmpresarial;

/**
 * Determina si un plan es "personal".
 */
function esPlanPersonal(plan) {
    if (!plan || typeof plan !== 'string') return false;
    const p = plan.toLowerCase();
    return p.includes('personal');
}
window.esPlanPersonal = esPlanPersonal;

/**
 * Retorna la etiqueta humana del plan.
 */
function etiquetaPlan(plan) {
    if (esPlanEmpresarial(plan)) return 'Empresarial';
    if (esPlanPersonal(plan)) return 'Personal';
    return plan || '—';
}
window.etiquetaPlan = etiquetaPlan;

/**
 * Retorna el mes (1-4) al que pertenece una clase (1-12).
 *   Clase 1, 2, 3  → mes 1
 *   Clase 4, 5, 6  → mes 2
 *   Clase 7, 8, 9  → mes 3
 *   Clase 10,11,12 → mes 4
 */
function mesDeClase(n) {
    if (n < 1 || n > LYON_TOTAL_CLASES) return 0;
    return Math.ceil(n / 3);
}
window.mesDeClase = mesDeClase;

/**
 * Retorna el nombre del campo del mes: 'mes1', 'mes2', etc.
 */
function campoMes(n) {
    return 'mes' + mesDeClase(n);
}
window.campoMes = campoMes;

// ============================================================
// LÓGICA DE DESBLOQUEO
// ============================================================

/**
 * Calcula el timestamp en que se desbloquea la clase N por fecha.
 *   Clase 1  → día 0
 *   Clase 2  → día 10
 *   Clase 3  → día 20
 *   ...
 *   Clase 12 → día 110
 */
function calcularFechaDesbloqueo(fechaInicio, plan, numeroClase) {
    if (!fechaInicio) return null;
    const offsetDias = (numeroClase - 1) * LYON_DIAS_ENTRE_CLASES;
    return fechaInicio + (offsetDias * 24 * 60 * 60 * 1000);
}
window.calcularFechaDesbloqueo = calcularFechaDesbloqueo;

/**
 * ¿La clase N está desbloqueada para esta membresía?
 *
 * Para plan Empresarial: solo verifica la fecha.
 * Para plan Personal: verifica fecha + pago mensual del mes correspondiente.
 */
function claseDesbloqueada(membresia, n) {
    if (!membresia) return false;
    if (n < 1 || n > LYON_TOTAL_CLASES) return false;

    const fechaInicio = membresia.fechaInicio;
    if (!fechaInicio) return n === 1;

    const fechaDesbloqueo = calcularFechaDesbloqueo(fechaInicio, membresia.plan, n);
    if (Date.now() < fechaDesbloqueo) return false;

    if (esPlanPersonal(membresia.plan)) {
        const pagos = membresia.pagosMensuales || {};
        const campo = campoMes(n);
        const pagoMes = pagos[campo];
        if (!pagoMes || pagoMes.pagado !== true) return false;
    }

    return true;
}
window.claseDesbloqueada = claseDesbloqueada;

/**
 * Razón por la cual una clase está bloqueada (para mostrar mensaje al usuario).
 * Retorna: 'disponible' | 'esperando_fecha' | 'esperando_pago'
 */
function razonBloqueo(membresia, n) {
    if (!membresia) return 'esperando_fecha';
    if (n < 1 || n > LYON_TOTAL_CLASES) return 'esperando_fecha';

    const fechaInicio = membresia.fechaInicio;
    if (!fechaInicio) return 'esperando_fecha';

    const fechaDesbloqueo = calcularFechaDesbloqueo(fechaInicio, membresia.plan, n);
    if (Date.now() < fechaDesbloqueo) return 'esperando_fecha';

    if (esPlanPersonal(membresia.plan)) {
        const pagos = membresia.pagosMensuales || {};
        const campo = campoMes(n);
        const pagoMes = pagos[campo];
        if (!pagoMes || pagoMes.pagado !== true) return 'esperando_pago';
    }

    return 'disponible';
}
window.razonBloqueo = razonBloqueo;

/**
 * ¿El miembro completó las 12 clases?
 */
function completoLasDoceClases(membresia) {
    if (!membresia || !membresia.clasesCompletadas) return false;
    return Object.keys(membresia.clasesCompletadas).length >= LYON_TOTAL_CLASES;
}
window.completoLasDoceClases = completoLasDoceClases;

/**
 * Cuenta cuántas clases ha completado el miembro.
 */
function contarClasesCompletadas(membresia) {
    if (!membresia || !membresia.clasesCompletadas) return 0;
    return Object.keys(membresia.clasesCompletadas).length;
}
window.contarClasesCompletadas = contarClasesCompletadas;

// ============================================================
// GENERADOR DE CÓDIGOS DE ACCESO
// ============================================================

function generarCodigoAcceso(prefijo) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let codigo = '';
    for (let i = 0; i < 6; i++) codigo += chars.charAt(Math.floor(Math.random() * chars.length));
    return `${prefijo}-${codigo}`;
}
window.generarCodigoAcceso = generarCodigoAcceso;

// ============================================================
// FUNCIONES DE ESCRITURA EN FIREBASE
// ============================================================

/** Guarda una solicitud de membresía (pendiente de aprobación manual) */
function guardarSolicitudMembresia(datos) {
    const ref = window.database.ref('solicitudes_membresia').push();
    return ref.set({
        ...datos,
        estado: 'pendiente',
        timestamp: Date.now(),
        fecha: new Date().toISOString(),
        fechaLegible: new Date().toLocaleString('es-ES'),
        refAfiliado: (typeof obtenerAfiliadoActivo === 'function' ? obtenerAfiliadoActivo() : null)
    }).then(() => ref.key);
}
window.guardarSolicitudMembresia = guardarSolicitudMembresia;

/** Guarda una solicitud de afiliación (pendiente de aprobación manual) */
function guardarSolicitudAfiliado(datos) {
    const ref = window.database.ref('solicitudes_afiliado').push();
    return ref.set({
        ...datos,
        estado: 'pendiente',
        timestamp: Date.now(),
        fecha: new Date().toISOString(),
        fechaLegible: new Date().toLocaleString('es-ES')
    }).then(() => ref.key);
}
window.guardarSolicitudAfiliado = guardarSolicitudAfiliado;

/** Busca una membresía por código de acceso */
function buscarMembresia(codigo) {
    return window.database.ref('membresias/' + codigo.trim().toUpperCase()).once('value')
        .then(snap => snap.exists() ? { codigo: codigo.trim().toUpperCase(), ...snap.val() } : null);
}
window.buscarMembresia = buscarMembresia;

/** Busca un afiliado por código */
function buscarAfiliado(codigo) {
    return window.database.ref('afiliados/' + codigo.trim().toUpperCase()).once('value')
        .then(snap => snap.exists() ? { codigo: codigo.trim().toUpperCase(), ...snap.val() } : null);
}
window.buscarAfiliado = buscarAfiliado;

/** Marca una clase como completada para una membresía */
function marcarClaseCompletada(codigo, numeroClase) {
    return window.database.ref(`membresias/${codigo}/clasesCompletadas/${numeroClase}`).set(Date.now());
}
window.marcarClaseCompletada = marcarClaseCompletada;

/** Marca un diploma como descargado (una sola vez) */
function marcarDiplomaDescargado(codigo, claveDiploma) {
    return window.database.ref(`membresias/${codigo}/diplomasDescargados/${claveDiploma}`).set(true);
}
window.marcarDiplomaDescargado = marcarDiplomaDescargado;

/** Marca un mes como pagado (uso exclusivo del admin) */
function marcarMesPagado(codigo, numeroMes, verificadoPor) {
    const campo = 'mes' + numeroMes;
    return window.database.ref(`membresias/${codigo}/pagosMensuales/${campo}`).set({
        pagado: true,
        fecha: Date.now(),
        fechaLegible: new Date().toLocaleString('es-ES'),
        verificadoPor: verificadoPor || 'admin'
    });
}
window.marcarMesPagado = marcarMesPagado;

/** Marca un mes como NO pagado (uso exclusivo del admin, para deshacer) */
function desmarcarMesPagado(codigo, numeroMes) {
    const campo = 'mes' + numeroMes;
    return window.database.ref(`membresias/${codigo}/pagosMensuales/${campo}`).set({
        pagado: false,
        fecha: Date.now(),
        fechaLegible: new Date().toLocaleString('es-ES')
    });
}
window.desmarcarMesPagado = desmarcarMesPagado;

// ============================================================
// FIN DEL ARCHIVO — protocolos-data.js v2.0
// ============================================================
