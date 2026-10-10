// ============================================================
// LYON ASESOR — protocolos-data.js  (v3.0 · Octubre 2026)
// ============================================================
// ⚠️ MARCADOR DE VERSIÓN:
//    Si ves "v3.0" en estas primeras líneas al abrir este
//    archivo en el navegador, la versión nueva ESTÁ SUBIDA.
//    Si ves "v2.0", el archivo viejo sigue en GitHub.
// ============================================================
// Este archivo contiene DOS bloques:
//   BLOQUE A · Modelo de membresías y afiliados (v2.0)
//   BLOQUE B · PROTOCOLOS_DATA.protocolos (v3.0 · 13 protocolos)
// ============================================================


// ============================================================
// BLOQUE A · MODELO DE MEMBRESÍAS Y AFILIADOS
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

const LYON_MATERIAL_AFILIADOS_ZIP = "https://drive.google.com/uc?export=download&id=1SVEBlfLZh8kNIIea1nssLFvZe14H92uZ";
window.LYON_MATERIAL_AFILIADOS_ZIP = LYON_MATERIAL_AFILIADOS_ZIP;

const LYON_DIAS_ENTRE_CLASES = 10;
const LYON_TOTAL_CLASES       = 12;
const LYON_TOTAL_MESES        = 4;
const LYON_HORAS_PROGRAMA     = 300;
const LYON_HORAS_CONFERENCIA  = 8;

window.LYON_DIAS_ENTRE_CLASES = LYON_DIAS_ENTRE_CLASES;
window.LYON_TOTAL_CLASES       = LYON_TOTAL_CLASES;
window.LYON_TOTAL_MESES        = LYON_TOTAL_MESES;
window.LYON_HORAS_PROGRAMA     = LYON_HORAS_PROGRAMA;
window.LYON_HORAS_CONFERENCIA  = LYON_HORAS_CONFERENCIA;

function esPlanEmpresarial(plan) {
    if (!plan || typeof plan !== 'string') return false;
    const p = plan.toLowerCase();
    return p.includes('empresarial') || p.includes('empresa');
}
window.esPlanEmpresarial = esPlanEmpresarial;

function esPlanPersonal(plan) {
    if (!plan || typeof plan !== 'string') return false;
    const p = plan.toLowerCase();
    return p.includes('personal');
}
window.esPlanPersonal = esPlanPersonal;

function etiquetaPlan(plan) {
    if (esPlanEmpresarial(plan)) return 'Empresarial';
    if (esPlanPersonal(plan)) return 'Personal';
    return plan || '—';
}
window.etiquetaPlan = etiquetaPlan;

function mesDeClase(n) {
    if (n < 1 || n > LYON_TOTAL_CLASES) return 0;
    return Math.ceil(n / 3);
}
window.mesDeClase = mesDeClase;

function campoMes(n) { return 'mes' + mesDeClase(n); }
window.campoMes = campoMes;

function calcularFechaDesbloqueo(fechaInicio, plan, numeroClase) {
    if (!fechaInicio) return null;
    const offsetDias = (numeroClase - 1) * LYON_DIAS_ENTRE_CLASES;
    return fechaInicio + (offsetDias * 24 * 60 * 60 * 1000);
}
window.calcularFechaDesbloqueo = calcularFechaDesbloqueo;

function claseDesbloqueada(membresia, n) {
    if (!membresia) return false;
    if (n < 1 || n > LYON_TOTAL_CLASES) return false;
    const fechaInicio = membresia.fechaInicio;
    if (!fechaInicio) return n === 1;
    const fechaDesbloqueo = calcularFechaDesbloqueo(fechaInicio, membresia.plan, n);
    if (Date.now() < fechaDesbloqueo) return false;
    if (esPlanPersonal(membresia.plan)) {
        const pagos = membresia.pagosMensuales || {};
        const pagoMes = pagos[campoMes(n)];
        if (!pagoMes || pagoMes.pagado !== true) return false;
    }
    return true;
}
window.claseDesbloqueada = claseDesbloqueada;

