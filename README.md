# asloXP — prototipo de experiencia del visitante

**Abrir portada:** https://xxxaga-dev.github.io/asloxp/?revision=4

Este repositorio **público** es únicamente para maquetas navegables HTML, CSS y JavaScript. La documentación y las decisiones del proyecto ASLO están en un repositorio privado independiente.


## Revisión UX 9 — Recuperación de responsabilidades del organizador (EN ANÁLISIS)

Tras la revisión del propietario, el espacio del organizador deja de reducir la experiencia a Ligas y Torneos. Se recuperó la cobertura documentada a partir de la épica `docs/historias/modo-organizador/README.md`, el recorrido de organizador y las historias transversales del repositorio privado ASLO, **sin convertir las historias en nuevas facultades ni en código productivo**.

**Prototipo:** [Organizador](organizador.html) con navegación por grupos estables: Mi espacio (Inicio, Mis ligas, Torneos), Operación (Agenda y jornadas, Solicitudes y avisos, Jueces y escenarios) y Seguimiento (Resultados, Comunicaciones). Menú móvil completo y búsqueda de tareas (botón «Buscar función» o Ctrl/Cmd+K). El buscador dirige a la selección de la liga o el torneo correspondiente y abre su sección, por ejemplo `?vista=torneos&accion=inscripciones` → torneo → `&tab=inscripciones`.

**Ámbito de liga:** información general, participación/categorías/edad/territorio, reglamentos versionados, administradores y asistentes, noticias y reconocimiento ASLO (exclusivamente consultivo). **Ámbito de torneo:** resumen, equipos/cupos/sustituciones, fases/grupos/cruces, interligas, programación, solicitudes, puestos y designaciones arbitrales, escenarios/franjas, planillas, disciplina, clasificación, premios, noticias, suspensión y cierre. Los contextos tienen su propia navegación agrupada y permiten regresar al organizador.

**Límite honesto:** las operaciones simuladas previamente (por ejemplo crear torneo de muestra, capacidad/reemplazo, clasificación y planilla de muestra) siguen disponibles; múltiples responsabilidades adicionales son **vistas de cobertura en análisis**, señaladas expresamente y **sin** registro/guardado real. No hay motor de verificación, sanciones, arbitraje, franjas, noticias productivas ni cálculos de ranking implementados. No fingir que ver una vista de cobertura equivale a tener una funcionalidad operativa. La interfaz anterior permanece solo como soporte provisional de las acciones existentes.

