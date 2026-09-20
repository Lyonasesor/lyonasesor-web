/**
 * protocolos-data.js
 * Lyon Asesor, f.p. — Datos estructurados de los Protocolos LA (LA-00 a LA-12)
 * Extraído de los Google Forms públicos de cada protocolo.
 *
 * Estructura de cada protocolo:
 * {
 *   id, code, title, fullTitle, subtitle, themeColor,
 *   formUrl (enlace corto), formEditUrl (enlace largo de Google Forms),
 *   introduction: [ párrafos de bienvenida/contexto ],
 *   signature: string|null (firma al final de la intro, si la hay),
 *   questions: [
 *     {
 *       id, order, text, helperText, required, type,
 *       options: [...] | null,
 *       scale: { min, max, minLabel, maxLabel } | null,
 *       matrix: { rows: [...], columns: [...] } | null,
 *       repeatsFor: n | null   // para bloques repetidos (ej. 7 días)
 *     }
 *   ],
 *   consent: { required, text },
 *   closingMessage: { title, subtitle }
 * }
 *
 * Tipos de pregunta usados:
 *   'email', 'short_text', 'long_text', 'date',
 *   'linear_scale', 'multiple_choice', 'checkbox',
 *   'grid_multiple_choice', 'grid_checkbox'
 */

