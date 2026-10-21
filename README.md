# asloXP — Prototipo UX público

Sitio: https://xxxaga-dev.github.io/asloxp/?revision=3

Este repositorio aloja solamente las pruebas de experiencia en HTML/CSS/JS y datos ficticios. La documentación de producto y las decisiones de ASLO siguen privadas.

## Iteración actual: acceso visitante como universo multideporte

La **entrada principal ha sido rediseñada**, no solo recoloreada:

- Escena de selección de disciplina que ocupa el ancho disponible y reacciona visualmente a la elección.
- Fútbol abre la experiencia demostrativa operativa de **ligas → torneos → partidos → clasificaciones**.
- Baloncesto, voleibol, atletismo, ciclismo y tenis son **ejemplos conceptuales de otras disciplinas**. Su presencia NO significa que estén aprobados o previstos para el lanzamiento; no se simulan ligas ni resultados inexistentes.
- El selector persiste durante la pestaña de demostración y también aparece en «Explorar ligas».
- Marcadores ficticios, carrusel y panel de resultados/próximos partidos cuando se elige fútbol.
- El sonido original sintetizado pasó a un control pequeño en la esquina inferior; está **apagado inicialmente**, requiere un clic y se puede silenciar.
- Español, inglés y alemán para probar la experiencia; admite movimiento reducido, y temas claro/oscuro.

El diseño anterior de la arena permanece en GitHub como historial, pero los cuatro HTML públicos cargan `assets/universe.css` y la versión renovada de `assets/arena.js` mediante una revisión de URL para evitar mostrar archivos cacheados.

La sesión, registro, menú de cuenta y pantallas de otros modos siguen siendo **simulaciones anteriores**, fuera de esta revisión. No hay autenticación real, backend, datos deportivos reales, traducción profesional completa ni reglas oficiales implementadas.

**Revisión:** abrir la portada, elegir una disciplina no futbolística, comprobar cómo cambia la escena y luego explorar fútbol y sus ligas. El propietario indicará qué corregir antes de ampliar el alcance.
