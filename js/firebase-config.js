// ============================================================
// FIREBASE CONFIG - Lyon Asesor (VERSIÓN CORREGIDA)
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

// === EXPONER database GLOBALMENTE para todas las páginas ===
window.database = database;

console.log('✅ Firebase configurado correctamente para Lyon Asesor');
console.log('📡 Database URL:', firebaseConfig.databaseURL);

// ============================================================
// FUNCIONES DE UTILIDAD PARA FIREBASE
// ============================================================

/**
 * Guarda un lead en Firebase
 * @param {string} coleccion - 'consultas', 'conferencias', 'ebooks', 'diagnosticos'
 * @param {object} datos - Los datos del formulario
 * @returns {Promise}
 */
function guardarLead(coleccion, datos) {
  const timestamp = Date.now();
  const referencia = database.ref(`leads/${coleccion}/${timestamp}`);
  
  const registro = {
    ...datos,
    timestamp: timestamp,
    fecha: new Date().toISOString(),
    fechaLegible: new Date().toLocaleString('es-ES')
  };
  
  return referencia.set(registro);
}

// === EXPONER guardarLead GLOBALMENTE ===
window.guardarLead = guardarLead;

/**
 * Lee todos los leads de una colección
 * @param {string} coleccion - 'consultas', 'conferencias', 'ebooks', 'diagnosticos'
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
window.leerLeads = leerLeads;

/**
 * Lee TODOS los leads de todas las colecciones
 * @returns {Promise<Object>}
 */
function leerTodosLosLeads() {
  return database.ref('leads').once('value')
    .then(snapshot => {
      const data = snapshot.val();
      if (!data) return { consultas: [], conferencias: [], ebooks: [], diagnosticos: [] };
      
      const resultado = {};
      for (const [coleccion, items] of Object.entries(data)) {
        if (typeof items === 'object' && items !== null) {
          resultado[coleccion] = Object.keys(items).map(key => ({
            id: key,
            ...items[key]
          }));
        } else {
          resultado[coleccion] = [];
        }
      }
      return resultado;
    });
}
window.leerTodosLosLeads = leerTodosLosLeads;

console.log('✅ Funciones de Firebase cargadas para Lyon Asesor');
console.log('✅ window.database disponible globalmente');
