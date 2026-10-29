# ASLO — Estándar de layout y navegación por modo

**Estado: APROBADO — estándar visual y de navegación de ASLO para todos los modos (29 de octubre de 2026).** El propietario aprobó el layout y los menús del Organizador, en escritorio y móvil, incluida la alineación final del buscador. La aprobación corresponde a la experiencia visual común: no aprueba requisitos deportivos nuevos ni declara funcionalidades productivas. La decisión principal también está registrada en el repositorio privado `xxxaga-dev/ASLO`, en `docs/ux/estandar-visual-y-navegacion.md`.

## Contrato común (sin dependencia del modo)

- **Encabezado:** logotipo ASLO, nombre del espacio activo, buscador si ese modo tiene un buscador funcional, aviso de datos de muestra cuando corresponda y **menú de cuenta siempre a la derecha**. La cuenta muestra nombre, avatar/foto y **modo activo**, sin otra cuenta ni contraseña por liga, equipo o institución.
- **Menú de cuenta:** perfil/avatar, apariencia, seguridad, modos disponibles, idioma, tema y cerrar sesión. Si **no hay sesión**, muestra Visitante, ingreso y vínculos personales que remiten al acceso; nunca simula un cierre de sesión inexistente. Idioma/tema siguen siendo preferencias globales; el mismo avatar corresponde a la cuenta, no al modo.
- **Menú lateral (escritorio):** responsabilidades del modo actual, agrupadas por tareas. Cambiar modo o administrar la cuenta **no** son tareas del modo.
- **Barra inferior (móvil):** máximo tres accesos directos frecuentes del modo + **Más**. Cada opción dispone de icono y texto **centrados**, en elementos separados. Las etiquetas largas se usan en el panel Más, no se fuerzan en la barra.
- **Panel Más:** acceso a todas las responsabilidades del modo actual; no es la configuración de la cuenta. Respeta el estado activo, el foco de teclado y Escape.
- **Cuerpo:** navegación y operaciones propias del modo. Contextos de liga, torneo, encuentro, equipo, arbitraje, etc., conservan sus restricciones y no elevan autoridad por estar dentro del layout común.
- **Sistema visual:** tipografía, color, jerarquía, espaciados, responsive, tarjetas, paneles, transiciones y reducciones de movimiento se reutilizan; no deben surgir «subproductos» con cabeceras contradictorias. Se conserva accesibilidad de foco, `prefers-reduced-motion` y contraste.

## Implementación y puntos de extensión

- `assets/aslo-shell.js`: `window.asloShell.mount({host,modeId,title,brandHref,groups,bottom,search,bodyId,...})`. El modo aporta únicamente sus grupos de navegación, accesos preferidos y contenido. No implementa permisos ni lógica deportiva.
- `assets/aslo-shell.css`: reglas responsive y proporciones comunes de encabezado, barra inferior y espacios de trabajo.
- `assets/organizer-account.js` + `assets/organizer-account.css`: control de cuenta común montado en `#aslo-account-slot`; reutiliza `asloAuth` para cuenta, avatar, idioma y apariencia.
- `assets/organizer-shell-init.js`: configuración del modo organizador; `organizador.html` monta ese shell antes de cargar `organizer-workspace.js`.
- `modo.html` + `assets/auth-v2.js`: los otros modos registrados utilizan el mismo shell con los temas ya declarados por sus roles. **Su contenido continúa siendo provisional**, sin inventar operaciones no implementadas.
- `liga-admin.html`: pantalla contextual que conserva operaciones existentes y utiliza el mismo menú personal, colores y criterios de navegación móvil. **Su contenedor antiguo aún no se ha migrado íntegramente a `aslo-shell.mount`**; queda como deuda visual/estructural de este prototipo.
- `assets/motion-xp10.js/css`: transiciones compartidas; no condicionan permisos ni datos.

## Reglas para próximas pantallas

No crear una nueva cabecera, avatar, menú de cuenta, barra inferior o panel Más por cada modo. Configurar opciones de modo y vistas sobre el shell existente. Si el modo no tiene contenido funcional aprobado/implementado, mostrar explícitamente la cobertura pendiente; no inventar flujos. Respetar las fuentes documentales del proyecto privado ASLO y validar con el propietario cualquier cambio importante.

## Variante de visitante / consulta pública

**Regla declarada por el propietario:** el visitante también utiliza el layout estándar, pero no requiere sesión de usuario y solo puede navegar información pública. No hay cuenta, roles ni contraseñas de visitante; iniciar sesión se ofrece desde el menú personal, no para desbloquear la consulta.

El prototipo público reutiliza el mismo shell mediante `assets/visitor-shell.js` y `assets/visitor-shell.css`, con contenidos existentes de noticias, ligas, torneos y resultados y sus detalles en `index.html`, `ligas.html`, `torneos.html`, `resultados.html`, `liga.html` y `torneo.html`. La navegación inferior de referencia muestra Inicio, Torneos, Resultados y Más; Ligas queda visible en el lateral y dentro de Más. Deporte y ubicación de demostración se seleccionan desde Más sin geolocalización ni acceso. **Estas opciones concretas de menú están EN ANÁLISIS hasta revisión del propietario**, aunque el layout compartido ya está aprobado.

Si una persona con cuenta abre contenido público, este sigue siendo público y no cambian sus permisos ni su sesión. Los datos mostrados siguen siendo ficticios y no implican publicaciones oficiales.

## Verificaciones y migración aún pendientes (no revierten la aprobación visual)

Revisión visual real en navegadores y dispositivos, especialmente anchuras de 320 a 430 px, cuentas con nombre largo, orientación horizontal, foco/teclado, desplazamiento con paneles abiertos, idiomas y comportamiento de retroceso. Las pruebas de código y de renderizado lógico no sustituyen esa validación.