function razonBloqueo(membresia, n) {
    if (!membresia) return 'esperando_fecha';
    if (n < 1 || n > LYON_TOTAL_CLASES) return 'esperando_fecha';
    const fechaInicio = membresia.fechaInicio;
    if (!fechaInicio) return 'esperando_fecha';
    const fechaDesbloqueo = calcularFechaDesbloqueo(fechaInicio, membresia.plan, n);
    if (Date.now() < fechaDesbloqueo) return 'esperando_fecha';
    if (esPlanPersonal(membresia.plan)) {
        const pagos = membresia.pagosMensuales || {};
        const pagoMes = pagos[campoMes(n)];
        if (!pagoMes || pagoMes.pagado !== true) return 'esperando_pago';
    }
    return 'disponible';
}
window.razonBloqueo = razonBloqueo;

function completoLasDoceClases(membresia) {
    if (!membresia || !membresia.clasesCompletadas) return false;
    return Object.keys(membresia.clasesCompletadas).length >= LYON_TOTAL_CLASES;
}
window.completoLasDoceClases = completoLasDoceClases;

function contarClasesCompletadas(membresia) {
    if (!membresia || !membresia.clasesCompletadas) return 0;
    return Object.keys(membresia.clasesCompletadas).length;
}
window.contarClasesCompletadas = contarClasesCompletadas;

function generarCodigoAcceso(prefijo) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let codigo = '';
    for (let i = 0; i < 6; i++) codigo += chars.charAt(Math.floor(Math.random() * chars.length));
    return `${prefijo}-${codigo}`;
}
window.generarCodigoAcceso = generarCodigoAcceso;

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

function buscarMembresia(codigo) {
    return window.database.ref('membresias/' + codigo.trim().toUpperCase()).once('value')
        .then(snap => snap.exists() ? { codigo: codigo.trim().toUpperCase(), ...snap.val() } : null);
}
window.buscarMembresia = buscarMembresia;

function buscarAfiliado(codigo) {
    return window.database.ref('afiliados/' + codigo.trim().toUpperCase()).once('value')
        .then(snap => snap.exists() ? { codigo: codigo.trim().toUpperCase(), ...snap.val() } : null);
}
window.buscarAfiliado = buscarAfiliado;

function marcarClaseCompletada(codigo, numeroClase) {
    return window.database.ref(`membresias/${codigo}/clasesCompletadas/${numeroClase}`).set(Date.now());
}
window.marcarClaseCompletada = marcarClaseCompletada;

function marcarDiplomaDescargado(codigo, claveDiploma) {
    return window.database.ref(`membresias/${codigo}/diplomasDescargados/${claveDiploma}`).set(true);
}
window.marcarDiplomaDescargado = marcarDiplomaDescargado;

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
// BLOQUE B · PROTOCOLOS_DATA  (13 protocolos LA-00 a LA-12)
// ============================================================

