# Auditoría técnica y comercial — Lyon Asesor

**Fecha:** 10 de octubre de 2026  
**Base revisada:** ZIP `lyonasesor-web-main` proporcionado en la conversación y contraste de la página pública `https://lyonasesor.com/index.html`.

## Criterio de precios aplicado

La lista oficial de consultas se tomó de `index.html`, según la instrucción del propietario:

- Sesión individual: **US$70**
- Pack de 2 sesiones: **US$130**
- Pack de 3 sesiones: **US$180**
- Pack de 5 sesiones: **US$290**

Otros precios de referencia visibles en el inicio:

- Biblioteca digital: **US$9.99**
- Conferencias: **US$10 por persona / US$150 empresarial**
- Membresía Personal: **US$10.99 al mes durante 4 pagos**
- Membresía Empresarial: **US$499 pago único**
- Brújula Emocional y Pausa Lyon: **gratuitas**

## Correcciones aplicadas

1. **Burbujas de chat y precios antiguos de consultas.** Se sustituyeron los importes antiguos US$40 / US$100 / US$150 por los importes oficiales de `index.html` y se incorporó la opción de 2 sesiones cuando faltaba. Se normalizaron los nueve documentos HTML que contienen chat.
2. **Conferencias en chats secundarios.** En los chats de descarga, agradecimiento y diagnóstico se mostraban solo US$150. Ahora se muestran las dos modalidades vigentes: US$150 empresarial y US$10 individual, con sus enlaces de pago existentes.
3. **Recomendaciones del autodiagnóstico.** `diagnostico.html` aún recomendaba planes retirados llamados “Extendido” y “Acelerado”, incluyendo US$24.99/mes. Se alineó con el Plan Personal vigente (US$10.99/mes, cuatro pagos), sin presentar el Plan Empresarial como tratamiento individual.
4. **Medición publicitaria de compra no fiable.** `gracias.html` y `gracias-membresia.html` disparaban eventos Meta `Purchase` al cargar la página, con importes por defecto no verificados; además, enviaban una conversión de Google Ads a un identificador de prueba `AW-XXXXXXXXXX/XXXXXXX`. Se retiraron esos eventos falsos y se dejó una nota técnica. Antes de campañas, `Purchase` debe dispararse solo desde una confirmación verificable del pago y con el importe real.
5. **Metadatos de imagen social.** Se reemplazaron referencias a `social-preview.jpg`, archivo que no estaba en el repositorio, por `og-image.png`, que sí existe.
6. **Icono PWA inexistente.** Se eliminó la referencia a `icon-maskable-512.png` en los manifiestos y en la lista de precarga del service worker porque el archivo no estaba en el repositorio.

## Pruebas estáticas realizadas

- Se revisaron los enlaces y recursos locales de las páginas HTML; tras corregir las referencias inexistentes, **no quedan referencias locales rotas** en las páginas revisadas.
- Se analizaron los scripts JavaScript inline: **79 bloques comprobados, 0 errores de sintaxis**.
- Se verificó que las constantes de enlaces PayPal usadas por los chats estén declaradas.
- Se revisaron IDs HTML duplicados: no se detectaron.
- Se verificaron las referencias a precios antiguos de consultas, el precio antiguo de US$24.99/mes y el identificador de conversión de Google Ads de prueba: no quedan apariciones activas en las páginas/scripts revisados.

## Pendientes que no deben darse por validados solo con el código

1. **PayPal:** los identificadores de los botones se conservaron para no alterar los productos de pago ya configurados. Hay que entrar a PayPal y confirmar que cada enlace cobra realmente el importe correspondiente: US$70, US$130, US$180, US$290; biblioteca US$9.99; conferencia US$10/US$150; membresía US$10.99/US$499. El código por sí solo no permite confirmar el importe configurado dentro de PayPal.
2. **Firebase:** no se modificaron autenticación, reglas de base de datos, altas de miembros, desbloqueo de clases ni permisos administrativos. Deben probarse con cuentas de prueba y revisar las reglas de seguridad directamente en Firebase.
3. **Flujos de retorno y entrega:** ejecutar compras de prueba y comprobar las páginas `gracias.html` y `gracias-membresia.html`, asignación de códigos, entrega de productos y mensajes de WhatsApp.
4. **Publicidad:** configurar el ID real de Google Ads y la medición de compra confirmada antes de invertir. Un simple acceso a una página de agradecimiento no prueba que el pago se haya completado.
5. **Pruebas de navegador:** la revisión de este paquete fue estática. No se puede certificar desde el ZIP la disponibilidad en vivo de servicios externos, el comportamiento real de PayPal, Firebase, correo o WhatsApp, ni el rendimiento en dispositivos/navegadores concretos.

## Recomendación de despliegue

Subir el contenido corregido del repositorio completo a una rama de revisión o entorno de pruebas, verificar los flujos anteriores y solo después publicar en producción. Mantener intactas las funciones de Firebase y los archivos de administración durante las pruebas. El diseño y los estilos existentes se conservaron; los cambios se concentraron en precios, opciones de pago, metadatos y medición no fiable.
