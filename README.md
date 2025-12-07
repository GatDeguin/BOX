# BOX

## Requisitos previos
- Node.js 18+ y npm (solo necesarios para trabajar con el bundle de BOX9).

## Entradas disponibles
- `index.html`: hub principal con tarjetas hacia todas las escenas y demos.
- `menu.html`: juego principal BOX9 (travelling ringside) que carga el bundle compilado de `public/box9.js`.
- `bolsa.html`: Gym Box 8 (POV + pose + loops de saco, sustituto del antiguo sacobox8).
- `gim1.html`, `gim2.html`, `gim3.html`, `gim4.html`: variaciones de ring para MMA (Box 10), Bodybuilder (Box 11), Tyson POV (Box 12) y bolsa introductoria (Box 13).
- `Mocap.html`, `ring.html`: escena de mocap y recorrido POV en Three.js.

## Cómo servir el proyecto
La mayoría de las escenas son HTML estáticos. Basta con servir la raíz del proyecto con tu servidor favorito (por ejemplo `npx http-server .`) y abrir `index.html`.

### Construir y ejecutar BOX9
1. Instala dependencias:
   ```bash
   npm install
   ```
2. Genera el bundle de BOX9 (salida en `public/box9.js`):
   ```bash
   npm run build
   ```
3. Sirve la carpeta del proyecto y abre `menu.html` desde el navegador.

### Desarrollo de BOX9
- `npm run dev` levanta el servidor de Vite para trabajar en caliente sobre `src/box9`.
- `npm run preview` sirve la carpeta de salida (`public/`) tras ejecutar un build.