const PROTOCOLOS_DATA = {
  meta: {
    brand: "Lyon Asesor, f.p.",
    tagline: "Consultorio en Desarrollo Personal - Inteligencia Emocional - Autoestima - Psicoterapia",
    author: "Prof. Mtr. Álvaro Lyon Abreu",
    contactEmail: "lyonasesor@outlook.com",
    totalProtocolos: 13,
    extractedAt: "2026-09-20"
  },

  protocolos: [
    // ─────────────────────────────────────────────────────────────
    // LA-00
    // ─────────────────────────────────────────────────────────────
    {
      id: "LA-00",
      code: "LA-00",
      title: "Mapa de Ruta Inicial",
      fullTitle: "Protocolo LA-00: Mapa de Ruta Inicial",
      subtitle: "El comienzo de tu viaje interior",
      themeColor: "rgb(153, 86, 4)",
      formUrl: "https://forms.gle/WdXCxZGkMCfWXyxm9",
      formEditUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeppjgD99A_0DO7OA_3TUcSBGz0Fi2zvNgd8dV8IU5K-8Zztw/viewform",
      introduction: [
        "Bienvenido/a a Lyon Asesor. Este espacio es para ti, para tu historia, para tus silencios y también para tus sueños.",
        "Antes de emprender cualquier viaje, necesitamos un mapa. No uno que te diga exactamente por dónde ir, sino uno que muestre dónde estás y hacia dónde quisieras mirar. Eso es este formulario: tu mapa de ruta personal.",
        "Aquí no hay respuestas correctas ni incorrectas. Solo tu verdad, escrita con tus palabras, sentida en tu cuerpo. Lo que compartas será la brújula que guiará nuestro camino juntos. Algunas preguntas te invitarán a mirar áreas de tu vida que quizás has dejado en penumbra. No temas. La luz, cuando llega, siempre trae claridad.",
        "Tómate tu tiempo. Respira. Esto no es un examen, es un acto de amor contigo mismo."
      ],
      signature: "Estoy aquí para acompañarte.",
      questions: [
        { id: "email", order: 1, text: "Email", helperText: null, required: true, type: "email" },
        { id: "nombre_apellido", order: 2, text: "Nombre y Apellido", helperText: null, required: true, type: "short_text" },
        { id: "fecha_nacimiento", order: 3, text: "Fecha de Nacimiento", helperText: null, required: true, type: "date" },
        { id: "que_te_trae", order: 4, text: "En tus propias palabras, ¿qué te trae a este espacio? ¿Qué está pasando en tu vida que te gustaría acompañar o transformar?", helperText: null, required: true, type: "long_text" },
        { id: "una_cosa", order: 5, text: "Si solo pudieras trabajar UNA COSA en este proceso, ¿cuál sería?", helperText: null, required: true, type: "long_text" },
        {
          id: "rueda_de_la_vida", order: 6,
          text: "RUEDA DE LA VIDA. En una escala del 1 al 5, donde 1 es \"Nada satisfecho\" y 5 es \"Totalmente satisfecho\", ¿cómo te sientes hoy en cada una de estas áreas?",
          helperText: null, required: true, type: "grid_multiple_choice",
          matrix: {
            rows: [
              "Autoestima / Cómo me valoro",
              "Relaciones de pareja",
              "Relaciones familiares",
              "Amistades / Vida social",
              "Manejo de mis emociones",
              "Claridad sobre mi propósito",
              "Historia personal / Pasado"
            ],
            columns: ["1", "2", "3", "4", "5"]
          }
        },
        {
          id: "filtro_de_profundidad", order: 7,
          text: "FILTRO DE PROFUNDIDAD. Responde Sí o No a las siguientes preguntas:",
          helperText: null, required: true, type: "grid_multiple_choice",
          matrix: {
            rows: [
              "¿Hay pensamientos que se repiten una y otra vez en tu mente, como un disco rayado?",
              "¿Sientes que hay creencias sobre ti mismo que te limitan? (Ej: \"no soy suficiente\", \"no merezco\")",
              "¿Hay algún recuerdo específico del pasado que aún te genere malestar cuando lo piensas?",
              "¿Hay relaciones del pasado (familiares, exparejas) que aún te pesan o te duelen?",
              "¿Sientes que repites patrones de tus padres o abuelos sin querer?",
              "¿Te cuesta identificar lo que sientes o ponerle nombre a tus emociones?",
              "¿Te cuesta calmarte cuando estás alterado/a?",
              "¿Sientes que dependes demasiado de la opinión o presencia de otros para sentirte bien?"
            ],
            columns: ["SÍ", "NO"]
          }
        },
        { id: "acompanamiento_previo", order: 8, text: "¿Has tenido acompañamiento psicológico o de desarrollo personal antes? Si es así, ¿qué fue útil y qué no?", helperText: null, required: true, type: "long_text" },
        { id: "algo_importante", order: 9, text: "¿Hay algo que consideres importante que sepa sobre ti o sobre tu historia?", helperText: null, required: true, type: "long_text" },
        { id: "como_te_sientes", order: 10, text: "¿Cómo te sientes después de completar este formulario?", helperText: null, required: true, type: "long_text" }
      ],
      consent: {
        required: true,
        text: "Declaro bajo fe de juramento que la información suministrada en este formulario es verdadera, completa y actualizada. Autorizo al Prof. Mtr. Alvaro Lyon, en su calidad de director de Lyon Asesor, f.p., a procesar mis datos personales con fines estrictamente terapéuticos, administrativos y de seguimiento de mi proceso, conforme a los principios de confidencialidad y a la legislación venezolana e internacional aplicable. Entiendo que puedo revocar este consentimiento en cualquier momento mediante notificación por escrito a lyonasesor@outlook.com."
      },
      closingMessage: {
        title: "Gracias por completar tu primer protocolo LA-00 / Mapa de Ruta Inicial",
        subtitle: "Es apenas el inicio, hay mucho que descifrar, Mucho Ánimo!"
      }
    },

    // ─────────────────────────────────────────────────────────────
    // LA-01
    // ─────────────────────────────────────────────────────────────
    {
      id: "LA-01",
      code: "LA-01",
      title: "Cazadores de Pensamientos",
      fullTitle: "Protocolo LA-01: Cazadores de Pensamientos",
      subtitle: "Atrapando las voces que te habitan",
      themeColor: "rgb(157, 82, 79)",
      formUrl: "https://forms.gle/ueD2DBLxDNdKJ36w7",
      formEditUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdBhHKO1BEp66RPmrTNL_Q9WZqTMM-flxrhZjlfvaB2tL4CEA/viewform",
      introduction: [
        "¿Alguna vez has sentido que tu mente es como una radio encendida todo el tiempo, con voces que a veces ni siquiera elegiste escuchar? Pensamientos que aparecen sin avisar, como visitantes inesperados, y que se instalan en tu pecho, en tu estómago, en tu respiración.",
        "Este formulario te invita a convertirte en un observador amable de esos visitantes. Durante una semana, te propongo un juego: ser un \"cazador de pensamientos\". No para atraparlos y encerrarlos, sino para observarlos, conocerlos, entender de dónde vienen y qué quieren decirte.",
        "No se trata de juzgarte por lo que piensas. Se trata de descubrir los patrones que se repiten, las frases que se esconden detrás de tus emociones. Porque lo que no se nombra, no se puede transformar.",
        "Lleva este registro contigo como quien lleva un cuaderno de bitácora. Cada pensamiento atrapado es un paso hacia la libertad."
      ],
      signature: null,
      questions: [
        { id: "email", order: 1, text: "Email", helperText: null, required: true, type: "email" },
        { id: "nombre_apellido", order: 2, text: "Nombre y Apellido", helperText: null, required: true, type: "short_text" },
        {
          id: "registro_diario", order: 3,
          text: "Durante los próximos 7 días, completa esta tabla cada vez que notes un pensamiento que te genere malestar. Puedes hacerlo en papel y luego pasarlo aquí, o directamente en el formulario si lo llevas en el móvil.",
          helperText: "- Fecha: / - Hora aproximada: / - Pensamiento (escrito tal cual vino): / - Emoción que sentí: / - Intensidad (1-10): / - ¿Dónde lo sentí en el cuerpo?: / - Situación (¿qué estaba pasando?):",
          required: true, type: "long_text", repeatsFor: 7,
          repeatLabelPattern: "DÍA {n}"
        },
        { id: "pensamientos_repetidos", order: 4, text: "Después de la semana de registro, mira el panorama general: ¿Qué pensamientos se REPITIERON con más frecuencia?", helperText: null, required: true, type: "long_text" },
        { id: "emociones_frecuentes", order: 5, text: "¿Qué EMOCIONES aparecieron con más frecuencia?", helperText: null, required: true, type: "long_text" },
        { id: "relacion_situaciones", order: 6, text: "¿Notas alguna RELACIÓN entre ciertas situaciones y ciertos pensamientos?", helperText: null, required: true, type: "long_text" },
        { id: "pensamiento_sorpresa", order: 7, text: "¿Hay algún pensamiento que te haya SORPRENDIDO? ¿Alguno que no esperabas encontrar?", helperText: null, required: true, type: "long_text" },
        { id: "como_te_sientes", order: 8, text: "¿Cómo te sientes después de haber observado tus pensamientos durante una semana?", helperText: null, required: true, type: "long_text" }
      ],
      consent: {
        required: true,
        text: "Declaro bajo fe de juramento que la información suministrada en este formulario es verdadera, completa y actualizada. Autorizo al Prof. Mtr. Alvaro Lyon, en su calidad de director de Lyon Asesor, f.p., a procesar mis datos personales con fines estrictamente terapéuticos, administrativos y de seguimiento de mi proceso, conforme a los principios de confidencialidad y a la legislación venezolana e internacional aplicable. Entiendo que puedo revocar este consentimiento en cualquier momento mediante notificación por escrito a lyonasesor@outlook.com."
      },
      closingMessage: {
        title: "Gracias por completar tu protocolo LA-01 / Cazadores de Pensamientos",
        subtitle: "Es apenas el inicio, hay mucho que descifrar, Mucho Ánimo!"
      }
    },

    // ─────────────────────────────────────────────────────────────
    // LA-02
    // ─────────────────────────────────────────────────────────────
    {
      id: "LA-02",
      code: "LA-02",
      title: "Excavando la Creencia Nuclear",
      fullTitle: "Protocolo LA-02: Excavando la Creencia Nuclear",
      subtitle: "Hasta la raíz del árbol",
      themeColor: "rgb(61, 128, 193)",
      formUrl: "https://forms.gle/j8pQZXrXDBRazhtB6",
      formEditUrl: "https://docs.google.com/forms/d/e/1FAIpQLSd43kxeFADgZKOqSBBgpOsANgWWx23R6Mv65p-R9MBCfd5WeA/viewform",
      introduction: [
        "Imagina un árbol enorme. Sus hojas son los pensamientos que se repiten a diario. Sus ramas son las emociones que te habitan. Pero debajo de la tierra, oculta, está la raíz. Una sola raíz de la que todo lo demás se alimenta.",
        "Esa raíz es tu CREENCIA NUCLEAR. Esa frase corta, a veces tan antigua que ya ni recuerdas cuándo la aprendiste, que susurra en tu interior: \"No soy suficiente\", \"No merezco ser amado\", \"El mundo es peligroso\".",
        "Hoy vamos a excavar. Vamos a apartar la tierra con cuidado, con respeto, para encontrar esa raíz. No para arrancarla de golpe, sino para mirarla a los ojos, para entender de dónde viene, quién te la enseñó, qué función cumplió en tu vida.",
        "Este es un acto de arqueología personal. Pueden aparecer lágrimas, puede aparecer alivio, puede aparecer un silencio profundo. Todo está bien. Estás yendo a lo esencial. Y lo esencial, aunque duela, siempre libera."
      ],
      signature: null,
      questions: [
        { id: "email", order: 1, text: "Email", helperText: null, required: true, type: "email" },
        { id: "nombre_apellido", order: 2, text: "Nombre y Apellido", helperText: null, required: true, type: "short_text" },
        { id: "intro_flecha_descendente", order: 3, text: "Ahora vamos a aplicar la TÉCNICA DE LA FLECHA DESCENDENTE. Responde cada pregunta con lo primero que venga a tu mente:", helperText: "Esto libera cadenas de pensamientos ocultos en ti", required: false, type: "section_header" },
        { id: "pensamiento_elegido", order: 4, text: "Revisa tus pensamientos más repetidos del formulario LA-01. Elige UNO, el que sientas más fuerte o más recurrente. Escríbelo aquí:", helperText: null, required: true, type: "long_text" },
        { id: "flecha_1", order: 5, text: "Si ese pensamiento fuese cierto, ¿qué significaría sobre mí?", helperText: null, required: true, type: "long_text" },
        { id: "flecha_2", order: 6, text: "Y si eso fuese cierto, ¿qué significaría sobre mí?", helperText: null, required: true, type: "long_text" },
        { id: "flecha_3", order: 7, text: "Y si eso fuese cierto, ¿qué significaría sobre mí en lo más profundo?", helperText: null, required: false, type: "long_text" },
        { id: "flecha_4", order: 8, text: "Y si eso fuese cierto, ¿qué significaría sobre mí?", helperText: null, required: true, type: "long_text" },
        { id: "flecha_5", order: 9, text: "Y si eso fuese cierto, ¿qué significaría sobre mí?", helperText: null, required: true, type: "long_text" },
        { id: "creencia_nuclear", order: 10, text: "Después de esta cadena, ¿cuál es la FRASE FINAL que aparece? Esa es tu CREENCIA NUCLEAR. Escríbela en primera persona, como una frase corta y poderosa.", helperText: "Ej: \"No soy suficiente\", \"Soy un fraude\", \"No merezco ser amado\", \"El mundo es peligroso\"", required: true, type: "long_text" },
        { id: "origen_creencia", order: 11, text: "¿De quién CREES que aprendiste esta creencia? ¿Alguien en tu vida (padres, abuelos, figuras importantes) pensaba algo similar?", helperText: null, required: false, type: "long_text" },
        { id: "edad_inicio", order: 12, text: "¿A qué EDAD aproximadamente crees que empezó esta creencia?", helperText: null, required: false, type: "long_text" },
        { id: "ubicacion_corporal", order: 13, text: "¿Dónde SIENTES esta creencia en tu cuerpo?", helperText: "Ej: opresión en el pecho, nudo en el estómago, tensión en la mandíbula", required: false, type: "long_text" },
        { id: "sensacion_fisica", order: 14, text: "Describe la SENSACIÓN: ¿Es calor? ¿Frío? ¿Peso? ¿Vacío? ¿Opresión?", helperText: null, required: false, type: "long_text" },
        {
          id: "certeza_creencia", order: 15,
          text: "En una escala del 1 al 5, ¿qué TAN CIERTA SIENTES que es esta creencia? (No lo que pienses, sino lo que sientes)",
          helperText: null, required: false, type: "linear_scale",
          scale: { min: 1, max: 5, minLabel: null, maxLabel: null }
        },
        { id: "creencia_deseada", order: 16, text: "¿Qué te gustaría CREER sobre ti mismo en lugar de esto? (No importa si no te lo crees aún, solo imagina)", helperText: null, required: true, type: "long_text" }
      ],
      consent: {
        required: true,
        text: "Confirmo que la información suministrada es verdadera, completa y actualizada. Autorizo al Prof. Mtr. Alvaro Lyon (Lyon Asesor, f.p.) a procesar mis datos personales con fines estrictamente terapéuticos, administrativos y de seguimiento de mi proceso, conforme a los principios de confidencialidad y a la legislación vigente. Entiendo que puedo revocar este consentimiento en cualquier momento mediante notificación por escrito a lyonasesor@outlook.com."
      },
      closingMessage: {
        title: "Gracias por completar tu protocolo LA-02 / Excavando la Creencia Nuclear",
        subtitle: "Te has acercado valientemente a parte de tu registro inconsciente, El Orden Personal se acerca para Ti."
      }
    },

    // ─────────────────────────────────────────────────────────────
    // LA-03
    // ─────────────────────────────────────────────────────────────
    {
      id: "LA-03",
      code: "LA-03",
      title: "Juicio a la Creencia",
      fullTitle: "Protocolo LA-03: Juicio a La Creencia",
      subtitle: "La creencia en el banquillo",
      themeColor: "rgb(123, 69, 24)",
      formUrl: "https://forms.gle/FcsY3fqGZseKR3wk8",
      formEditUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfxqNJoAwQ_sbOYqdfKH6qCbOiWFkt-X1bFFZwdkVIIUmgxLA/viewform",
      introduction: [
        "Has encontrado la raíz. Ahora toca interrogarla. Porque una creencia, por muy antigua que sea, por muy arraigada que esté, no es una verdad absoluta. Es una historia que aprendiste. Y las historias, por dolorosas que sean, pueden reescribirse.",
        "Hoy esa creencia se sienta en el banquillo de los acusados. Tú eres el juez, pero también el abogado defensor de tu propia paz. Vas a hacerle preguntas incómodas: ¿De verdad eres 100% cierta? ¿Dónde está la evidencia? ¿Has ayudado o has limitado?",
        "No se trata de negar tu experiencia. Se trata de ampliar la mirada. De encontrar las excepciones, esos pequeños momentos donde la creencia NO fue cierta. De preguntarte qué le dirías a un amigo si él tuviera esa misma creencia.",
        "Y al final, cuando la antigua creencia se haya debilitado, vas a construir una nueva. Una que elijas TÚ, no que heredaste. Una que te potencie, que te haga bien, que puedas llegar a creer con el tiempo.",
        "Este no es un acto de ingenuidad, es un acto de valentía. Estás eligiendo cambiar el guión de tu propia historia."
      ],
      signature: null,
      questions: [
        { id: "email", order: 1, text: "Email", helperText: null, required: true, type: "email" },
        { id: "nombre_apellido", order: 2, text: "Nombre y Apellido", helperText: null, required: true, type: "short_text" },
        { id: "creencia_nuclear", order: 3, text: "Escribe aquí tu CREENCIA NUCLEAR (la que encontraste en LA-02):", helperText: null, required: true, type: "long_text" },
        {
          id: "intensidad_inicial", order: 4,
          text: "Antes de empezar, ¿qué INTENSIDAD tiene esta creencia HOY? (1-10)",
          helperText: null, required: true, type: "linear_scale",
          scale: { min: 1, max: 10, minLabel: null, maxLabel: null }
        },
        { id: "evidencia_favor", order: 5, text: "¿Qué EVIDENCIA REAL tienes de que esta creencia es 100% cierta? (Hechos objetivos, no interpretaciones)", helperText: null, required: true, type: "long_text" },
        { id: "evidencia_contra", order: 6, text: "¿Hay EVIDENCIA de que NO es completamente cierta? ¿Hay EXCEPCIONES? Piensa en momentos donde esta creencia NO fue cierta.", helperText: null, required: true, type: "long_text" },
        {
          id: "creencia_ayuda", order: 7,
          text: "¿Esta creencia te AYUDA a ser feliz, a tener las relaciones que quieres, a vivir como deseas?",
          helperText: null, required: true, type: "multiple_choice",
          options: ["SÍ", "NO", "A VECES"]
        },
        { id: "consejo_amigo", order: 8, text: "Si un AMIGO QUERIDO tuviera esta misma creencia, ¿qué le dirías?", helperText: null, required: true, type: "long_text" },
        {
          id: "creencia_universal", order: 9,
          text: "¿Esta creencia es 100% CIERTA para todas las personas en todas las situaciones?",
          helperText: null, required: true, type: "multiple_choice",
          options: ["SÍ", "NO"]
        },
        { id: "como_te_sientes_1", order: 10, text: "Después de estas preguntas, ¿cómo te sientes? ¿Algo se movió?", helperText: null, required: true, type: "long_text" },
        {
          id: "intensidad_final", order: 11,
          text: "Ahora, después del cuestionamiento, ¿qué INTENSIDAD tiene la creencia AHORA? (1-10)",
          helperText: null, required: true, type: "linear_scale",
          scale: { min: 1, max: 10, minLabel: null, maxLabel: null }
        },
        {
          id: "nueva_creencia", order: 12,
          text: "CONSTRUYAMOS UNA NUEVA CREENCIA. ¿Qué NECESITAS creer sobre ti para vivir mejor? MI NUEVA CREENCIA ES:",
          helperText: "Que sea en POSITIVO (no negaciones) / Que sea CREÍBLE (no algo tan lejano que suene a mentira) / Que sea en PRESENTE (como si ya fuera cierta)",
          required: true, type: "long_text"
        },
        { id: "anclaje_gesto", order: 13, text: "Vamos a crear un Ancoraje. Elige un GESTO sencillo que asociarás a esta nueva creencia (presionar dedos, tocarte el corazón, etc.). ¿Cuál eliges?", helperText: null, required: true, type: "long_text" },
        { id: "practica_ancla", order: 14, text: "Practica ahora: repite tu nueva creencia 5 veces mientras haces el gesto. ¿Qué SIENTES?", helperText: null, required: true, type: "long_text" },
        {
          id: "compromiso_ancla", order: 15,
          text: "Para la próxima semana, te invito a ACTIVAR este ancla 3 veces al día y cada vez que la creencia antigua quiera aparecer. ¿Te comprometes?",
          helperText: null, required: true, type: "multiple_choice",
          options: ["SÍ TOTALMENTE", "LO INTENTARE"]
        }
      ],
      consent: {
        required: false,
        text: "Confirmo que la información suministrada es verdadera, completa y actualizada. Autorizo al Prof. Mtr. Alvaro Lyon (Lyon Asesor, f.p.) a procesar mis datos personales con fines estrictamente terapéuticos, administrativos y de seguimiento de mi proceso, conforme a los principios de confidencialidad y a la legislación vigente. Entiendo que puedo revocar este consentimiento en cualquier momento mediante notificación por escrito a lyonasesor@outlook.com."
      },
      closingMessage: {
        title: "Gracias por completar tu protocolo LA-03 / Juicio a la Creencia",
        subtitle: "Ya iniciaste con el orden de los significados. Mentalmente te estas Reconstruyendo. Confío en TI."
      }
    },

    // ─────────────────────────────────────────────────────────────
    // LA-04
    // ─────────────────────────────────────────────────────────────
    {
      id: "LA-04",
      code: "LA-04",
      title: "El Recuerdo que aún Duele",
      fullTitle: "Protocolo LA-04: El Recuerdo que aún Duele",
      subtitle: "Cuando el pasado llama a tu puerta",
      themeColor: "rgb(135, 135, 135)",
      formUrl: "https://forms.gle/eQH9rYp1Z5CJpuv1A",
      formEditUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfVLA3YabNtnuAqS2Zl_qlq3bZZqGpL5iQL6DQI5CKFpSq4ZQ/viewform",
      introduction: [
        "Hay recuerdos que duelen como si hubiesen ocurrido ayer. Aparecen sin avisar, a veces en sueños, a veces en un olor, a veces en una frase que alguien dice sin saber. Y cuando aparecen, el cuerpo se tensa, la respiración se agita, y por un instante vuelves a estar allí.",
        "Este formulario es para elegir UNO de esos recuerdos. Solo uno. El que sientas que está llamando a tu puerta, pidiendo ser mirado.",
        "No vamos a revivirlo como si fuera la primera vez. Vamos a observarlo con distancia, con cuidado, como quien mira una fotografía antigua. Vamos a medir su temperatura emocional hoy, a sentir dónde se aloja en tu cuerpo, a escuchar qué pensamiento trae consigo.",
        "Este es el primer paso para que el pasado deje de ser una carga y se convierta en historia. Porque los recuerdos no desaparecen, pero pueden transformarse. Y cuando se transforman, tú también lo haces."
      ],
      signature: null,
      questions: [
        { id: "email", order: 1, text: "Email", helperText: null, required: true, type: "email" },
        { id: "nombre_apellido", order: 2, text: "Nombre y Apellido", helperText: null, required: true, type: "short_text" },
        { id: "descripcion_recuerdo", order: 3, text: "Describe el RECUERDO con el que quieres trabajar. Que sea una escena concreta, no una etapa general.", helperText: "Ej: \"El día que me despidieron del trabajo\", no \"mi etapa de desempleo\"", required: true, type: "long_text" },
        { id: "hace_cuanto_edad", order: 4, text: "¿Hace cuánto tiempo ocurrió? ¿Qué edad tenías?", helperText: null, required: true, type: "long_text" },
        {
          id: "intensidad_emocional", order: 5,
          text: "En una escala del 1 al 10, ¿qué INTENSIDAD EMOCIONAL tiene este recuerdo para ti HOY? (1 = no me afecta, 10 = me desborda)",
          helperText: null, required: true, type: "linear_scale",
          scale: { min: 1, max: 10, minLabel: "NO AFECTA", maxLabel: "AFECTA DEMASIADO" }
        },
        { id: "emocion_principal", order: 6, text: "¿Qué EMOCIÓN PRINCIPAL sientes cuando lo recuerdas? (Tristeza, rabia, miedo, vergüenza, culpa, etc.)", helperText: null, required: true, type: "long_text" },
        { id: "ubicacion_corporal", order: 7, text: "¿Dónde SIENTES ese recuerdo en tu cuerpo?", helperText: null, required: true, type: "long_text" },
        { id: "sensacion_fisica", order: 8, text: "Describe la SENSACIÓN FÍSICA: ¿Es opresión? ¿Calor? ¿Frío? ¿Peso? ¿Vacío?", helperText: null, required: true, type: "long_text" },
        { id: "pensamiento_asociado", order: 9, text: "Cuando recuerdas el evento, ¿qué PENSAMIENTO viene a tu mente? ¿Qué significa para ti lo que pasó?", helperText: null, required: true, type: "long_text" },
        {
          id: "frecuencia_aparicion", order: 10,
          text: "¿Este recuerdo aparece ESPONTÁNEAMENTE en tu día a día?",
          helperText: null, required: true, type: "multiple_choice",
          options: ["Sí, frecuentemente", "Sí, de vez en cuando", "Rara vez", "Casi nunca"]
        },
        { id: "disparadores", order: 11, text: "¿Hay algo que lo DISPARE? (Situaciones, personas, lugares, olores)", helperText: null, required: true, type: "long_text" },
        { id: "como_te_sientes", order: 12, text: "¿Cómo te sientes después de escribir sobre este recuerdo?", helperText: null, required: true, type: "long_text" }
      ],
      consent: {
        required: false,
        text: "Confirmo que la información suministrada es verdadera, completa y actualizada. Autorizo al Prof. Mtr. Alvaro Lyon (Lyon Asesor, f.p.) a procesar mis datos personales con fines estrictamente terapéuticos, administrativos y de seguimiento de mi proceso, conforme a los principios de confidencialidad y a la legislación vigente. Entiendo que puedo revocar este consentimiento en cualquier momento mediante notificación por escrito a lyonasesor@outlook.com."
      },
      closingMessage: {
        title: "Gracias por completar tu protocolo LA-04 / El recuerdo que aún duele",
        subtitle: "Ahora te encuentras aún más en un proceso de auto indagación profunda. Sigue Avanzando."
      }
    },

    // ─────────────────────────────────────────────────────────────
    // LA-05
    // ─────────────────────────────────────────────────────────────
    {
      id: "LA-05",
      code: "LA-05",
      title: "Actualizando el Recuerdo",
      fullTitle: "Protocolo LA-05: Actualizando el Recuerdo",
      subtitle: "Reescribiendo la película de tu pasado",
      themeColor: "rgb(153, 42, 31)",
      formUrl: "https://forms.gle/aptdaYhnotPFBxFV7",
      formEditUrl: "https://docs.google.com/forms/d/e/1FAIpQLScCm5rU3N4eWVfaGZkP3aCB5haoPTBW01nxl6FtDimidmCYZg/viewform",
      introduction: [
        "La ciencia hoy sabe algo maravilloso: cada vez que recordamos algo, nuestro cerebro lo reconstruye. Es como abrir un archivo de Word: puedes modificarlo antes de volver a guardarlo. Esto se llama neuroplasticidad. Y significa que puedes cambiar la carga emocional de un recuerdo sin borrar lo que pasó.",
        "Hoy vas a hacer eso. Vas a tomar ese recuerdo que duele y vas a introducir elementos nuevos. Vas a verte a ti mismo desde una pantalla de cine, con distancia. Vas a permitir que el \"tú de hoy\", con toda tu sabiduría actual, entre en la escena para proteger, consolar o abrazar al \"tú del pasado\".",
        "No se trata de negar lo que ocurrió. Se trata de añadir una nueva capa de significado. De mostrarle a tu cerebro que hoy estás a salvo, que aquello pasó, pero ya no te define.",
        "Al final, construirás una nueva frase, un nuevo significado para ese recuerdo. Y cada vez que el pasado llame a tu puerta, podrás recibirlo con más paz.",
        "Esto no es magia, es neurociencia aplicada a tu sanación."
      ],
      signature: null,
      questions: [
        { id: "email", order: 1, text: "Email", helperText: null, required: true, type: "email" },
        { id: "nombre_apellido", order: 2, text: "Nombre y Apellido", helperText: null, required: true, type: "short_text" },
        {
          id: "intensidad_inicial", order: 3,
          text: "Trae a tu mente el RECUERDO con el que estamos trabajando (el de LA-04). Antes de empezar, ¿qué INTENSIDAD tiene AHORA? (1-10)",
          helperText: null, required: true, type: "linear_scale",
          scale: { min: 1, max: 10, minLabel: "Muy poca", maxLabel: "Intensidad Incontrolable" }
        },
        { id: "distanciamiento_pantalla", order: 4, text: "Vamos a hacer un ejercicio de DISTANCIAMIENTO. Imagina que el recuerdo está ocurriendo en una PANTALLA DE CINE. Tú estás en la sala de cine, viéndote a ti mismo en la pantalla. Ahora, aleja la pantalla. Hazla más pequeña. Cambia la imagen a blanco y negro. ¿Qué notas?", helperText: null, required: true, type: "long_text" },
        { id: "tu_de_hoy", order: 5, text: "Ahora, introduce al \"TÚ DE HOY\" en la escena. El tú actual, con todos los recursos que tienes ahora (sabiduría, fortaleza, compasión), entra en la escena del recuerdo. ¿Qué hace ese \"tú de hoy\" por el \"tú del pasado\"? ¿Lo protege? ¿Lo consuela? ¿Le dice algo?", helperText: null, required: true, type: "long_text" },
        { id: "escena_modificada", order: 6, text: "Describe la ESCENA MODIFICADA. ¿Cómo es ahora? ¿Qué cambió?", helperText: null, required: true, type: "long_text" },
        {
          id: "intensidad_post_modificacion", order: 7,
          text: "Después de esta modificación, piensa de nuevo en el RECUERDO ORIGINAL. ¿Qué INTENSIDAD tiene AHORA? (1-10)",
          helperText: null, required: true, type: "linear_scale",
          scale: { min: 1, max: 5, minLabel: "Muy poca", maxLabel: "Intensidad Incontrolable" }
        },
        { id: "emocion_actual", order: 8, text: "¿Qué EMOCIÓN sientes ahora al pensar en el recuerdo?", helperText: null, required: true, type: "long_text" },
        { id: "cambio_corporal", order: 9, text: "¿Cambió algo en tu CUERPO? ¿La sensación física es diferente?", helperText: null, required: true, type: "long_text" },
        {
          id: "nueva_frase_significado", order: 10,
          text: "Construye una FRASE que resuma el NUEVO SIGNIFICADO de ese recuerdo. Mi nueva frase es:",
          helperText: "Ejemplos: \"Lo que viví me dolió, pero también me enseñó a valorarme.\" / \"Esa experiencia ya no me define.\" / \"Pude sobrevivir, y eso me hizo más fuerte.\"",
          required: true, type: "long_text"
        },
        { id: "como_te_sientes", order: 11, text: "¿Cómo te sientes después de este ejercicio?", helperText: null, required: true, type: "long_text" },
        {
          id: "compromiso_version_modificada", order: 12,
          text: "Para los próximos días, si el recuerdo aparece espontáneamente, trae esta VERSIÓN MODIFICADA y repite tu nueva frase. ¿Te comprometes?",
          helperText: null, required: true, type: "multiple_choice",
          options: ["Sí, Totalmente", "Lo Intentaré"]
        }
      ],
      consent: {
        required: false,
        text: "Confirmo que la información suministrada es verdadera, completa y actualizada. Autorizo al Prof. Mtr. Alvaro Lyon (Lyon Asesor, f.p.) a procesar mis datos personales con fines estrictamente terapéuticos, administrativos y de seguimiento de mi proceso, conforme a los principios de confidencialidad y a la legislación vigente. Entiendo que puedo revocar este consentimiento en cualquier momento mediante notificación por escrito a lyonasesor@outlook.com."
      },
      closingMessage: {
        title: "Gracias por completar tu protocolo LA-05 / Actualizando el Recuerdo",
        subtitle: "Estas descubriendo que tu mismo puedes corregir y ordenar tu interesante historia personal. No te detengas!"
      }
    },

    // ─────────────────────────────────────────────────────────────
    // LA-06
    // ─────────────────────────────────────────────────────────────
    {
      id: "LA-06",
      code: "LA-06",
      title: "¿Quién Soy Yo SIN el otro?",
      fullTitle: "Protocolo LA-06: ¿Quién Soy Yo SIN el otro?",
      subtitle: "El espejo que no refleja a nadie más",
      themeColor: "rgb(104, 75, 72)",
      formUrl: "https://forms.gle/Hr8QyXAWpeRUqCks6",
      formEditUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdZLrDH6kDx-gxoE80cxlhwWd-hXuXj6HD-Wl7LMPzzhzNADg/viewform",
      introduction: [
        "Hay momentos en la vida en que miramos a nuestro alrededor y nos damos cuenta de que hemos construido nuestra identidad a partir de los demás. Somos la pareja de alguien, el hijo de alguien, el amigo de alguien. Pero cuando nos quedamos solos, frente al espejo, aparece una pregunta incómoda: ¿quién soy yo, realmente, sin el otro?",
        "Este formulario te invita a explorar esa pregunta con honestidad y valentía. Vamos a mirar tu historia de relaciones, los patrones que se repiten, el miedo al abandono, la dependencia de la mirada externa.",
        "No se trata de juzgarte por haber dependido. La dependencia es humana. Se trata de preguntarte: ¿qué pasaría si aprendieras a ser tu propio hogar? ¿Si el vacío que a veces sientes pudiera llenarse con tu propia presencia?",
        "Vamos a descubrir juntos quién eres más allá de tus vínculos. Y ese descubrimiento, aunque al principio dé miedo, es el camino más profundo hacia la libertad."
      ],
      signature: null,
      questions: [
        { id: "email", order: 1, text: "Email", helperText: null, required: true, type: "email" },
        { id: "nombre_apellido", order: 2, text: "Nombre y Apellido", helperText: null, required: true, type: "short_text" },
        {
          id: "sentir_estando_solo", order: 3,
          text: "¿Cómo te sientes cuando estás SOLO/A por períodos prolongados?",
          helperText: null, required: false, type: "multiple_choice",
          options: ["En paz", "Ansioso/a", "Vacío/a", "Libre", "Asustado/a", "Other:"]
        },
        {
          id: "escala_dependencia", order: 4,
          text: "ESCALA DE DEPENDENCIA. Responde con la mayor honestidad (1 = Totalmente en desacuerdo, 5 = Totalmente de acuerdo):",
          helperText: null, required: true, type: "grid_multiple_choice",
          matrix: {
            rows: [
              "Necesito tener pareja para sentirme completo/a",
              "El miedo al abandono está presente en mis relaciones",
              "Mis estados de ánimo dependen de cómo me tratan los demás",
              "He tolerado situaciones que me dañan por miedo a perder a alguien",
              "Siento que no soy nada sin el otro"
            ],
            columns: ["1", "2", "3", "4", "5"]
          }
        },
        { id: "quien_soy_sin_otro", order: 5, text: "Ejercicio \"¿QUIÉN SOY SIN EL OTRO?\" Escribe TODAS las palabras, roles y etiquetas que usas para describirte (ej: madre, pareja, amigo, trabajador, inteligente, ansioso, etc.). No pienses, solo escribe.", helperText: null, required: true, type: "long_text" },
        { id: "revision_lista", order: 6, text: "Ahora, revisa tu lista. ¿Cuántas de esas palabras DEPENDEN de la presencia del otro? (Ej: \"soy la novia de...\", \"soy esposo de...\") ¿Cuántas son SÓLO TÚ?", helperText: null, required: true, type: "long_text" },
        { id: "quien_serias", order: 7, text: "Si desaparecieran TODAS tus relaciones (pareja, familia, amigos), ¿quién SERÍAS? ¿Qué quedaría de ti?", helperText: null, required: true, type: "long_text" },
        { id: "miedo_perder", order: 8, text: "¿Qué MIEDO aparece cuando piensas en perder a alguien importante?", helperText: null, required: true, type: "long_text" },
        { id: "creencia_tras_miedo", order: 9, text: "Detrás de ese miedo, ¿qué CREENCIA hay?", helperText: "Ej: \"Si me dejan, no sobrevivo\", \"No soy suficiente\", \"El abandono es insoportable\"", required: true, type: "long_text" },
        { id: "como_te_sientes", order: 10, text: "¿Cómo te sientes después de responder?", helperText: null, required: true, type: "long_text" }
      ],
      consent: {
        required: false,
        text: "Confirmo que la información suministrada es verdadera, completa y actualizada. Autorizo al Prof. Mtr. Alvaro Lyon (Lyon Asesor, f.p.) a procesar mis datos personales con fines estrictamente terapéuticos, administrativos y de seguimiento de mi proceso, conforme a los principios de confidencialidad y a la legislación vigente. Entiendo que puedo revocar este consentimiento en cualquier momento mediante notificación por escrito a lyonasesor@outlook.com."
      },
      closingMessage: {
        title: "Gracias por completar tu protocolo LA-06 / ¿Quién Soy Yo SIN el otro?",
        subtitle: "Estas ahora desvaneciendo dependencias, las cuales representan las mayores ataduras humanas!"
      }
    },

    // ─────────────────────────────────────────────────────────────
    // LA-07
    // ─────────────────────────────────────────────────────────────
    {
      id: "LA-07",
      code: "LA-07",
      title: "Re-Parentalización Y Límites",
      fullTitle: "Protocolo LA-07: Re-Parentalización Y LÍMITES",
      subtitle: "Convirtiéndote en tu propio refugio",
      themeColor: "rgb(195, 184, 182)",
      formUrl: "https://forms.gle/upVXfFE9KQbrWihT9",
      formEditUrl: "https://docs.google.com/forms/d/e/1FAIpQLSd6dvAU13t7T2G41uujqsm4hgctC4p0THDOsJy0TbBs9cygFw/viewform",
      introduction: [
        "Cuando éramos niños, buscábamos en nuestros padres seguridad, consuelo, validación. Pero a veces, por muchas razones, eso no llegó como necesitábamos. Y de adultos, seguimos buscando en los demás lo que no aprendimos a darnos.",
        "Hoy empiezas un camino de re-parentalización. Vas a aprender a ser ese padre amoroso para ti mismo. Vas a mirarte al espejo y decirte: \"Estoy aquí para ti. No te dejaré. Mereces amor\". Puede sonar extraño, puede incomodar. Pero cada vez que lo hagas, estarás creando una nueva conexión en tu cerebro, una nueva forma de relacionarte contigo.",
        "También vas a definir tus límites. Porque quererse también es saber decir \"no\". Es tener claro cómo quieres ser tratado y qué no estás dispuesto a tolerar. Vas a construir tu decálogo personal y a practicar la comunicación asertiva.",
        "Este no es un taller de autoayuda superficial. Es un entrenamiento profundo para convertirte en el adulto que siempre necesitaste."
      ],
      signature: null,
      questions: [
        { id: "email", order: 1, text: "Email", helperText: null, required: true, type: "email" },
        { id: "nombre_apellido", order: 2, text: "Nombre y Apellido", helperText: null, required: true, type: "short_text" },
        { id: "buscas_en_demas", order: 3, text: "¿Qué BUSCAS en los demás que no sabes darte a ti mismo?", helperText: "Ej: seguridad, consuelo, validación, compañía", required: true, type: "long_text" },
        {
          id: "espejo_afectivo", order: 4,
          text: "Ejercicio del ESPEJO AFECTIVO. Si tienes un espejo, mírate a los ojos. Si no, imagina tu reflejo. Repite (en voz alta o mentalmente): \"Estoy aquí para ti.\" / \"No te dejaré.\" / \"Mereces amor.\" / \"Estás haciendo lo mejor que puedes.\" ¿Cómo te sientes después de esto?",
          helperText: null, required: true, type: "long_text"
        },
        { id: "resistencia", order: 5, text: "¿Qué RESISTENCIA apareció? (Incomodidad, incredulidad, ganas de llorar, etc. Todo es normal)", helperText: null, required: true, type: "long_text" },
        { id: "abrazo_mariposa", order: 6, text: "Técnica del ABRAZO DE MARIPOSA. Cruza los brazos sobre el pecho, con las manos en los hombros. Da golpecitos suaves y alternados mientras repites: \"Estoy a salvo. Todo está bien. Puedo calmarme.\" ¿Cómo te sientes después?", helperText: null, required: true, type: "long_text" },
        { id: "decalogo", order: 7, text: "Ahora, vamos a definir tu DECÁLOGO DE CÓMO QUIERES SER TRATADO/A. Escribe 5 principios fundamentales para tus relaciones:", helperText: null, required: true, type: "long_text" },
        { id: "situacion_limite", order: 8, text: "Elige UNA situación donde necesites poner un límite o expresar algo importante. Escríbela.", helperText: null, required: true, type: "long_text" },
        {
          id: "formula_asertiva", order: 9,
          text: "Usando la FÓRMULA ASERTIVA, redacta cómo lo dirías. Tu mensaje:",
          helperText: "\"Cuando tú [conducta específica], yo siento [emoción], porque necesito [necesidad]. Te pido que [petición concreta].\"",
          required: true, type: "long_text"
        },
        {
          id: "seguridad_limite", order: 10,
          text: "En una escala del 1 al 10, ¿qué SEGURIDAD sientes para decir esto?",
          helperText: null, required: true, type: "linear_scale",
          scale: { min: 1, max: 10, minLabel: null, maxLabel: null }
        },
        { id: "recordatorio_miedo", order: 11, text: "¿Qué podrías RECORDARTE si sientes miedo al poner este límite?", helperText: null, required: true, type: "long_text" },
        { id: "compromiso_practica", order: 12, text: "Para la próxima semana, te invito a PRACTICAR este límite o a realizar una actividad SOLO/A por placer. ¿Cuál será?", helperText: null, required: true, type: "long_text" }
      ],
      consent: {
        required: false,
        text: "Confirmo que la información suministrada es verdadera, completa y actualizada. Autorizo al Prof. Mtr. Alvaro Lyon (Lyon Asesor, f.p.) a procesar mis datos personales con fines estrictamente terapéuticos, administrativos y de seguimiento de mi proceso, conforme a los principios de confidencialidad y a la legislación vigente. Entiendo que puedo revocar este consentimiento en cualquier momento mediante notificación por escrito a lyonasesor@outlook.com."
      },
      closingMessage: {
        title: "Gracias por completar tu protocolo LA-07 / Re-Parentalización Y LÍMITES",
        subtitle: "Estas asumiendo protagonismo real en tu propia vida. Continúa!"
      }
    },

    // ─────────────────────────────────────────────────────────────
    // LA-08
    // ─────────────────────────────────────────────────────────────
    {
      id: "LA-08",
      code: "LA-08",
      title: "Mi Mapa Vincular",
      fullTitle: "Protocolo LA-08: Mi Mapa Vincular",
      subtitle: "Los hilos invisibles de tu historia",
      themeColor: "rgb(144, 129, 99)",
      formUrl: "https://forms.gle/phBhxZFnt2kJqvQC9",
      formEditUrl: "https://docs.google.com/forms/d/e/1FAIpQLSesmQ-rc9TOj5xopk8xDEYfkJ-2AGcbg0ZlT7a-d8QNLfOUBw/viewform",
      introduction: [
        "Todos venimos de algún lado. Llevamos en la sangre no solo los rasgos físicos de nuestros ancestros, sino también sus silencios, sus miedos, sus patrones. A veces repetimos historias que no elegimos, como si obedeciéramos a un guion escrito mucho antes de que naciéramos.",
        "Este formulario te invita a dibujar tu mapa vincular. A poner en un papel a tus padres, tus abuelos, tus parejas significativas, y a observar las líneas que los conectan. Los amores, los conflictos, las distancias, las pérdidas.",
        "Al mirar el mapa completo, empezarás a ver patrones: divorcios que se repiten, enfermedades que aparecen a la misma edad, secretos que se callan. Y en medio de todo eso, podrás preguntarte: ¿qué es mío y qué es heredado?",
        "No se trata de culpar a nadie. Se trata de comprender. Porque lo que se comprende, se puede transformar. Y tú puedes ser quien rompa los patrones que ya no sirven."
      ],
      signature: null,
      questions: [
        { id: "email", order: 1, text: "Email", helperText: null, required: true, type: "email" },
        { id: "nombre_apellido", order: 2, text: "Nombre y Apellido", helperText: null, required: true, type: "short_text" },
        {
          id: "genograma_simplificado", order: 3,
          text: "Vamos a construir tu GENOGRAMA SIMPLIFICADO. Incluye: Abuelos (si los conoces o sabes algo de ellos), Padres, Hermanos, Parejas significativas (exparejas que aún pesen), Hijos (si aplica). Para cada persona, indica: Nombre o iniciales, Parentesco, Tipo de vínculo hoy (sano, conflictivo, distante, roto), Emoción principal que te genera. (Puedes dibujarlo en papel y luego describirlo aquí)",
          helperText: null, required: true, type: "long_text"
        },
        { id: "persona_excluida", order: 4, text: "¿Hay alguien EXCLUIDO, olvidado o de quien no se hable en tu familia?", helperText: null, required: true, type: "long_text" },
        { id: "relacion_prioritaria", order: 5, text: "Elige UNA RELACIÓN PRIORITARIA para trabajar, la que más te pese o más te duela. Coloca persona y parentesco.", helperText: null, required: true, type: "long_text" },
        {
          id: "escala_intensidad_relacion", order: 6,
          text: "Para esa relación, responde de menor a mayor en relación a la intensidad de la situación:",
          helperText: null, required: true, type: "grid_multiple_choice",
          matrix: {
            rows: [
              "Pensar en esta persona me genera malestar",
              "Siento que tengo asuntos pendientes",
              "Me cuesta perdonar algo que pasó",
              "Me cuesta perdonarme a mí mismo",
              "Esta relación afecta mis relaciones actuales"
            ],
            columns: ["1", "2", "3", "4", "5"]
          }
        },
        { id: "como_te_sientes", order: 7, text: "¿Cómo te sientes después de mapear tus vínculos?", helperText: null, required: true, type: "long_text" }
      ],
      consent: {
        required: false,
        text: "Confirmo que la información suministrada es verdadera, completa y actualizada. Autorizo al Prof. Mtr. Alvaro Lyon (Lyon Asesor, f.p.) a procesar mis datos personales con fines estrictamente terapéuticos, administrativos y de seguimiento de mi proceso, conforme a los principios de confidencialidad y a la legislación vigente. Entiendo que puedo revocar este consentimiento en cualquier momento mediante notificación por escrito a lyonasesor@outlook.com."
      },
      closingMessage: {
        title: "Gracias por completar tu Protocolo LA-08: Mi Mapa Vincular",
        subtitle: "Tú vida comienza a sentirse diferente? Reflexiona. Continúa!"
      }
    },

    // ─────────────────────────────────────────────────────────────
    // LA-09
    // ─────────────────────────────────────────────────────────────
    {
      id: "LA-09",
      code: "LA-09",
      title: "Diálogo y Liberación",
      fullTitle: "Protocolo LA-09: Diálogo y Liberación",
      subtitle: "Lo que nunca se dijo",
      themeColor: "rgb(240, 120, 15)",
      formUrl: "https://forms.gle/BdRiaT8hESZVQJvq5",
      formEditUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfo2qzM9XaNWJ-k3O8Dm4Jeyjo4xlNEF3ijyVIpdZVvUYV1vA/viewform",
      introduction: [
        "Hay personas que han marcado tu vida. Algunas aún están, otras se fueron. Pero aunque ya no estén físicamente, a veces siguen habitando en tu pecho, en esos diálogos pendientes, en esas palabras que nunca se dijeron, en esos perdones que no llegaron.",
        "Hoy vas a darles voz. Vas a escribir una carta que nunca enviarás, pero que escribirá tu alma. Sin filtros, sin miedo, sin corregir. Vas a decir todo lo que no pudiste decir: el dolor, la rabia, la tristeza, pero también el agradecimiento si existe.",
        "Luego, vas a sentarlos en una silla vacía y vas a escuchar lo que tendrían que decir. Y en ese diálogo imaginario, van a pasar cosas. Vas a comprender, vas a soltar, vas a perdonar quizás. Y sobre todo, vas a perdonarte.",
        "Este formulario es un ritual de liberación. No para olvidar, sino para recordar desde otro lugar. Para que esa persona deje de ocupar tanto espacio en tu presente."
      ],
      signature: null,
      questions: [
        { id: "email", order: 1, text: "Email", helperText: null, required: true, type: "email" },
        { id: "nombre_apellido", order: 2, text: "Nombre y Apellido", helperText: null, required: true, type: "short_text" },
        { id: "persona_trabajo", order: 3, text: "Persona con la que vas a trabajar (la que elegiste en LA-08):", helperText: null, required: true, type: "long_text" },
        { id: "carta_no_enviada", order: 4, text: "Escribe una CARTA NO ENVIADA a esta persona. Sin filtros, sin corregir. Dile todo lo que no has podido decir: lo que dolió, lo que necesitaste, las preguntas sin respuesta, la rabia, la tristeza, y también lo que agradeces (si aplica).", helperText: null, required: true, type: "long_text" },
        { id: "como_te_sientes_carta", order: 5, text: "¿Cómo te sientes después de escribir la carta?", helperText: null, required: true, type: "long_text" },
        { id: "silla_vacia", order: 6, text: "Ahora, imagina que esa persona está sentada frente a ti (ejercicio de la SILLA VACÍA). Si pudiera responder, ¿qué crees que te diría?", helperText: null, required: true, type: "long_text" },
        { id: "necesitas_perdonar", order: 7, text: "¿Hay algo que NECESITES PERDONAR a esta persona? (Recuerda: perdonar no es justificar, es soltar tu carga)", helperText: null, required: true, type: "long_text" },
        { id: "necesitas_perdonarte", order: 8, text: "¿Hay algo que NECESITES PERDONARTE a TI MISMO en esta relación?", helperText: null, required: true, type: "long_text" },
        { id: "corte_de_lazos", order: 9, text: "Visualización de CORTE DE LAZOS. Respira profundo durante todo el proceso, cierra los ojos, Imagina que entre tú y esa persona hay un cordón energético. Si es un cordón de dolor, visualiza que se transforma en luz o se disuelve. ¿Cómo fue esa experiencia?", helperText: null, required: true, type: "long_text" },
        {
          id: "nueva_narrativa", order: 10,
          text: "Construye una NUEVA NARRATIVA sobre esta relación. Una frase que resuma lo que ahora significa para ti, integrando lo aprendido.",
          helperText: "Ejemplo: \"Esta relación me enseñó a valorarme\", \"Llevo lo bueno y suelto lo que me dañaba\".",
          required: true, type: "long_text"
        },
        {
          id: "escala_paz", order: 11,
          text: "En una escala del 1 al 10, ¿cuánta PAZ sientes ahora al pensar en esta persona?",
          helperText: null, required: true, type: "linear_scale",
          scale: { min: 1, max: 10, minLabel: "Ninguna", maxLabel: "Total" }
        },
        { id: "algo_mas_compartir", order: 12, text: "¿Hay algo más que quieras compartir sobre esa persona para cerrar el ciclo?", helperText: null, required: true, type: "long_text" }
      ],
      consent: {
        required: true,
        text: "Confirmo que la información suministrada es verdadera, completa y actualizada. Autorizo al Prof. Mtr. Alvaro Lyon (Lyon Asesor, f.p.) a procesar mis datos personales con fines estrictamente terapéuticos, administrativos y de seguimiento de mi proceso, conforme a los principios de confidencialidad y a la legislación vigente. Entiendo que puedo revocar este consentimiento en cualquier momento mediante notificación por escrito a lyonasesor@outlook.com."
      },
      closingMessage: {
        title: "Gracias por completar tu Protocolo LA-09: Diálogo y Liberación",
        subtitle: "Liberarse de ataduras emocionales es aprender a solucionar problemas estructurales de vida. Felicidades!"
      }
    },

    // ─────────────────────────────────────────────────────────────
    // LA-10
    // ─────────────────────────────────────────────────────────────
    {
      id: "LA-10",
      code: "LA-10",
      title: "Termómetro Emocional",
      fullTitle: "Protocolo LA-10: Termómetro Emocional",
      subtitle: "El lenguaje olvidado de tu cuerpo",
      themeColor: "rgb(194, 110, 16)",
      formUrl: "https://forms.gle/v9M9quZHhf15joQ57",
      formEditUrl: "https://docs.google.com/forms/d/e/1FAIpQLSf5rlqZ7CHhpFY7yc2meET1XPUnJfTO5bFM1KU5z1GAMZsqrw/viewform",
      introduction: [
        "Las emociones son el idioma de tu cuerpo. Cuando sientes mariposas en el estómago, tu cuerpo te está diciendo algo. Cuando sientes un nudo en la garganta, también. Pero a veces hemos perdido la traducción. Sentimos \"malestar\" sin saber si es tristeza, rabia o miedo.",
        "Este formulario es un diccionario para reconectar con ese idioma olvidado. Vas a expandir tu vocabulario emocional, a descubrir matices, a ponerle nombre a lo que antes era solo un ruido de fondo.",
        "Durante unos días, vas a llevar un termómetro emocional. Tres veces al día vas a parar, respirar y preguntarte: ¿qué siento ahora? ¿dónde lo siento en el cuerpo? ¿qué intensidad tiene?",
        "Este ejercicio, tan sencillo, es la base de toda inteligencia emocional. Porque lo que no se nombra, no se puede gestionar. Y lo que no se siente en el cuerpo, no se ha sentido de verdad."
      ],
      signature: null,
      questions: [
        { id: "email", order: 1, text: "Email", helperText: null, required: true, type: "email" },
        { id: "nombre_apellido", order: 2, text: "Nombre y Apellido", helperText: null, required: true, type: "short_text" },
        {
          id: "facilidad_identificar", order: 3,
          text: "¿Qué TAN FÁCIL te resulta identificar lo que sientes en el día a día?",
          helperText: null, required: true, type: "multiple_choice",
          options: ["Muy fácil", "Algo fácil", "Algo difícil", "Muy difícil"]
        },
        {
          id: "rueda_de_emociones", order: 4,
          text: "RUEDA DE EMOCIONES. A continuación, encontrarás emociones básicas. Para cada una, escribe MATICES (otras palabras que describan esa emoción más específicamente):",
          helperText: "- RABIA (ej: enfado, indignación, frustración, irritación) / - TRISTEZA (ej: melancolía, pena, desánimo) / - MIEDO (ej: ansiedad, preocupación, nerviosismo) / - ALEGRÍA (ej: felicidad, gratitud, serenidad) / - VERGÜENZA (ej: culpa, humillación, bochorno)",
          required: true, type: "long_text"
        },
        {
          id: "registro_emocional_simplificado", order: 5,
          text: "Durante los próximos días, te invito a llevar un REGISTRO EMOCIONAL SIMPLIFICADO. Completa esta tabla para 5 momentos del día (puedes hacerlo en papel y luego resumir aquí lo más significativo):",
          helperText: "Momentos: Mañana / Tarde / Noche. Emociones: Rabia, Tristeza, Miedo, Alegría, Vergüenza, Amor. Intensidad: Baja / Media / Alta",
          required: false, type: "grid_checkbox",
          matrix: {
            rows: ["Momento", "Rabia", "Tristeza", "Miedo", "Alegría", "Verguenza", "Amor"],
            columns: ["Mañana", "Tarde", "Noche", "Intensidad Baja", "Intensidad Media", "Intensidad Alta"]
          }
        },
        { id: "emociones_frecuentes", order: 6, text: "¿Qué EMOCIONES aparecieron con más frecuencia?", helperText: null, required: true, type: "long_text" },
        { id: "emociones_dificiles", order: 7, text: "¿Qué emociones te resultan MÁS DIFÍCILES de identificar o aceptar?", helperText: null, required: true, type: "long_text" },
        { id: "relacion_emocion_cuerpo", order: 8, text: "¿Notaste alguna RELACIÓN entre ciertas emociones y ciertas partes de tu cuerpo?", helperText: null, required: true, type: "long_text" },
        { id: "como_te_sientes", order: 9, text: "¿Cómo te sientes después de prestar más atención a tus emociones?", helperText: null, required: true, type: "long_text" }
      ],
      consent: {
        required: true,
        text: "Confirmo que la información suministrada es verdadera, completa y actualizada. Autorizo al Prof. Mtr. Alvaro Lyon (Lyon Asesor, f.p.) a procesar mis datos personales con fines estrictamente terapéuticos, administrativos y de seguimiento de mi proceso, conforme a los principios de confidencialidad y a la legislación vigente. Entiendo que puedo revocar este consentimiento en cualquier momento mediante notificación por escrito a lyonasesor@outlook.com."
      },
      closingMessage: {
        title: "Gracias por completar tu Protocolo LA-10: Termómetro Emocional",
        subtitle: "Conocías la Autogestión Emocional? Es un recorrido interesante, sin embargo ya lo estas transitando!"
      }
    },

    // ─────────────────────────────────────────────────────────────
    // LA-11
    // ─────────────────────────────────────────────────────────────
    {
      id: "LA-11",
      code: "LA-11",
      title: "La Caja de Herramientas Emocionales",
      fullTitle: "Protocolo LA-11: La Caja de Herramientas Emocionales",
      subtitle: "Lo que necesitas cuando las emociones se desbordan",
      themeColor: "rgb(169, 143, 81)",
      formUrl: "https://forms.gle/YK19Ur99bwSbkJaz9",
      formEditUrl: "https://docs.google.com/forms/d/e/1FAIpQLScgnzjCIWNwV5SSnPtxkVzk3DKEC8XsgMXlRGQ5h6eNt4ZS6g/viewform",
      introduction: [
        "Imagina que llevas contigo una pequeña caja. Dentro hay herramientas. Algunas te sirven para calmarte cuando la ansiedad aprieta. Otras para cuestionar pensamientos que te atormentan. Otras para recordarte lo que realmente importa.",
        "Este formulario ES esa caja. Aquí vas a encontrar, una por una, las herramientas más poderosas para gestionar tus emociones: la técnica STOP, la respiración 4-7-8, el re-encuadre cognitivo, la auto-compasión, la conexión con tus valores y tu propósito.",
        "No vas a leer sobre ellas, vas a practicarlas. Una a una. Vas a sentir su efecto en tu cuerpo. Y al final, vas a elegir las que más resuenen contigo para incorporarlas a tu vida diaria.",
        "Porque la inteligencia emocional no se aprende en los libros, se aprende practicando. Y cada vez que uses estas herramientas, estarás fortaleciendo nuevos caminos en tu cerebro, caminos de calma, de claridad, de paz."
      ],
      signature: null,
      questions: [
        { id: "email", order: 1, text: "Email", helperText: null, required: true, type: "email" },
        { id: "nombre_apellido", order: 2, text: "Nombre y Apellido", helperText: null, required: true, type: "short_text" },
        {
          id: "herramienta_1_stop", order: 3,
          text: "HERRAMIENTA 1: TÉCNICA STOP. Piensa en un momento reciente de activación emocional. Aplica mentalmente: S (Alto): Detente / T (Respira): 3 respiraciones profundas / O (Observa): ¿Qué siento? ¿Dónde? / P (Procede): Elige cómo responder. ¿Cómo fue la experiencia?",
          helperText: null, required: true, type: "long_text"
        },
        {
          id: "herramienta_2_respiracion", order: 4,
          text: "HERRAMIENTA 2: RESPIRACIÓN 4-7-8. Practícala ahora: Inhala 4 segundos / Retén 7 segundos / Exhala 8 segundos / Repite 4 veces. ¿Cómo te sientes después?",
          helperText: null, required: true, type: "long_text"
        },
        {
          id: "herramienta_3_reencuadre", order: 5,
          text: "HERRAMIENTA 3: RE-ENCUADRE COGNITIVO. Piensa en un pensamiento negativo reciente. Completa: Pensamiento automático / Pensamiento alternativo (más realista y amable) / ¿Cambió tu emoción al cambiar el pensamiento? Escribe tus respuestas abajo!",
          helperText: null, required: false, type: "long_text"
        },
        {
          id: "herramienta_4_autocompasion", order: 6,
          text: "HERRAMIENTA 4: AUTO-COMPASIÓN. Repite las tres frases: 1. \"Esto es difícil ahora mismo.\" 2. \"Otros también se sienten así.\" 3. \"Puedo ser amable conmigo mismo.\" ¿Qué sientes al decirlas?",
          helperText: null, required: true, type: "long_text"
        },
        { id: "herramienta_5_valores", order: 7, text: "HERRAMIENTA 5: CONEXIÓN CON VALORES. ¿Cuáles son tus 3 VALORES MÁS IMPORTANTES?", helperText: null, required: true, type: "long_text" },
        { id: "vivir_alineado_valores", order: 8, text: "¿Cómo puedes VIVIR más alineado con estos valores esta semana?", helperText: null, required: true, type: "long_text" },
        { id: "herramienta_6_proposito", order: 9, text: "HERRAMIENTA 6: PROPÓSITO. Completa: \"Mi propósito en una frase es...\"", helperText: null, required: true, type: "long_text" },
        { id: "herramienta_mas_util", order: 10, text: "De todas estas herramientas, ¿cuál CREES que te será MÁS ÚTIL?", helperText: null, required: true, type: "long_text" },
        { id: "compromiso_practica_diaria", order: 11, text: "Para la próxima semana, elige UNA herramienta para practicar a diario. ¿Cuál eliges?", helperText: null, required: true, type: "long_text" }
      ],
      consent: {
        required: true,
        text: "Confirmo que la información suministrada es verdadera, completa y actualizada. Autorizo al Prof. Mtr. Alvaro Lyon (Lyon Asesor, f.p.) a procesar mis datos personales con fines estrictamente terapéuticos, administrativos y de seguimiento de mi proceso, conforme a los principios de confidencialidad y a la legislación vigente. Entiendo que puedo revocar este consentimiento en cualquier momento mediante notificación por escrito a lyonasesor@outlook.com."
      },
      closingMessage: {
        title: "Gracias por completar tu Protocolo LA-11: La Caja de Herramientas Emocionales",
        subtitle: "Recuerda que el compromiso en la práctica es indispensable, son decisiones para ti mismo!"
      }
    },

    // ─────────────────────────────────────────────────────────────
    // LA-12
    // ─────────────────────────────────────────────────────────────
    {
      id: "LA-12",
      code: "LA-12",
      title: "Bitácora de Vuelo",
      fullTitle: "Protocolo LA-12: Bitácora de Vuelo",
      subtitle: "Has llegado al final de este viaje... o al principio de algo nuevo",
      themeColor: "rgb(106, 117, 149)",
      formUrl: "https://forms.gle/mzAgSpjGebowMzqs9",
      formEditUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdpswPdOBR8g7Gi5xdPTb03LCsm1IBoUlrHRXU_c9hQP5bbWg/viewform",
      introduction: [
        "Querido/a consultante,",
        "Si estás viendo este formulario, es porque has recorrido un camino. Un camino que no siempre fue fácil, que tuvo momentos de claridad y momentos de tormenta, de descubrimientos y también de resistencias.",
        "Este último formulario es especial. No es para que yo te evalúe. Es para que TÚ mismo traces el mapa de lo vivido, reconozcas tus logros, nombres tus herramientas y dejes constancia de quién eres hoy en comparación con quien eras cuando llegaste.",
        "Las preguntas que siguen están basadas en los doce pilares de nuestro trabajo juntos. Tómalas como un espejo. Mírate en él con honestidad, con amor, con la satisfacción de quien ha hecho un trabajo profundo.",
        "Al final, cuando completes esto, recibirás (por email o de mi parte) un documento con tus propias respuestas. Será tu bitácora de vuelo personal. Un tesoro que guardar y al que volver cuando lo necesites.",
        "Gracias por confiar. Gracias por tu valentía."
      ],
      signature: "Con gratitud, Mtr. Alvaro Lyon — Lyon Asesor, f.p.",
      questions: [
        { id: "email", order: 1, text: "Email", helperText: null, required: true, type: "email" },
        { id: "nombre_apellido", order: 2, text: "Nombre y Apellido", helperText: null, required: true, type: "short_text" },
        { id: "fecha", order: 3, text: "Fecha", helperText: null, required: true, type: "date" },

        // Re-evaluación cuantitativa
        { id: "section_reevaluacion", order: 4, text: "RE-EVALUACIÓN CUANTITATIVA", helperText: "Recuerda cuando empezaste y puntuaste estas áreas del 1 al 10. Ahora, al finalizar, vuelve a puntuarlas con la misma honestidad. No importa si no recuerdas tus puntuaciones iniciales; lo importante es cómo te sientes HOY.", required: false, type: "section_header" },
        {
          id: "autoestima_hoy", order: 5,
          text: "AUTOESTIMA / AUTOVALORACIÓN. ¿Cómo te sientes contigo mismo hoy? (1 = muy mal, 10 = excelente)",
          helperText: null, required: true, type: "linear_scale",
          scale: { min: 1, max: 10, minLabel: "Muy Mal", maxLabel: "Excelente" }
        },
        {
          id: "relaciones_pareja_hoy", order: 6,
          text: "RELACIONES DE PAREJA (o la relación afectiva más significativa). (1 = muy insatisfecho, 10 = muy satisfecho)",
          helperText: null, required: false, type: "linear_scale",
          scale: { min: 1, max: 10, minLabel: "Muy Insatisfecho", maxLabel: "Muy Satisfecho" }
        },
        {
          id: "relaciones_familiares_hoy", order: 7,
          text: "RELACIONES FAMILIARES. (1 = muy conflictivas/dolorosas, 10 = muy armónicas)",
          helperText: null, required: true, type: "linear_scale",
          scale: { min: 1, max: 10, minLabel: "Muy conflictivas", maxLabel: "Muy armónicas" }
        },
        {
          id: "manejo_emociones_hoy", order: 8,
          text: "MANEJO DE TUS EMOCIONES. (1 = me desbordan siempre, 10 = las gestiono bien)",
          helperText: null, required: true, type: "linear_scale",
          scale: { min: 1, max: 10, minLabel: "Me desbordan siempre", maxLabel: "Las gestiono bien" }
        },
        {
          id: "claridad_proposito_hoy", order: 9,
          text: "CLARIDAD SOBRE TU PROPÓSITO O SENTIDO DE VIDA. (1 = totalmente perdido, 10 = muy claro)",
          helperText: null, required: true, type: "linear_scale",
          scale: { min: 1, max: 10, minLabel: "Totalmente perdido", maxLabel: "Muy claro" }
        },
        {
          id: "relacion_historia_personal_hoy", order: 10,
          text: "RELACIÓN CON TU HISTORIA PERSONAL / PASADO. (1 = me pesa mucho, 10 = estoy en paz)",
          helperText: null, required: true, type: "linear_scale",
          scale: { min: 1, max: 10, minLabel: "Pesa mucho", maxLabel: "Estoy en paz" }
        },
        {
          id: "comparacion_general", order: 11,
          text: "En comparación con cuando empezaste, ¿cómo dirías que estás AHORA?",
          helperText: null, required: true, type: "multiple_choice",
          options: ["Mucho mejor", "Algo mejor", "Igual", "Algo pero", "Mucho peor"]
        },
        { id: "area_mas_mejorada", order: 12, text: "¿En qué área sientes que has MEJORADO MÁS?", helperText: null, required: true, type: "long_text" },

        // Síntesis de módulos trabajados
        { id: "section_sintesis", order: 13, text: "SÍNTESIS DE MÓDULOS TRABAJADOS", helperText: "Durante el proceso, exploramos diferentes áreas. Responde solo las que hayamos trabajado juntos. Si algún módulo no aplica, déjalo en blanco.", required: false, type: "section_header" },

        { id: "section_modulo_1", order: 14, text: "MÓDULO 1: CREENCIAS Y DIÁLOGO INTERNO", helperText: null, required: false, type: "section_header" },
        { id: "modulo1_creencia_nuclear", order: 15, text: "¿Cuál era la CREENCIA NUCLEAR que identificamos? (Esa frase profunda que te limitaba)", helperText: null, required: false, type: "long_text" },
        { id: "modulo1_nueva_creencia", order: 16, text: "¿Cuál es la NUEVA CREENCIA que construiste?", helperText: null, required: false, type: "long_text" },
        {
          id: "modulo1_certeza_hoy", order: 17,
          text: "¿Qué tan cierta sientes HOY esta nueva creencia? (1 = nada, 10 = totalmente)",
          helperText: null, required: false, type: "linear_scale",
          scale: { min: 1, max: 10, minLabel: "Nada", maxLabel: "Totalmente" }
        },
        { id: "modulo1_ancla", order: 18, text: "¿Qué ANCLA o gesto creaste para recordarla?", helperText: null, required: false, type: "long_text" },

        { id: "section_modulo_2", order: 19, text: "MÓDULO 2: MEMORIAS QUE PESAN", helperText: null, required: false, type: "section_header" },
        { id: "modulo2_recuerdo", order: 20, text: "¿Qué RECUERDO trabajamos?", helperText: null, required: false, type: "long_text" },
        { id: "modulo2_intensidad_inicial", order: 21, text: "¿Qué INTENSIDAD tenía ese recuerdo AL INICIO? (1-10)", helperText: null, required: false, type: "short_text" },
        { id: "modulo2_intensidad_actual", order: 22, text: "¿Qué INTENSIDAD tiene AHORA? (1-10)", helperText: null, required: false, type: "short_text" },
        { id: "modulo2_nueva_frase", order: 23, text: "¿Cuál es la NUEVA FRASE o significado que le diste a ese recuerdo?", helperText: null, required: false, type: "long_text" },

        { id: "section_modulo_3", order: 24, text: "MÓDULO 3: AUTOESTIMA Y DEPENDENCIA", helperText: null, required: false, type: "section_header" },
        { id: "modulo3_relacion_contigo", order: 25, text: "¿Cómo describirías tu relación CONTIGO MISMO/A hoy?", helperText: null, required: false, type: "long_text" },
        { id: "modulo3_limites_claros", order: 26, text: "¿Cuáles son los LÍMITES MÁS IMPORTANTES que ahora tienes claros?", helperText: null, required: false, type: "long_text" },
        { id: "modulo3_limite_practica", order: 27, text: "¿Has podido poner algún límite en práctica? ¿Cómo fue?", helperText: null, required: false, type: "long_text" },

        { id: "section_modulo_4", order: 28, text: "MÓDULO 4: VÍNCULOS Y FAMILIA", helperText: null, required: false, type: "section_header" },
        { id: "modulo4_vinculo", order: 29, text: "¿Qué VÍNCULO o relación trabajamos?", helperText: null, required: false, type: "long_text" },
        { id: "modulo4_carga_inicial", order: 30, text: "¿Cuál era la CARGA que sentías? (1-10)", helperText: null, required: false, type: "short_text" },
        { id: "modulo4_carga_actual", order: 31, text: "¿Cuál es la CARGA AHORA? (1-10)", helperText: null, required: false, type: "short_text" },
        { id: "modulo4_nueva_narrativa", order: 32, text: "¿Cuál es la NUEVA NARRATIVA sobre esa relación? (¿Qué significa para ti hoy?)", helperText: null, required: false, type: "long_text" },

        { id: "section_modulo_5", order: 33, text: "MÓDULO 5: INTELIGENCIA EMOCIONAL", helperText: null, required: false, type: "section_header" },
        {
          id: "modulo5_herramientas_regulacion", order: 34,
          text: "¿Qué HERRAMIENTAS de regulación emocional te han servido más? (Puedes elegir varias)",
          helperText: null, required: false, type: "checkbox",
          options: ["STOP", "ABRAZO MARIPOSA", "RE-ENCUADRE DE PENSAMIENTOS", "AUTO-COMPASIÓN", "Other:"]
        },
        { id: "modulo5_valores", order: 35, text: "¿Cuáles son tus 3 VALORES MÁS IMPORTANTES en la vida?", helperText: null, required: false, type: "long_text" },
        { id: "modulo5_proposito", order: 36, text: "¿Cuál es tu declaración de PROPÓSITO o la frase que te motiva?", helperText: null, required: false, type: "long_text" },

        { id: "section_logros", order: 37, text: "SECCIÓN 5: LOGROS Y APRENDIZAJES", helperText: null, required: false, type: "section_header" },
        { id: "mayor_aprendizaje", order: 38, text: "¿Cuál dirías que ha sido el MAYOR APRENDIZAJE de este proceso?", helperText: null, required: false, type: "long_text" },
        { id: "momento_mas_dificil", order: 39, text: "¿Cuál fue el MOMENTO MÁS DIFÍCIL?", helperText: null, required: false, type: "long_text" },
        { id: "algo_nuevo_ves", order: 40, text: "¿Hay algo que hoy ves de ti que ANTES NO VEÍAS?", helperText: null, required: false, type: "long_text" },
        { id: "que_agradeces", order: 41, text: "¿Qué es lo que más AGRADECES de este camino?", helperText: null, required: false, type: "long_text" },

        { id: "section_mantenimiento", order: 42, text: "SECCIÓN 6: PLAN DE MANTENIMIENTO", helperText: null, required: false, type: "section_header" },
        { id: "senales_alerta", order: 43, text: "SEÑALES DE ALERTA. ¿Qué situaciones, emociones o pensamientos te indicarían que necesitas volver a tus herramientas?", helperText: null, required: false, type: "long_text" },
        { id: "plan_emergencia", order: 44, text: "PLAN DE EMERGENCIA. Si notas esas señales, ¿qué harás PASO A PASO?", helperText: null, required: false, type: "long_text" },
        { id: "herramienta_seguir_practicando", order: 45, text: "¿Qué HERRAMIENTA te comprometes a SEGUIR PRACTICANDO en tu día a día?", helperText: null, required: false, type: "long_text" },

        { id: "section_carta_futuro", order: 46, text: "SECCIÓN 7: CARTA AL YO FUTURO", helperText: null, required: false, type: "section_header" },
        { id: "carta_yo_futuro", order: 47, text: "Escríbete una carta a ti mismo/a para leer en 6 meses o 1 año. Cuéntale a ese \"yo futuro\" lo que has vivido, lo que has aprendido, lo que no quieres olvidar. Dale ánimos, recuérdale sus herramientas, háblale con amor.", helperText: null, required: false, type: "long_text" },

        { id: "section_cierre", order: 48, text: "SECCIÓN 8: CIERRE Y CELEBRACIÓN", helperText: null, required: false, type: "section_header" },
        { id: "como_celebraras", order: 49, text: "¿Cómo vas a CELEBRAR el haber llegado hasta aquí?", helperText: null, required: false, type: "long_text" },
        { id: "algo_mas_compartir_terapeuta", order: 50, text: "¿Hay algo más que quieras compartir conmigo (tu terapeuta) antes de cerrar este ciclo?", helperText: null, required: false, type: "long_text" }
      ],
      consent: {
        required: true,
        text: "Confirmo que la información suministrada es verdadera, completa y actualizada. Autorizo al Prof. Mtr. Alvaro Lyon (Lyon Asesor, f.p.) a procesar mis datos personales con fines estrictamente terapéuticos, administrativos y de seguimiento de mi proceso, conforme a los principios de confidencialidad y a la legislación vigente. Entiendo que puedo revocar este consentimiento en cualquier momento mediante notificación por escrito a lyonasesor@outlook.com."
      },
      closingMessage: {
        title: "Gracias por completar tu Protocolo LA-12: Bitácora de Vuelo",
        subtitle: "Has culminado tu viaje interno. Tienes poder personal de aquí en adelante!"
      }
    }
  ]
};

// Utilidades de acceso rápido
const getProtocoloById = (id) =>
  PROTOCOLOS_DATA.protocolos.find((p) => p.id === id.toUpperCase());

const getProtocoloIndex = () =>
  PROTOCOLOS_DATA.protocolos.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    formUrl: p.formUrl,
    totalQuestions: p.questions.length
  }));

// Exportación (Node/CommonJS y navegador)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PROTOCOLOS_DATA, getProtocoloById, getProtocoloIndex };
}
if (typeof window !== "undefined") {
  window.PROTOCOLOS_DATA = PROTOCOLOS_DATA;
  window.getProtocoloById = getProtocoloById;
  window.getProtocoloIndex = getProtocoloIndex;
}
