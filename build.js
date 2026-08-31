#!/usr/bin/env node
/* ============================================================
   Empaqueta el tablero en un único archivo HTML autocontenido.
   Incrusta el CSS, el JavaScript y las cuatro figuras como
   data URI, de modo que el resultado se pueda enviar por correo,
   subir a SharePoint o publicar sin llevar la carpeta detrás.

   Uso:  node build.js  →  dist/hoja-de-ruta-torrent-chile.html
   ============================================================ */

const fs = require('fs');
const path = require('path');

const R = __dirname;
const read = (p) => fs.readFileSync(path.join(R, p), 'utf8');

const IMGS = [
  'assets/img/fig1-arquitectura-informacion-en.png',
  'assets/img/fig2-mapa-proceso-o2c-en.png',
  'assets/img/fig3-timeline-construccion-es.png',
  'assets/img/fig3-timeline-construccion-en.png'
];

/* Las figuras, como data URI */
const dataUri = {};
for (const p of IMGS) {
  const b64 = fs.readFileSync(path.join(R, p)).toString('base64');
  dataUri[p] = `data:image/png;base64,${b64}`;
}

const css  = read('assets/css/tokens.css') + '\n' + read('assets/css/app.css');
let   data = read('assets/js/data.js');
const app  = read('assets/js/app.js');

/* Sustituir las rutas de imagen por su data URI dentro de data.js */
for (const p of IMGS) {
  const antes = data.length;
  data = data.split(`'${p}'`).join(`'${dataUri[p]}'`);
  if (data.length === antes) throw new Error(`No se sustituyó la ruta ${p} en data.js`);
}

/* Tomar el cuerpo del index.html, sin las etiquetas de documento */
const html = read('index.html');
const cuerpo = html.slice(html.indexOf('<body>') + 6, html.lastIndexOf('</body>'))
  .replace(/<script src="assets\/js\/[^"]+"><\/script>\s*/g, '')
  .trim();

const titulo = 'Hoja de Ruta Torrent Chile';

const salida = `<title>${titulo}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
${css}
</style>

${cuerpo}

<script>
${data}
${app}
</script>
`;

fs.mkdirSync(path.join(R, 'dist'), { recursive: true });
const destino = path.join(R, 'dist', 'hoja-de-ruta-torrent-chile.html');
fs.writeFileSync(destino, salida);

const mb = (Buffer.byteLength(salida) / 1024 / 1024).toFixed(2);
console.log(`✓ dist/hoja-de-ruta-torrent-chile.html — ${mb} MB`);
console.log(`  ${IMGS.length} figuras incrustadas, CSS y JS en línea`);
