# asloXP — prototipo de experiencia del visitante

**Abrir portada:** https://xxxaga-dev.github.io/asloxp/?revision=4

Este repositorio **público** es únicamente para maquetas navegables HTML, CSS y JavaScript. La documentación y las decisiones del proyecto ASLO están en un repositorio privado independiente.


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
