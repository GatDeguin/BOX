# BOX

## Requisitos previos
- Node.js 18+ y npm

## Construir y servir BOX9
1. Instala dependencias:
   ```bash
   npm install
   ```
2. Genera el bundle de BOX9 (salida en `public/box9.js`):
   ```bash
   npm run build
   ```
3. Sirve la carpeta del proyecto con tu servidor estático preferido (por ejemplo, `npx http-server .`) y abre `box9.html` en el navegador.

### Desarrollo
- `npm run dev` levanta el servidor de Vite para trabajar en caliente sobre `src/box9`.
- `npm run preview` sirve la carpeta de salida (`public/`) tras ejecutar un build.
