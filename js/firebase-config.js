// ============================================================
// FIREBASE CONFIG - Lyon Asesor
// ============================================================

// Configuración de Firebase (proyecto: lyon-asesor-panel-259ef)
const firebaseConfig = {
  apiKey: "AIzaSyCNjzY-wmcoHC69woTEGqU5oG9mepfBBxY",
  authDomain: "lyon-asesor-panel-259ef.firebaseapp.com",
  databaseURL: "https://lyon-asesor-panel-259ef-default-rtdb.firebaseio.com",
  projectId: "lyon-asesor-panel-259ef",
  storageBucket: "lyon-asesor-panel-259ef.firebasestorage.app",
  messagingSenderId: "231529684761",
  appId: "1:231529684761:web:e74ced418b3f89c9036f88"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

console.log('✅ Firebase configurado correctamente para Lyon Asesor');

// ============================================================
// FUNCIONES DE UTILIDAD PARA FIREBASE
// ============================================================

/**
 * Guarda un lead en Firebase
 * @param {string} coleccion - 'consultas', 'conferencias', 'ebooks', 'diagnosticos', 'leads'
 * @param {object} datos - Los datos del formulario
 * @returns {Promise}
 */
function guardarLead(coleccion, datos) {
  const timestamp = Date.now();
  const referencia = database.ref(`leads/${coleccion}/${timestamp}`);
  
  // Agregar timestamp y fecha legible
  const registro = {
    ...datos,
    timestamp: timestamp,
    fecha: new Date().toISOString(),
    fechaLegible: new Date().toLocaleString('es-ES')
  };
  
  return referencia.set(registro);
}

/**
 * Lee todos los leads de una colección
 * @param {string} coleccion - 'consultas', 'conferencias', 'ebooks', 'diagnosticos', 'leads'
 * @returns {Promise<Array>}
 */
function leerLeads(coleccion) {
  return database.ref(`leads/${coleccion}`).once('value')
    .then(snapshot => {
      const data = snapshot.val();
      if (!data) return [];
      return Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
    });
}

/**
 * Lee TODOS los leads de todas las colecciones
 * @returns {Promise<Object>}
 */
function leerTodosLosLeads() {
  return database.ref('leads').once('value')
    .then(snapshot => {
      const data = snapshot.val();
      if (!data) return { consultas: [], conferencias: [], ebooks: [], diagnosticos: [], leads: [] };
      
      const resultado = {};
      for (const [coleccion, items] of Object.entries(data)) {
        resultado[coleccion] = Object.keys(items).map(key => ({
          id: key,
          ...items[key]
        }));
      }
      return resultado;
    });
}

/**
 * Actualiza el estado de un lead
 * @param {string} coleccion 
 * @param {string} id 
 * @param {string} estado - 'pendiente', 'pagado', 'contactado', 'cerrado'
 */
function actualizarEstadoLead(coleccion, id, estado) {
  return database.ref(`leads/${coleccion}/${id}/estado`).set(estado);
}

/**
 * Marca un lead como pagado
 * @param {string} coleccion 
 * @param {string} id 
 * @param {boolean} pagado 
 */
function marcarPagado(coleccion, id, pagado) {
  return database.ref(`leads/${coleccion}/${id}/pagado`).set(pagado);
}

console.log('✅ Funciones de Firebase cargadas para Lyon Asesor');
