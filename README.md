# Torrent Pharma LATAM · Hoja de ruta de actividades

Tablero web que reúne en una sola interfaz los procesos, el calendario, los reportes y los
compromisos de la operación de **Torrent Pharma Chile SpA (sociedad T303, planta E303)**,
a partir de los documentos de la carpeta `Documentos / Claude / App Torrent Latam`.

## Cómo abrirlo

No necesita instalación, servidor ni conexión a internet.

**Abrir `index.html` con doble clic.** Funciona en Chrome, Edge, Firefox y Safari.

Para compartirlo con el equipo basta con copiar la carpeta completa (o subirla a SharePoint /
OneDrive y abrir el `index.html` desde ahí). No hay compilación, dependencias ni proceso de build.

## Qué contiene

| Sección | Qué muestra |
|---|---|
| **Resumen** | Indicadores del avance global, avance por fase, carga por responsable y la lectura principal del proceso. |
| **Archivos** | Las seis fuentes de la carpeta, qué aporta cada una y un salto directo a la sección que la consume. |
| **Actores y sistemas** | Los seis grupos de actores, sus personas clave, sus sistemas y la arquitectura de información en tres capas. |
| **Procesos y fases** | Las 27 actividades del ciclo mensual repartidas en 5 fases, con responsable, input, output y estado. |
| **Calendario** | El ciclo semanal (8 hitos) y el ciclo de cierre mensual propuesto de D-3 a D+10 (14 hitos). |
| **Catálogo de reportes** | Los 16 entregables que sostienen el proceso, con emisor, receptor, frecuencia, sistema y estado. |
| **Matriz RACI** | 14 actividades × 5 actores. |
| **Timeline** | 9 hitos construidos con evidencia, 5 frentes en curso y 5 bloques sin iniciar. |
| **Riesgos y controles** | 8 riesgos estructurales, cada uno con su control propuesto y su dueño. |
| **Próximos pasos** | Las 9 acciones ordenadas por dependencia, más las preguntas abiertas a Forvis Mazars y Pharma ISA. |
| **Minuta y compromisos** | Los 12 compromisos del 23 de julio y los 10 temas contables tratados. |
| **Sistema de diseño** | Los tokens, la tipografía y los componentes tomados de `DISENO.md`. |
| **Glosario** | Los 13 términos del Anexo B. |

## Cómo se usa

- **Filtrar por estado** — los tres botones *Operando · En definición · Pendiente* se combinan entre
  sí. Sirven para aislar de un vistazo qué falta y quién lo debe.
- **Buscar** — el buscador ignora acentos: `conciliacion` encuentra «Conciliación».
- **Pulsar cualquier tarjeta o fila** — se abre un panel lateral con el detalle completo: el input
  que necesita, el output que entrega y por qué importa. Se cierra con `Esc` o con la ×.
- **Enlaces directos** — cada sección tiene su propia dirección (`index.html#reportes`,
  `#calendario`, `#riesgos`…), así que se puede enviar por correo un enlace a una sección concreta.
- **Imprimir** — el botón del pie imprime todas las secciones, una por página, sin la navegación.

## Escala de estado

Es la del documento fuente (§2.2 del PDF de proceso):

| | |
|---|---|
| 🟢 **Operando** | El entregable ya se produjo al menos una vez, con evidencia documental. |
| 🟠 **En definición** | Acordado o en discusión, pero todavía sin un entregable estable. |
| ⚪ **Pendiente** | No ha empezado. |

## Fuentes

Todo el contenido está transcrito de:

- `2026.08.06_TORRENT CHILE_Proceso O2C y Cierre Contable_v1.pdf` — 19 páginas, v1.0, 6-ago-2026
- `Minuta_Alineamiento_Cierre_Mazars_Torrent.docx` — reunión del 23-jul-2026
- `DISENO.md` — sistema de diseño, 21-ago-2026
- `Fig1` / `Fig2` / `Fig3` `.png` — arquitectura, mapa de proceso y timeline

No se añadió ningún dato que no esté en esos archivos. Donde el tablero fija un valor que las
fuentes dejan abierto, queda anotado en el propio código y en la sección «Sistema de diseño».

## Advertencias que el tablero conserva

Están en la interfaz porque están en el documento fuente, y son importantes al circularlo:

1. **Los días D del ciclo de cierre son una propuesta de Torrent Finanzas LATAM.** No han sido
   confirmados por Forvis Mazars ni por Pharma ISA. La cadencia semanal (viernes / lunes / martes)
   sí surge del acuerdo del 6 de agosto de 2026 y está en implementación.
2. **El formato de los reportes está por validar.** Hasta recibir la muestra solicitada a Forvis
   Mazars, las columnas mínimas son un requerimiento, no una descripción de lo existente.
3. **El proceso de cobranza no está definido.**
4. **Los estados de color son a la fecha del documento** (6 de agosto de 2026).

## Discrepancia detectada en el documento fuente

El párrafo introductorio del §8 del PDF dice que del catálogo de reportes «nueve ya se producen […];
cuatro están acordados […]; y tres no han empezado» (9 + 4 + 3), pero **la tabla del mismo §8
clasifica 8 operando, 4 en definición y 4 pendientes**. El tablero usa la tabla, que es el dato a
nivel de fila, y lo señala en la sección de reportes. Los dos reportes en discusión son el nº 8
(inventario y despachos de la semana) y el nº 9 (closing stock valorizado); ambos dependen de CISAT.
**Conviene corregir ese párrafo antes de circular el PDF.**

## Estructura

```
index.html              La aplicación. Se abre con doble clic.
assets/css/tokens.css   Tokens de diseño de DISENO.md §8 traducidos a CSS.
assets/css/app.css      Componentes: panel, KPI, insight, tabla, estados.
assets/js/data.js       Todo el contenido, transcrito de los documentos.
assets/js/app.js        Navegación, filtros y panel de detalle.
docs/DECISIONES.md      Qué se decidió al llevar los documentos a la interfaz.
```

Para **actualizar el contenido** no hace falta tocar la interfaz: todo vive en `assets/js/data.js`,
en tablas legibles. Cambiar un `estado: 'pendiente'` por `estado: 'operando'` actualiza los
indicadores, las barras de avance y los filtros de todo el tablero.

## Tipografía

La aplicación pide **Manrope** a Google Fonts, la tipografía institucional según `DISENO.md` §1.1.
Si la red corporativa bloquea Google Fonts, cae en la pila de respaldo (`Segoe UI` en Windows) sin
romper la maquetación. Si se prefiere no depender de la red, se puede descargar Manrope y servirla
desde la propia carpeta; está indicado en `docs/DECISIONES.md`.
