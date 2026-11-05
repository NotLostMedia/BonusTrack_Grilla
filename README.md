# Bonus Track · Grilla

Sitio estático (HTML + CSS + JS, sin dependencias ni build).

## Estructura
- `index.html`: landing
- `matilda.html`, `articulo-19.html`, `vera.html`, `no-fitness.html`: historias
- `styles.css`, `script.js`, `assets/`

## Cargar los videos
En cada página de historia buscá `data-youtube=""` y poné el ID del video
(en `youtube.com/watch?v=ABC123` el ID es `ABC123`). Mientras esté vacío se muestra "Video próximamente".

## Subir a GitHub y publicar con GitHub Pages
1. Creá un repositorio nuevo en github.com (por ejemplo `bonus-track`).
2. Subí **el contenido** de esta carpeta (que `index.html` quede en la raíz del repo).
   Desde la web: *Add file → Upload files*, arrastrá todo y *Commit changes*.
3. Entrá a *Settings → Pages*. En *Source* elegí *Deploy from a branch*, rama `main`, carpeta `/ (root)` y guardá.
4. Esperá un par de minutos: el sitio queda en `https://TU-USUARIO.github.io/bonus-track/`.

## Pendientes
- Links de Google Play y App Store (en `index.html`, buscá `href="#"`).
- Link de inscripción de Grilla Lab.
