// ============================================================
// LYON ASESOR — MODELO DE DATOS: MEMBRESÍAS Y AFILIADOS
// ============================================================
// Flujo elegido: SIN Firebase Cloud Functions ni envío automático
// de correo. Toda cuenta (miembro o afiliado) se activa a mano
// desde /admin, igual que el flujo actual de Pago Móvil.
//
// Nodos en Realtime Database:
//
// solicitudes_membresia/{pushId}
//   { nombre, email, telefono, pais, plan, metodoPago, timestamp, fecha, estado:'pendiente' }
//
// solicitudes_afiliado/{pushId}
//   { nombre, email, telefono, pais, experiencia, timestamp, fecha, estado:'pendiente' }
//
// membresias/{codigoAcceso}
//   { nombre, email, telefono, plan:'acelerado'|'extendido',
//     fechaInicio (timestamp), estado:'activo'|'pausado'|'finalizado',
//     clasesCompletadas: { "1": timestamp, "2": timestamp, ... },
//     diplomasDescargados: { "1": true, ... , programaCompleto: true } }
//   -> El "codigoAcceso" (ej. LYON-8F3K2Q) es la clave de login del
//      miembro. El admin lo genera manualmente al activar el pago
//      y se lo entrega al estudiante por correo/WhatsApp.
//
// afiliados/{codigoAfiliado}
//   { nombre, email, telefono, pais, claveAcceso, fechaRegistro (timestamp),
//     estado:'activo'|'inactivo' }
//   -> El "codigoAfiliado" (ej. AF-LUCIA23) es también el ?ref= que
//      se usa en el enlace de referencia: lyonasesor.com/?ref=AF-LUCIA23
//
// afiliados_clics/{codigoAfiliado}/{pushId}   { timestamp, fecha, pagina }
// afiliados_ventas/{codigoAfiliado}/{pushId}  { producto, monto, comision, estadoComision, timestamp, fecha }
// ============================================================

const LYON_CLASES = [
    { n: 1, titulo: "Autoestima Corporativa", video: "https://youtu.be/UTnaOklJ0wA" },
    { n: 2, titulo: "Estrategias de Bienestar", video: "https://youtu.be/OvbdJiddflU" },
    { n: 3, titulo: "Código Familiar", video: "https://youtu.be/jiACly9KSvk" },
    { n: 4, titulo: "Comunicación Consciente", video: "https://youtu.be/J_ifUCuKahI" },
    { n: 5, titulo: "Liderazgo con Alma", video: "https://youtu.be/yzYB6_Qhxnk" },
    { n: 6, titulo: "NeuroLiderazgo", video: "https://youtu.be/XUBQ2lDUh0A" },
    { n: 7, titulo: "Neuroeducación", video: "https://youtu.be/Ztg9jsA4Fss" },
    { n: 8, titulo: "Propósito y Legado", video: "https://youtu.be/g8bEx6RX024" },
    { n: 9, titulo: "Reconfigura tu Mente", video: "https://youtu.be/TAQoQi9wHqQ" },
    { n: 10, titulo: "Resiliencia Organizacional", video: "https://youtu.be/z4S64AzYjyU" },
    { n: 11, titulo: "Vínculos que Sanan", video: "https://youtu.be/nsZV1u1Uq2M" },
    { n: 12, titulo: "Integración y Cierre", video: "https://youtu.be/BadvmJwMyns" }
];
window.LYON_CLASES = LYON_CLASES;

const LYON_PDFS = {
    1: "https://drive.google.com/uc?export=download&id=1Ce9HQ_9EL59mx9pRs7BJ4IPmn1_Nj6r3",
    2: "https://drive.google.com/uc?export=download&id=1KwkhJx7oxxQPa79EX_74kBbr0U6zvopk",
    3: "https://drive.google.com/uc?export=download&id=1Eh4wQJEJVC8T1W-ZQZ-DMyZJEoc3Z51l",
    4: "https://drive.google.com/uc?export=download&id=1hN6ROH7UpSVSiVf_nQdDCezLZTxBM6m1",
    5: "https://drive.google.com/uc?export=download&id=1en2xf5SdfY9dolonpiPuHOKwKOaWuOVp",
    6: "https://drive.google.com/uc?export=download&id=10ekPp7iuyCvoDrlHLuKNr7XMAu0kBUFT",
    7: "https://drive.google.com/uc?export=download&id=1Bfx0EAtHBXgkqZWkQMldBdVn8_bb-5Uj",
    8: "https://drive.google.com/uc?export=download&id=1QNcM9Sg8aPMlG0YOqurlDvz6pp3BH3p2",
    9: "https://drive.google.com/uc?export=download&id=1_gB28WyuSvQm1V7yDMaflN2FVzU6RO8j",
    10: "https://drive.google.com/uc?export=download&id=1-ztsFZ-MkZ-yJqwk8bk3TRb-KkFU4U6W",
    11: "https://drive.google.com/uc?export=download&id=16cMPgGnC9qWIi5UeGNQitqS1yoeXmOXW",
    12: "https://drive.google.com/uc?export=download&id=1i5mC5TBy5IPIxNE1zmny6BgXR7Vcm-q0"
};
window.LYON_PDFS = LYON_PDFS;

const LYON_MATERIAL_AFILIADOS_ZIP = "https://drive.google.com/uc?export=download&id=1SVEBlfLZh8kNIIea1nssLFvZe14H92uZ";
window.LYON_MATERIAL_AFILIADOS_ZIP = LYON_MATERIAL_AFILIADOS_ZIP;

// Días entre clases según plan
const LYON_DIAS_POR_CLASE = { acelerado: 14, extendido: 30 };

/**
 * Calcula la fecha (timestamp) en que se desbloquea la clase N
 * @param {number} fechaInicio - timestamp de inicio de la membresía
 * @param {string} plan - 'acelerado' | 'extendido'
 * @param {number} numeroClase - 1 a 12
 */
function calcularFechaDesbloqueo(fechaInicio, plan, numeroClase) {
    const dias = LYON_DIAS_POR_CLASE[plan] || 30;
    const offsetDias = dias * (numeroClase - 1);
    return fechaInicio + (offsetDias * 24 * 60 * 60 * 1000);
}
window.calcularFechaDesbloqueo = calcularFechaDesbloqueo;

/**
 * Genera un código de acceso aleatorio legible (ej. LYON-8F3K2Q)
 */
function generarCodigoAcceso(prefijo) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let codigo = '';
    for (let i = 0; i < 6; i++) codigo += chars.charAt(Math.floor(Math.random() * chars.length));
    return `${prefijo}-${codigo}`;
}
window.generarCodigoAcceso = generarCodigoAcceso;

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
