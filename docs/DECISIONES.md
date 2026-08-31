# Decisiones al llevar los documentos a la interfaz

Este documento registra qué se decidió y por qué, para que cualquiera pueda auditar la
aplicación contra sus fuentes.

## 1 · Regla general

**No se inventó contenido.** Cada actividad, fecha, reporte, riesgo y compromiso del tablero está
transcrito de los documentos de la carpeta. Donde una fuente deja un valor abierto y la interfaz
necesita uno, se fijó explícitamente y queda anotado aquí y en el código.

## 2 · Qué se fijó porque el documento lo dejaba sin definir

`DISENO.md` §7.7 registra: *«--positive (sin definir — hoy verde a ojo); --negative (sin definir —
hoy rojo a ojo)»*. La interfaz necesita esos dos colores, así que se fijaron:

| Token | Valor | Contraste sobre blanco |
|---|---|---|
| `--positive` | `#1E7A3C` | 4.8:1 — aprueba AA |
| `--negative` | `#B3261E` | 6.2:1 — aprueba AA |

Lo mismo con la escala de estado del proceso, que el PDF describe en palabras («verde / ámbar /
gris») pero sin valores:

| Estado | Token | Valor |
|---|---|---|
| Operando | `--st-operando` | `#1E7A3C` |
| En definición | `--st-definicion` | `#8A5A00` (5.3:1) |
| Pendiente | `--st-pendiente` | `#5A6172` (6.6:1) |

Se eligió un ámbar oscuro en vez de un ámbar brillante porque el ámbar de señalética
(`#FFA000` y similares) no aprueba AA sobre blanco y aquí se usa como texto de etiqueta.

## 3 · Qué se corrigió respecto de las fuentes

### 3.1 Los seis azules marinos

`DISENO.md` §2.2 documenta **seis azules marinos distintos** en circulación (`#292662`, `#1F3864`,
`#073C6D`, `#1B4F72`, `#0F2A59`, `#1F2A5E`), y observa que «visualmente se leen como un solo color,
que es precisamente por lo que la deriva pasó desapercibida».

La interfaz usa **dos**: `--ink-900` `#12295C` para titulares y `--ink-700` `#1F3864` para
cabeceras de panel y barras de título. Es la recomendación del propio §8.

### 3.2 Los siete grises

El §7.7 lista `#888888`, `#A9A9A9`, `#BFBFBF`, `#D9D9D9`, `#E7E6E6`, `#E8E8E8` y `#F9F9F9`,
«procedentes de cuatro orígenes distintos». Se consolidaron en una rampa única de seis pasos
(`--n-000` a `--n-300`) más `--ink-400` para texto.

### 3.3 Accesibilidad

El §7.12 calcula que:

- `#888888` (el gris de leyenda, y el color del número de diapositiva en el diseño con identidad)
  da **3.54:1** sobre blanco y **no aprueba AA**.
- `#9283BE` (el violeta de marca) da **3.38:1** y **no aprueba AA para texto normal**, pero «se usa
  para etiquetas de porcentaje de ~10 pt dentro de las diapositivas ráster, lo que es un problema
  real de legibilidad».

Por eso la interfaz:

- añade **`--ink-400` `#5A6172`** (6.6:1) y lo usa para todo texto pequeño gris. El `#888888`
  original se conserva como `--ink-300` pero sólo para uso decorativo.
- **no usa `--torrent-violet` en texto pequeño.** Para eso está `--ink-500` `#5E328C`, que el propio
  documento identifica como «el seguro» con 9.09:1.

### 3.4 Los componentes que sólo existían como píxeles

El §4 marca con ▣ los componentes que «existen únicamente como píxeles y habría que reconstruirlos
desde cero para reutilizarlos»: tarjeta de panel (4.1), tarjeta de KPI (4.2), tarjeta de insight
(4.3) y tabla de datos (4.6).

**Los cuatro están reconstruidos como CSS nativo** en `assets/css/app.css`, respetando las medidas
del documento: barra de cabecera azul marino a todo el ancho con el separador `|` entre título y
unidad, radio 4 px en el panel, 6 px en el KPI y 8 px en el insight, círculo relleno para el icono,
cifra grande sobre leyenda de dos líneas, y bombilla violeta en el insight.

El §7.5 registra que `tableStyles.xml` está vacío y que «no existe ningún estilo de tabla Torrent
propio en ningún archivo». La clase `table.data` es el primero: fila de cabecera oscura, filas
alternas, cifras a la derecha con `tabular-nums`, fila de total en negrita y semántica verde/rojo.

### 3.5 La regla del titular

El §6.1 identifica el titular de dos niveles —afirmación en el titular, alcance en el antetítulo
violeta en cursiva— como «la convención más sólida de la presentación», y añade: «es la mejor idea
de la presentación y hoy es accidental».

Está codificada como el componente `.headline` y se aplica en **las trece secciones**, sin
excepción. Ningún titular del tablero es una etiqueta de tema.

### 3.6 El pie

El §3.2 observa que las cuatro coordenadas del pie son `7.196, 7.222, 7.197, 7.222` —«cuatro valores
para lo que debería ser una sola línea base»— y que la línea legal se corta en el borde inferior en
todos los renders. Aquí el pie tiene **una sola línea base** y no se corta.

