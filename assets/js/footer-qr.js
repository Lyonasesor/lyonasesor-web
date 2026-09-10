/**
 * footer-qr.js — Inyección dinámica del footer de Lyon Asesor
 * 
 * Reemplaza el footer estático de cada página por una versión
 * idéntica pero con el código QR del RIF integrado (cumplimiento SENIAT).
 * 
 * Uso: Incluir este script antes de </body> en cualquier página HTML.
 * Fecha de creación: 2026
 * Autor: Lyon Asesor
 */

(function() {
    'use strict';

    // Esperar a que el DOM esté completamente cargado
    function init() {
        // Buscar el footer principal en la página
        var existingFooter = document.querySelector('footer.footer');
        
        // Si la página no tiene footer público, no hacer nada
        if (!existingFooter) {
            console.log('[footer-qr.js] Esta página no tiene footer público. No se aplica el cambio.');
            return;
        }

        // Plantilla HTML del footer con el QR integrado
        var footerHTML = 
            '<div class="footer-inner">' +
                '<div class="footer-grid">' +
                    '<div class="footer-brand">' +
                        '<h3>LYON<span>ASESOR</span></h3>' +
                        '<p>Psicoterapia online · Desarrollo Personal · Educación Emocional para hispanohablantes en todo el mundo.</p>' +
                        '<div class="footer-social">' +
                            '<a href="https://www.youtube.com/@LyonAsesor" target="_blank" class="footer-youtube" aria-label="YouTube">' +
                                '<svg viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>' +
                                'Suscríbete a nuestro canal de YouTube' +
                            '</a>' +
                            '<span class="footer-youtube-text">Clases, análisis y contenido exclusivo para tu desarrollo personal.</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="footer-col">' +
                        '<h4>Servicios</h4>' +
                        '<ul>' +
                            '<li><a href="consulta.html" style="font-weight:700; color:var(--naranja);">🌟 Proceso Terapéutico</a></li>' +
                            '<li><a href="conferencia.html">Conferencias</a></li>' +
                            '<li><a href="ebook.html">Biblioteca Lyon Asesor</a></li>' +
                            '<li><a href="diagnostico.html">Brújula Emocional</a></li>' +
                            '<li><a href="membresia.html">Membresía</a></li>' +
                        '</ul>' +
                    '</div>' +
                    '<div class="footer-col">' +
                        '<h4>Contacto</h4>' +
                        '<ul>' +
                            '<li><a href="mailto:info@lyonasesor.com">info@lyonasesor.com</a></li>' +
                            '<li><a href="https://www.youtube.com/@LyonAsesor" target="_blank">YouTube</a></li>' +
                            '<li><a href="https://whatsapp.com/channel/0029Vb7WVr30G0XnA5K3sg32" target="_blank">Canal de WhatsApp</a></li>' +
                            '<li><a href="legal.html">Información Legal</a></li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
                '<div class="footer-bottom">' +
                    '<p>&copy; 2026 Lyon Asesor™. Todos los derechos reservados.</p>' +
                    '<p class="footer-legal">' +
                        'Prof. Mtr. Álvaro Lyon · CI V-17.***.**5 · ' +
                        '<a href="https://declaraciones.seniat.gob.ve/" target="_blank" rel="noopener" style="display:inline-flex; align-items:center; gap:6px; color:inherit; text-decoration:none; vertical-align:middle; margin-left:4px;">' +
                            '<img src="/assets/img/qr-rif.png" alt="Escanear para verificar RIF en el SENIAT" style="width:22px; height:22px; vertical-align:middle; border-radius:3px; background:#fff; padding:1px; border:1px solid rgba(255,255,255,0.2);" loading="lazy">' +
                            '<span>RIF V-1763***5-6</span>' +
                        '</a>' +
                    '</p>' +
                '</div>' +
            '</div>';

        // Reemplazar el contenido del footer preservando la etiqueta <footer> exterior
        existingFooter.innerHTML = footerHTML;

        console.log('[footer-qr.js] Footer actualizado con QR del RIF correctamente.');
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // El DOM ya está cargado (script cargado tarde)
        init();
    }

    // Ejecutar también si el script se carga dinámicamente después de la carga completa
    window.addEventListener('load', function() {
        // Verificación secundaria: si el footer aún tiene el texto sin QR, re-aplicar
        var footerLegal = document.querySelector('.footer-legal');
        if (footerLegal && footerLegal.innerHTML.indexOf('qr-rif.png') === -1) {
            init();
        }
    });

})();