**Ruta de revisión:** [abrir organizador](https://xxxaga-dev.github.io/asloxp/organizador.html?vista=inicio) → Buscar función → «Reemplazar equipo» → seleccionar un torneo → Inscripciones y cupos. También revisar «Reglamentos y versiones» desde el buscador y «Jueces y escenarios» desde la navegación. Revisar escritorio y móvil antes de aprobar. El enlace de Pages no se certifica desplegado desde esta conexión.

## Revisión UX 8 — Navegación del organizador (EN ANÁLISIS)

La dirección visual de las revisiones anteriores queda **descartada como modelo general de interacción** por observación del propietario: navegación impredecible, exceso de opciones, demasiados clics para localizar un torneo, ausencia de búsqueda/paginación y falta de animaciones funcionales. Los archivos legados permanecen solo para conservar operaciones simuladas mientras se sustituyen las vistas.

**Nuevo punto de entrada:** [Espacio del organizador](organizador.html). Contiene tres destinos estables (Inicio, Mis ligas y Torneos), búsqueda textual, filtros por deporte/liga/estado, paginación, controles de teclado, estados vacíos, transiciones con movimiento reducido y acceso directo al torneo seleccionado. El selector de modos ahora dirige al organizador a este espacio. Se corrigieron los enlaces de retorno desde gestión de ligas y el enlace profundo `liga-admin.html?liga=...&vista=torneos&torneo=...`.

**Para probar:** [abrir organizador](https://xxxaga-dev.github.io/asloxp/organizador.html?vista=inicio) → **Torneos** → buscar «Copa» → seleccionar un resultado → abrir el torneo exacto. Probar paginación (dos elementos por página para mostrar el control en esta demo), filtros y navegación móvil. La página de gestión profunda todavía utiliza una interfaz heredada y queda **pendiente de reestructuración**. Los datos son ficticios y proceden de la sesión de demostración.

## Revisión visual 7 — Xports / Pubzi como referencias de composición (28-10-2026)

**Estado: EN ANÁLISIS, pendiente revisión visual del propietario.** No se ha sustituido la identidad ASLO ni se han copiado recursos de terceros. Se incorporaron `assets/experience-v7.css` y `assets/experience-v7.js` a 13 páginas existentes: inicio/noticias, ligas, liga, torneos, torneo, resultados, acceso, registro, modos, modo, cuenta, mis ligas y administración de liga. La revisión refuerza encabezados editoriales, tarjetas, contrastes, navegación pública contextual, accesibilidad y responsive; conserva intactos las cuentas personales, los roles, los datos de demostración y las rutas. **Ver:** [prototipo](https://xxxaga-dev.github.io/asloxp/?revision=7) (sujeto al despliegue de GitHub Pages).

**Comprobación efectuada:** 13/13 páginas enlazan una sola vez ambos recursos; JavaScript con sintaxis válida; llaves CSS balanceadas. **Pendiente:** revisión real en navegador/móvil y observaciones del propietario; no se certifica el despliegue de Pages.

## Revisión 5 — coherencia entre vistas públicas y navegación móvil

- **Seis rutas públicas con estilo coherente:** [Noticias](index.html), [Ligas](ligas.html), [detalle de liga](liga.html?id=metropolitana), [Torneos](torneos.html), [detalle de torneo](torneo.html?id=apertura), [Resultados](resultados.html).
- **Móvil:** logo ASLO y botón de menú compacto arriba; navegación **Noticias, Ligas, Torneos, Resultados** fija abajo. El menú agrupa deporte, idioma, tema, ubicación de muestra, inicio de sesión/registro o cuenta/cambio de modo/cerrar sesión.
- **Escritorio:** navegación principal visible en la cabecera; selector de deporte y preferencias disponibles.
- Recursos: `assets/visitor-pages.js`, `assets/visitor-nav.js`, `assets/visitor-v5.css`. Portada continúa en `assets/visitor-v4.js` y `assets/visitor-v4.css`.
- Datos, localización, noticias, resultados y ligas **simulados**, no servicios en vivo.

**Probar en móvil:** https://xxxaga-dev.github.io/asloxp/?revision=5

## Referencia aprobada: «Panel deportivo ASLO en tiempo real»

La portada `index.html` refleja la propuesta visual seleccionada por el propietario. Su código nuevo está en `assets/visitor-v4.js` y `assets/visitor-v4.css`.

- **Cabecera:** Noticias primero; Ligas, Torneos, Resultados, selector desplegable de deportes, idioma, tema, inicio de sesión y cuenta personal.
- **Patrocinadores:** carrusel con cuatro tarjetas distintas en escritorio, dos en tableta y una en móvil. Cada tarjeta tiene su propia URL externa. Las marcas son **referencias ficticias para validar diseño**, no acuerdos comerciales ni campañas autorizadas.
- **Noticias:** noticia protagonista con rotación y controles manuales; sección de noticias deportivas con **Ver más**. La selección cambia según deporte y ubicación.
- **Marcadores:** encuentro destacado con rotación automática. Los resultados se priorizan así: en curso primero, o finalizados si no hay en curso, ordenados por proximidad y puntuación de ejemplo de liga. Los datos no son resultados reales.
- **Ubicación:** formulario de selección escalonada País → Región → Ciudad, con muestras de Colombia, México y España; por defecto Soacha como **lugar ficticio de prueba**, no localización real del visitante. El cambio afecta el orden de las noticias, partidos y ligas de demostración.
- **Publicidad:** posiciones visuales diferenciadas en panel derecho y final de página; **sin integración real de Google Ads**.
- **Acceso a ligas y torneos:** conserva rutas públicas ya existentes, que se revisarán en iteraciones específicas.
- **Idiomas:** español, inglés y alemán como lenguas de prueba.
- **Fotos:** referencias fotográficas alojadas por un tercero con URL pública; imágenes definitivas y licencias se abordarán cuando se diseñen recursos propios.

**No incluye:** autenticación verdadera, geolocalización, API de competiciones, ranking calculado, patrocinios contratados, plataforma publicitaria activa o contenido noticioso real. Nunca introducir contraseñas personales en el prototipo.

## Recorrido de revisión

1. Abrir la portada, revisar distribución, imágenes y paneles.
2. Recorrer patrocinadores: flechas y rotación automática; cada tarjeta es un enlace individual que abre una tienda de ejemplo externa.
3. Seleccionar otro deporte desde el menú en la cabecera y revisar cómo cambian noticias y encuentros.
4. Cambiar país, región y ciudad; revisar la reordenación de ejemplos.
5. Revisar noticia protagonista, hacer clic en un artículo y pulsar **Ver más**.
6. Probar en móvil: carrusel de patrocinadores con una sola tarjeta.
7. Continuar hacia Ligas, Torneos y Resultados para señalar correcciones siguientes.

La imagen proporcionada por el propietario es la **referencia UX aprobada**. Las páginas HTML son una implementación de demostración a corregir, no producto final.