const PROTOCOLOS_DATA = {
  protocolos: [

    {
      id: 'LA-00',
      code: 'LA-00',
      title: 'Tu Mapa Inicial',
      subtitle: 'Rueda de la Vida y Filtro de Profundidad',
      themeColor: '#e86b18',
      introduction: [
        'Bienvenido/a a tu primer protocolo. Este no es un test clínico: es una conversación honesta contigo mismo.',
        'Antes de avanzar, necesitamos trazar tu punto de partida. Como en cualquier viaje, primero ubicamos dónde estás y luego definimos hacia dónde caminar.',
        'Responde sin filtros. No hay respuestas correctas ni incorrectas. Solo existe tu verdad.'
      ],
      signature: '— Prof. Mtr. Álvaro Lyon',
      consent: {
        required: true,
        text: 'Entiendo que este proceso es de desarrollo personal y no sustituye atención médica ni psicológica profesional. Acepto participar voluntariamente y con honestidad.'
      },
      questions: [
        {
          id: 'rueda_de_la_vida',
          type: 'grid_multiple_choice',
          order: 1,
          required: true,
          text: 'Rueda de la Vida',
          helperText: 'Puntúa del 1 al 5 qué tan satisfecho/a estás hoy en cada área.\n1 = Muy insatisfecho · 5 = Muy satisfecho',
          matrix: {
            columns: ['1', '2', '3', '4', '5'],
            rows: ['Autoestima', 'Pareja', 'Familia', 'Amistades', 'Manejo emocional', 'Propósito', 'Historia personal']
          }
        },
        {
          id: 'filtro_de_profundidad',
          type: 'grid_multiple_choice',
          order: 2,
          required: true,
          text: 'Filtro de Profundidad',
          helperText: 'Marca SÍ o NO en cada afirmación. Esto nos ayuda a ubicar las capas activas de tu proceso.',
          matrix: {
            columns: ['SÍ', 'NO'],
            rows: [
              'Tengo pensamientos que se repiten y no puedo detener',
              'Tengo creencias que me limitan y siento que no puedo cambiar',
              'Hay recuerdos del pasado que todavía me duelen',
              'Mis relaciones me generan más conflicto que paz',
              'Repito patrones que no quiero repetir',
              'Me cuesta regular mis emociones',
              'Me cuesta encontrar calma en mi día a día',
              'Siento que dependo emocionalmente de alguien'
            ]
          }
        },
        {
          id: 'intencion_inicial',
          type: 'long_text',
          order: 3,
          required: true,
          text: '¿Qué te trae aquí?',
          helperText: 'Cuéntame, con tus palabras, qué te llevó a iniciar este proceso.'
        }
      ]
    },

    {
      id: 'LA-01',
      code: 'LA-01',
      title: 'El Observador Silencioso',
      subtitle: 'Siete días atendiendo tus pensamientos',
      themeColor: '#e86b18',
      introduction: [
        'Durante los próximos siete días vas a hacer algo simple y profundo: observar tus pensamientos sin juzgarlos.',
        'No se trata de cambiarlos. No se trata de eliminarlos. Solo de verlos pasar, como nubes.',
        'Al final de cada día anota uno o dos pensamientos que hayas notado recurrentes. Con el tiempo verás un patrón.'
      ],
      signature: '— Prof. Mtr. Álvaro Lyon',
      questions: [
        {
          id: 'registro_diario',
          type: 'long_text',
          repeatsFor: 7,
          repeatLabelPattern: 'DÍA {n}',
          required: true,
          text: 'Registro del día',
          helperText: 'Anota 1 o 2 pensamientos recurrentes que hayas notado hoy.'
        },
        {
          id: 'reflexion_semana',
          type: 'long_text',
          order: 1,
          required: true,
          text: '¿Qué patrón descubriste esta semana?',
          helperText: 'Mirando los siete días en conjunto, ¿qué se repite? ¿Qué te dice eso de ti?'
        }
      ]
    },

    {
      id: 'LA-02',
      code: 'LA-02',
      title: 'La Raíz Silenciosa',
      subtitle: 'Identificando tu creencia nuclear',
      themeColor: '#e86b18',
      introduction: [
        'Hay creencias que operan debajo de todo, sin que las hayamos elegido. Se instalaron temprano y hoy dirigen mucho más de lo que crees.',
        'En este protocolo vamos a nombrarlas con precisión. Es un trabajo delicado. Hazlo con calma.'
      ],
      signature: '— Prof. Mtr. Álvaro Lyon',
      questions: [
        {
          id: 'creencia_nuclear',
          type: 'long_text',
          order: 1,
          required: true,
          text: '¿Cuál es la creencia que más se repite en tu vida?',
          helperText: 'Escríbela en primera persona, como suena en tu cabeza. Ej: "no soy suficiente", "no merezco que me quieran", "algo está mal en mí".'
        },
        {
          id: 'origen_creencia',
          type: 'long_text',
          order: 2,
          required: true,
          text: '¿Cuándo apareció por primera vez?',
          helperText: '¿Qué edad tenías? ¿Qué situación la instaló? ¿Quién estaba presente?'
        },
        {
          id: 'situaciones_activadoras',
          type: 'long_text',
          order: 3,
          required: false,
          text: '¿En qué situaciones se activa hoy?',
          helperText: 'Nombra escenarios actuales donde esa creencia aparece con más fuerza.'
        }
      ]
    },

    {
      id: 'LA-03',
      code: 'LA-03',
      title: 'El Interrogatorio',
      subtitle: 'Cuestionando la creencia y anclando una nueva',
      themeColor: '#e86b18',
      introduction: [
        'Una creencia no muere porque decidamos que es falsa. Muere cuando le retiramos la fe y le damos evidencia nueva.',
        'Hoy vas a interrogarla. Y vas a construir una creencia alternativa con la que puedas vivir.'
      ],
      signature: '— Prof. Mtr. Álvaro Lyon',
      questions: [
        {
          id: 'intensidad_inicial',
          type: 'linear_scale',
          order: 1,
          required: true,
          text: 'Antes de interrogarla, ¿qué intensidad tiene esa creencia hoy?',
          helperText: '1 = no me afecta · 10 = me domina por completo',
          scale: { min: 1, max: 10, minLabel: 'No me afecta', maxLabel: 'Me domina' }
        },
        {
          id: 'interrogatorio',
          type: 'long_text',
          order: 2,
          required: true,
          text: 'El interrogatorio',
          helperText: 'Responde con honestidad:\n1) ¿Es 100% cierta?\n2) ¿Qué evidencia tengo en contra?\n3) ¿Cómo viviría si no fuera cierta?\n4) ¿De quién es esa voz realmente?'
        },
        {
          id: 'nueva_creencia',
          type: 'long_text',
          order: 3,
          required: true,
          text: 'Tu nueva creencia',
          helperText: 'Reescribe la frase original en versión amable y posible. No tiene que ser grandiosa: tiene que ser habitable.'
        },
        {
          id: 'intensidad_final',
          type: 'linear_scale',
          order: 4,
          required: true,
          text: 'Después del interrogatorio, ¿qué intensidad tiene ahora?',
          helperText: 'Vuelve a medir. Puede haber bajado, subido o quedado igual. Todo es información válida.',
          scale: { min: 1, max: 10, minLabel: 'No me afecta', maxLabel: 'Me domina' }
        }
      ]
    },

    {
      id: 'LA-04',
      code: 'LA-04',
      title: 'La Herida Visible',
      subtitle: 'Nombrar el recuerdo que todavía pesa',
      themeColor: '#e86b18',
      introduction: [
        'No todo recuerdo que duele necesita ser contado en detalle. Pero sí necesita ser nombrado.',
        'Hoy vas a poner luz sobre una memoria concreta. Con cuidado. A tu ritmo.'
      ],
      signature: '— Prof. Mtr. Álvaro Lyon',
      questions: [
        {
          id: 'descripcion_recuerdo',
          type: 'long_text',
          order: 1,
          required: true,
          text: '¿Qué recuerdo todavía te pesa?',
          helperText: 'Puede ser un momento puntual, una etapa, una conversación. Escríbelo sin necesidad de detalles crudos.'
        },
        {
          id: 'intensidad_emocional',
          type: 'linear_scale',
          order: 2,
          required: true,
          text: 'Cuando recuerdas ese momento hoy, ¿qué intensidad emocional sientes?',
          helperText: '1 = neutro · 10 = insoportable',
          scale: { min: 1, max: 10, minLabel: 'Neutro', maxLabel: 'Insoportable' }
        },
        {
          id: 'emociones_asociadas',
          type: 'long_text',
          order: 3,
          required: false,
          text: '¿Qué emociones se activan cuando lo recuerdas?',
          helperText: 'Nombra todas las que aparezcan: culpa, vergüenza, rabia, tristeza, miedo, soledad...'
        }
      ]
    },

    {
      id: 'LA-05',
      code: 'LA-05',
      title: 'Reescribir la Película',
      subtitle: 'Actualizar el recuerdo desde tu yo de hoy',
      themeColor: '#e86b18',
      introduction: [
        'El recuerdo no se trata de negar lo que pasó. Se trata de cambiar el lugar desde donde lo mirás hoy.',
        'Cuando recuerdas un evento, tu cerebro lo reconstruye. Y en cada reconstrucción puede reescribir la carga emocional.',
        'Hoy vas a hacerlo consciente.'
      ],
      signature: '— Prof. Mtr. Álvaro Lyon',
      questions: [
        {
          id: 'reescritura_recuerdo',
          type: 'long_text',
          order: 1,
          required: true,
          text: 'Cuéntame ese mismo recuerdo desde tu yo adulto de hoy',
          helperText: '¿Qué te dirías si pudieras acompañar a esa versión más joven de ti? ¿Qué le dirías que antes no podía escuchar?'
        },
        {
          id: 'comprension_nueva',
          type: 'long_text',
          order: 2,
          required: false,
          text: '¿Qué comprendes ahora que no comprendías antes?',
          helperText: '¿Hay algún aprendizaje, alguna compasión nueva, alguna perspectiva que no tenías?'
        },
        {
          id: 'intensidad_post_modificacion',
          type: 'linear_scale',
          order: 3,
          required: true,
          text: 'Después de la reescritura, ¿qué intensidad tiene ese recuerdo?',
          helperText: 'Vuelve a medir. Puede haber bajado mucho, poco, o incluso subido. Todas son respuestas válidas.',
          scale: { min: 1, max: 10, minLabel: 'Neutro', maxLabel: 'Insoportable' }
        }
      ]
    },

    {
      id: 'LA-06',
      code: 'LA-06',
      title: 'Yo Sin el Otro',
      subtitle: 'Dependencia emocional y autonomía afectiva',
      themeColor: '#e86b18',
      introduction: [
        'Los vínculos sanos sostienen. Los vínculos dependientes aprisionan.',
        'Hoy vamos a ver con claridad cuánto de tu bienestar descansa en otras personas y cuánto descansa en ti.'
      ],
      signature: '— Prof. Mtr. Álvaro Lyon',
      questions: [
        {
          id: 'escala_dependencia',
          type: 'grid_multiple_choice',
          order: 1,
          required: true,
          text: 'Escala de Dependencia Emocional',
          helperText: 'Puntúa del 1 al 5 qué tanto te identificas con cada afirmación.\n1 = Nunca · 5 = Siempre',
          matrix: {
            columns: ['1', '2', '3', '4', '5'],
            rows: [
              'Mi bienestar depende de la presencia o aprobación de otra persona',
              'Me cuesta tomar decisiones sin consultar a alguien',
              'Cuando alguien se aleja, siento que pierdo el piso',
              'Evito expresar lo que siento por miedo a que se moleste',
              'Suelo dejar mis necesidades para satisfacer a otro'
            ]
          }
        },
        {
          id: 'reflexion_vinculo',
          type: 'long_text',
          order: 2,
          required: true,
          text: '¿Qué vínculo es el que más activa esta dependencia?',
          helperText: 'Puede ser pareja, madre, padre, hermano/a, amigo/a. Descríbelo con honestidad.'
        }
      ]
    },

    {
      id: 'LA-07',
      code: 'LA-07',
      title: 'Tu Propio Refugio',
      subtitle: 'Re-parentalización y límites personales',
      themeColor: '#e86b18',
      introduction: [
        'Muchas veces esperamos de otros lo que no supimos darnos a nosotros mismos: cuidado, protección, permiso, ternura.',
        'Hoy vas a empezar a construir ese refugio interno. Y vas a definir límites que te protejan sin aislarte.'
      ],
      signature: '— Prof. Mtr. Álvaro Lyon',
      questions: [
        {
          id: 'decalogo',
          type: 'long_text',
          order: 1,
          required: true,
          text: 'Tu Decálogo Personal',
          helperText: 'Escribe entre 5 y 10 principios sobre cómo quieres ser tratado/a y cómo te vas a tratar tú. Empieza cada línea con "Yo merezco" o "Yo me permito".'
        },
        {
          id: 'reflexion_limites',
          type: 'long_text',
          order: 2,
          required: true,
          text: '¿En qué vínculo necesitas poner límites primero?',
          helperText: 'Nombra el vínculo, la situación concreta y qué límite quieres establecer.'
        }
      ]
    },

    {
      id: 'LA-08',
      code: 'LA-08',
      title: 'Tu Mapa de Vínculos',
      subtitle: 'Patrones heredados en tus relaciones',
      themeColor: '#e86b18',
      introduction: [
        'Nadie se relaciona en el vacío. Aprendemos a vincularnos en el primer hogar — y muchas veces repetimos eso mismo en la vida adulta.',
        'Hoy vas a trazar ese mapa para ver lo que antes era invisible.'
      ],
      signature: '— Prof. Mtr. Álvaro Lyon',
      questions: [
        {
          id: 'mapa_familiar',
          type: 'long_text',
          order: 1,
          required: true,
          text: 'Describe brevemente cómo se vinculaba tu familia de origen',
          helperText: '¿Cómo se expresaba el afecto? ¿Cómo se manejaba el conflicto? ¿Había algún tema tabú?'
        },
        {
          id: 'patrones_heredados',
          type: 'long_text',
          order: 2,
          required: true,
          text: '¿Qué patrones reconoces que repetís hoy?',
          helperText: 'Aunque no quieras. ¿Qué gestos, frases, reacciones tuyas suenan a algo familiar?'
        },
        {
          id: 'reflexion_patrones',
          type: 'long_text',
          order: 3,
          required: false,
          text: '¿Cuál de esos patrones quieres empezar a interrumpir?',
          helperText: 'Elige uno. Solo uno. Y escribe cómo se vería la versión alternativa.'
        }
      ]
    },

    {
      id: 'LA-09',
      code: 'LA-09',
      title: 'Diálogo y Liberación',
      subtitle: 'Carta a la persona y silla vacía',
      themeColor: '#e86b18',
      introduction: [
        'Hay conversaciones que nunca tuvimos, palabras que no dijimos, silencios que nos pesan.',
        'Hoy vas a darte el derecho de decirlas. Aunque la persona no esté, aunque no las escuche. Lo importante es que salgan de ti.'
      ],
      signature: '— Prof. Mtr. Álvaro Lyon',
      questions: [
        {
          id: 'carta_persona',
          type: 'long_text',
          order: 1,
          required: true,
          text: 'Carta a la persona',
          helperText: 'Escríbele lo que nunca le dijiste. Puede ser a un padre, una madre, una expareja, alguien que ya no está. Sin filtros.'
        },
        {
          id: 'nueva_narrativa',
          type: 'long_text',
          order: 2,
          required: true,
          text: 'Tu nueva narrativa',
          helperText: 'Ahora reescribe tu historia con esa persona, pero desde tu lugar de hoy. ¿Qué lugar ocupas tú en esa historia que antes no ocupabas?'
        },
        {
          id: 'escala_paz',
          type: 'linear_scale',
          order: 3,
          required: true,
          text: '¿Cuánta paz sientes ahora?',
          helperText: '1 = ninguna · 10 = mucha',
          scale: { min: 1, max: 10, minLabel: 'Ninguna', maxLabel: 'Mucha' }
        }
      ]
    },

    {
      id: 'LA-10',
      code: 'LA-10',
      title: 'Tu Termómetro Emocional',
      subtitle: 'Nombrar lo que sientes',
      themeColor: '#e86b18',
      introduction: [
        'No podemos regular lo que no podemos nombrar. El primer paso de toda inteligencia emocional es el vocabulario.',
        'Hoy vas a afinar tu termómetro: reconocer qué emociones te visitan y cuáles te cuesta aceptar.'
      ],
      signature: '— Prof. Mtr. Álvaro Lyon',
      questions: [
        {
          id: 'emociones_frecuentes',
          type: 'long_text',
          order: 1,
          required: true,
          text: '¿Qué emociones te visitan con más frecuencia?',
          helperText: 'Nombra al menos 3. No pienses si son "buenas" o "malas". Solo nómbralas.'
        },
        {
          id: 'emociones_dificiles',
          type: 'long_text',
          order: 2,
          required: true,
          text: '¿Cuáles te cuesta más aceptar?',
          helperText: 'Esas que rechazas apenas aparecen. Esas que escondes de los demás (y de ti).'
        },
        {
          id: 'situacion_activadora',
          type: 'long_text',
          order: 3,
          required: false,
          text: '¿Cuál es la situación que más las activa?',
          helperText: 'Describe un escenario concreto donde esas emociones aparecen con fuerza.'
        }
      ]
    },

    {
      id: 'LA-11',
      code: 'LA-11',
      title: 'Tu Caja de Herramientas',
      subtitle: 'Recursos, valores y propósito',
      themeColor: '#e86b18',
      introduction: [
        'Hasta aquí has hecho un trabajo enorme. Es momento de integrarlo en herramientas concretas que puedas usar cuando la tormenta aparezca.',
        'Hoy vas a construir tu caja. Y a definir tus valores y tu propósito.'
      ],
      signature: '— Prof. Mtr. Álvaro Lyon',
      questions: [
        {
          id: 'herramienta_mas_util',
          type: 'long_text',
          order: 1,
          required: true,
          text: '¿Qué herramienta de este recorrido te resultó más útil?',
          helperText: 'La que aplicarías sin pensarlo. La que ya sentís como tuya.'
        },
        {
          id: 'compromiso_practica_diaria',
          type: 'long_text',
          order: 2,
          required: true,
          text: '¿Qué práctica te comprometes a sostener cada día?',
          helperText: 'Concreta. Pequeña. Realista. Algo que puedas hacer en 5 minutos.'
        },
        {
          id: 'herramienta_5_valores',
          type: 'long_text',
          order: 3,
          required: true,
          text: 'Tus 5 valores más importantes',
          helperText: 'Cinco palabras. No frases. Los que quieras usar como brújula en decisiones importantes.'
        },
        {
          id: 'herramienta_6_proposito',
          type: 'long_text',
          order: 4,
          required: true,
          text: 'Tu propósito en una frase',
          helperText: 'Una frase que responda: ¿para qué estoy aquí? No tiene que ser perfecta. Tiene que ser tuya.'
        }
      ]
    },

    {
      id: 'LA-12',
      code: 'LA-12',
      title: 'Integración y Cierre',
      subtitle: 'Bitácora de vuelo',
      themeColor: '#e86b18',
      introduction: [
        'Has recorrido todo el programa. Este es un momento para mirar atrás y ver lo que hiciste.',
        'No fue magia. Fue trabajo. Y hoy toca reconocerlo.'
      ],
      signature: '— Prof. Mtr. Álvaro Lyon',
      questions: [
        {
          id: 'comparacion_general',
          type: 'multiple_choice',
          order: 1,
          required: true,
          text: 'En comparación con cuando empezaste, ¿cómo te sientes hoy?',
          options: ['Mucho mejor', 'Algo mejor', 'Igual', 'Algo peor']
        },
        {
          id: 'area_mas_mejorada',
          type: 'long_text',
          order: 2,
          required: true,
          text: '¿Cuál es el área donde más has notado mejoría?',
          helperText: 'Concreta: un vínculo, una emoción, una decisión, una relación contigo mismo/a.'
        },
        {
          id: 'mayor_aprendizaje',
          type: 'long_text',
          order: 3,
          required: true,
          text: '¿Cuál fue tu mayor aprendizaje en este proceso?',
          helperText: 'Si tuvieras que quedarte con UNA frase, ¿cuál sería?'
        },
        {
          id: 'carta_yo_futuro',
          type: 'long_text',
          order: 4,
          required: true,
          text: 'Carta a tu yo futuro',
          helperText: 'Escríbele a esa versión de ti que leerá esto en 6 meses. ¿Qué querés que recuerde? ¿Qué querés que no olvide?'
        }
      ]
    }

  ]
};

window.PROTOCOLOS_DATA = PROTOCOLOS_DATA;

console.log('✅ protocolos-data.js v3.0 cargado — ' + PROTOCOLOS_DATA.protocolos.length + ' protocolos disponibles (LA-00 a LA-12) + modelo de membresías');

// ============================================================
// ✅ FIN DEL ARCHIVO — protocolos-data.js v3.0
//    (13 protocolos + modelo de membresías v2.0)
// ============================================================