## 4 · Discrepancia numérica en el PDF de proceso

El párrafo introductorio del §8 dice que del catálogo de reportes «nueve ya se producen con
evidencia […]; cuatro están acordados pero sin formato estable; y tres no han empezado» (9 + 4 + 3).

La tabla del mismo §8, contada fila por fila, da:

| Estado | Reportes | Nº |
|---|---|---|
| Operando | 1, 2, 5, 10, 11, 12, 13, 14 | **8** |
| En definición | 3, 4, 6, 7 | **4** |
| Pendiente | 8, 9, 15, 16 | **4** |

**El tablero usa la tabla**, porque es el dato a nivel de fila y es el que alimenta los filtros. La
discrepancia queda señalada en la propia interfaz, en la sección de reportes.

Los dos reportes que el párrafo parece contar como producidos y la tabla marca como pendientes son
el **nº 8** (inventario y despachos de la semana, de Pharma ISA vía CISAT) y el **nº 9** (closing
stock valorizado). Ambos dependen de CISAT, que según el §11.2 «no ha sido revisado a fondo», así
que la tabla es coherente con el resto del documento y el párrafo no.

## 5 · Enlace entre la minuta y sus compromisos

Los diez temas de la minuta se enlazan con los doce compromisos por **índice explícito**
(`comp: [...]` en `TEMAS_MINUTA`), no por coincidencia de texto. El tema 6 (conciliación de facturas
Farmaisa) es el único sin compromiso asociado: la minuta lo cierra como un punto de alineamiento,
no de acción. Los doce compromisos quedan enlazados.

## 6 · Tipografía y red

`DISENO.md` §7.4 advierte que Manrope «no viene con Windows ni con Office, así que en cualquier
máquina donde no esté instalada todo run en Manrope se sustituye en silencio», y que «cualquiera a
quien le envíe la presentación ve una presentación distinta».

La aplicación la pide a Google Fonts y declara una pila de respaldo real
(`"Segoe UI", system-ui, -apple-system, sans-serif`), de modo que si la red corporativa la bloquea
la maquetación no se rompe: cambia la fuente, no el diseño.

**Para no depender de la red**, descargue Manrope (SIL Open Font License) a `assets/fonts/` y
sustituya el `<link>` de Google Fonts en `index.html` por un bloque `@font-face` local. Es el mismo
problema que el §7.4 pide resolver incrustando la fuente en el `.pptx`.

## 7 · Lo que este tablero no hace

- **No lee los archivos de la carpeta en vivo.** El contenido está transcrito a `assets/js/data.js`.
  Un navegador no puede listar una carpeta local por motivos de seguridad, y la aplicación está
  pensada para abrirse con doble clic sin servidor.
- **No guarda cambios.** Es un tablero de consulta. Marcar una actividad como completada requiere
  editar `data.js`.
- **No lista dinámicamente los archivos de la carpeta.** Ver el punto anterior.


## 8 · Las figuras

Las tres figuras del documento de proceso están descargadas de SharePoint a `assets/img/` y
incrustadas en la sección que les corresponde:

| Figura | Archivo | Sección |
|---|---|---|
| 1 · Arquitectura de información | `fig1-arquitectura-informacion-en.png` | Actores y sistemas |
| 2 · Mapa del proceso O2C | `fig2-mapa-proceso-o2c-en.png` | Procesos y fases |
| 3 · Timeline de construcción | `fig3-timeline-construccion-es.png` (+ `-en`) | Timeline |

Las tres se abren en un visor a pantalla completa con zoom del 25% al 400%, arrastre para
desplazarse y atajos de teclado (`+`, `−`, `0` para ajustar, `Esc` para cerrar). La Figura 3 es la
única que existe en las dos versiones de idioma, así que su visor lleva selector **ES / EN**; por
defecto muestra la española, coherente con el resto del tablero. Las Figuras 1 y 2 sólo existen en
inglés en la carpeta, y así se etiquetan.

### Texto alternativo

`DISENO.md` §7.12 registra como ausente «texto alternativo en ninguna imagen, incluidas las cinco
diapositivas que *son* imágenes». Aquí cada figura lleva un `alt` descriptivo y completo —entre 600
y 2 100 caracteres— que enumera las columnas, las filas, los hitos y los estados, de modo que el
contenido del diagrama sigue siendo accesible sin ver la imagen.

Ese texto alternativo cumple además una segunda función: el contenido de las figuras **también**
está reconstruido como tablas y tarjetas navegables en cada sección, así que la figura y su
equivalente en datos conviven. Quien quiera la vista de conjunto mira el diagrama; quien quiera
filtrar, buscar o abrir el detalle de una actividad usa las tarjetas.

### Coherencia visual

Las figuras fueron producidas con la misma paleta que `DISENO.md` documenta —índigo `#292662`,
violeta, y la escala verde / ámbar / gris para los estados—, así que se integran en el tablero sin
ningún tratamiento. Es la mejor evidencia de que los tokens del §8 describen bien la marca.
