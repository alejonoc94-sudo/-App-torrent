/* ============================================================
   Torrent Pharma LATAM · Hoja de ruta de actividades
   Lógica de la aplicación: navegación, filtros y detalle.
   ============================================================ */

/* ---------- Utilidades ---------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

/** Escapa texto antes de insertarlo en HTML. */
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

/** Normaliza para búsqueda: minúsculas y sin acentos. */
const norm = (s) => String(s ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const chip = (estado) => `<span class="chip chip--${estado}">${esc(ESTADOS[estado].label)}</span>`;

const countBy = (arr, key = 'estado') => arr.reduce((a, x) => {
  a[x[key]] = (a[x[key]] || 0) + 1; return a;
}, { operando: 0, definicion: 0, pendiente: 0 });

/* ---------- Iconografía ----------
   DISENO.md §3.3: iconos de línea blancos dentro de discos azul marino
   de ~0.3 in, grosor de trazo consistente. Aquí como SVG nativo — §7.12
   señala que hoy los iconos sólo existen incrustados en el ráster. */
const ICON = {
  home:      '<path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  files:     '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  flow:      '<rect x="3" y="3" width="7" height="5" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="8" y="16" width="8" height="5" rx="1"/><path d="M6.5 8v4h11V8M12 12v4"/>',
  calendar:  '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
  report:    '<path d="M4 3h11l5 5v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M8 13h8M8 17h5M8 9h3"/>',
  raci:      '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/>',
  timeline:  '<path d="M12 3v18"/><circle cx="12" cy="7" r="2.5"/><circle cx="12" cy="17" r="2.5"/>',
  risk:      '<path d="M10.3 3.9 1.8 18.5A2 2 0 0 0 3.5 21.5h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  steps:     '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
  handshake: '<path d="M11 17 9 19a2 2 0 0 1-3-3l4-4"/><path d="m13 7 2-2a2 2 0 0 1 3 3l-6 6-2-2"/><path d="M3 12 8 7M16 12l5 5"/>',
  users:     '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M17 5.5a3.5 3.5 0 0 1 0 7M18 20a6.4 6.4 0 0 0-2-4.6"/>',
  palette:   '<path d="M12 3a9 9 0 1 0 0 18c1 0 1.7-.8 1.7-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.1 0-1 .8-1.7 1.7-1.7H16a5 5 0 0 0 5-5c0-4-4-7.3-9-7.3z"/><circle cx="7.5" cy="10.5" r="1.2"/><circle cx="12" cy="7.5" r="1.2"/><circle cx="16.5" cy="10.5" r="1.2"/>',
  book:      '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 16.5A2.5 2.5 0 0 1 6.5 14H20"/>',
  question:  '<circle cx="12" cy="12" r="9.5"/><path d="M9.2 9.2a2.9 2.9 0 0 1 5.6 1c0 1.9-2.8 2.3-2.8 4M12 17h.01"/>',
  bulb:      '<path d="M9 18h6M10 21h4"/><path d="M12 2a6.5 6.5 0 0 0-3.7 11.8c.5.4.7 1 .7 1.6v.6h6v-.6c0-.6.2-1.2.7-1.6A6.5 6.5 0 0 0 12 2z"/>',
  check:     '<path d="M20 6 9 17l-5-5"/>',
  clock:     '<circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l3.5 2.5"/>',
  dot:       '<circle cx="12" cy="12" r="7"/>',
  user:      '<circle cx="12" cy="8" r="3.5"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
  search:    '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  link:      '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7L12.5 19.5"/>',
  layers:    '<path d="m12 2 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
  print:     '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 15h12v6H6z"/>',
  zoom:      '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M11 8.5v5M8.5 11h5"/>',
  image:     '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="m3.5 17 5-5 4.5 4.5L16 14l4.5 4.5"/>'
};
const svg = (name, cls = '') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name] || ''}</svg>`;

/* ---------- Titular de dos niveles (DISENO.md §6.1) ---------- */
const headline = (kicker, h, note) => `
  <header class="headline">
    <div class="headline__kicker">${esc(kicker)}</div>
    <h2 class="headline__h">${esc(h)}</h2>
    ${note ? `<p class="headline__note">${note}</p>` : ''}
  </header>`;

const panel = (title, unit, body, flush = false) => `
  <section class="panel">
    <div class="panel__head">${esc(title)}${unit ? `<span class="panel__unit">${esc(unit)}</span>` : ''}</div>
    <div class="panel__body${flush ? ' panel__body--flush' : ''}">${body}</div>
  </section>`;

/* ---- Figura: diagrama original del documento, con visor a pantalla completa ---- */
const figura = (key) => {
  const f = FIGURAS[key];
  if (!f) return '';
  return `
    <figure class="figure">
      <div class="headline__kicker" style="margin-bottom:.45rem">${esc(f.kicker)}</div>
      <button class="figure__frame" type="button" data-fig="${key}"
              aria-label="Abrir «${esc(f.titulo)}» a pantalla completa">
        <img src="${f.archivo}" alt="${esc(f.alt)}" loading="lazy" decoding="async">
        <span class="figure__zoom">${svg('zoom')} Ampliar</span>
      </button>
      <figcaption class="figure__cap">
        <span><b>Figura ${f.n}</b> · ${esc(f.titulo)}</span>
        <span>${esc(f.pie)}</span>
        <span class="chip chip--plain chip--neutral">${esc(f.idioma)}</span>
      </figcaption>
    </figure>`;
};

const insight = (title, items) => `
  <aside class="insight">
    <div class="insight__head">
      <span class="insight__bulb">${svg('bulb')}</span>
      <span class="insight__title">${esc(title)}</span>
    </div>
    <ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>
  </aside>`;

const progressBar = (c) => {
  const t = c.operando + c.definicion + c.pendiente || 1;
  const pc = (n) => ((n / t) * 100).toFixed(1) + '%';
  return `
    <div class="progress" role="img"
         aria-label="${c.operando} operando, ${c.definicion} en definición, ${c.pendiente} pendientes de ${t}">
      <div class="progress__seg progress__seg--operando"   style="width:${pc(c.operando)}"></div>
      <div class="progress__seg progress__seg--definicion" style="width:${pc(c.definicion)}"></div>
      <div class="progress__seg progress__seg--pendiente"  style="width:${pc(c.pendiente)}"></div>
    </div>
    <div class="progress-legend">
      <span><i style="background:var(--st-operando)"></i>Operando ${c.operando} · ${pc(c.operando)}</span>
      <span><i style="background:var(--st-definicion)"></i>En definición ${c.definicion} · ${pc(c.definicion)}</span>
      <span><i style="background:var(--st-pendiente)"></i>Pendiente ${c.pendiente} · ${pc(c.pendiente)}</span>
    </div>`;
};

/* ---------- Visor de figuras a pantalla completa ---------- */
const lightbox = {
  el: null, stage: null, img: null,
  key: null, lang: 'es', zoom: 1, fit: true,
  natural: 0, lastFocus: null,

  init() {
    this.el    = $('#lightbox');
    this.stage = $('#lb-stage');
    this.img   = $('#lb-img');

    $('#lb-close').addEventListener('click', () => this.close());
    $('#lb-fit').addEventListener('click',   () => this.setFit(!this.fit));
    $('#lb-in').addEventListener('click',    () => this.setZoom(this.ratio() * 1.35));
    $('#lb-out').addEventListener('click',   () => this.setZoom(this.ratio() / 1.35));

    document.addEventListener('keydown', (e) => {
      if (!this.el.classList.contains('is-open')) return;
      if (e.key === 'Escape') { e.stopPropagation(); this.close(); }
      if (e.key === '+' || e.key === '=') this.setZoom(this.ratio() * 1.35);
      if (e.key === '-') this.setZoom(this.ratio() / 1.35);
      if (e.key === '0') this.setFit(true);
    });

    /* Arrastrar para desplazar cuando la imagen excede el área visible */
    let dragging = false, sx = 0, sy = 0, sl = 0, st = 0;
    this.stage.addEventListener('pointerdown', (e) => {
      if (this.fit) return;
      dragging = true; sx = e.clientX; sy = e.clientY;
      sl = this.stage.scrollLeft; st = this.stage.scrollTop;
      this.stage.classList.add('is-grabbing');
      this.stage.setPointerCapture(e.pointerId);
    });
    this.stage.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      this.stage.scrollLeft = sl - (e.clientX - sx);
      this.stage.scrollTop  = st - (e.clientY - sy);
    });
    const stop = () => { dragging = false; this.stage.classList.remove('is-grabbing'); };
    this.stage.addEventListener('pointerup', stop);
    this.stage.addEventListener('pointercancel', stop);

    /* Rueda con Ctrl/⌘ para hacer zoom */
    this.stage.addEventListener('wheel', (e) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      this.setZoom(this.ratio() * (e.deltaY < 0 ? 1.12 : 1 / 1.12));
    }, { passive: false });
  },

  open(key) {
    const f = FIGURAS[key];
    if (!f) return;
    this.key = key; this.lang = 'es';
    this.lastFocus = document.activeElement;

    $('#lb-title').textContent = `Figura ${f.n} · ${f.titulo}`;
    $('#lb-sub').textContent   = f.unidad;
    $('#lb-foot').textContent  = f.pie;

    /* Selector de idioma, sólo si la figura tiene versión en inglés */
    $('#lb-langs').innerHTML = f.archivoEn ? `
      <button class="lightbox__btn" type="button" data-lang="es" aria-pressed="true">ES</button>
      <button class="lightbox__btn" type="button" data-lang="en" aria-pressed="false">EN</button>` : '';

    this.setSrc();
    this.el.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    this.setFit(true);
    $('#lb-close').focus();
  },

  setSrc() {
    const f = FIGURAS[this.key];
    this.img.src = (this.lang === 'en' && f.archivoEn) ? f.archivoEn : f.archivo;
    this.img.alt = f.alt;
    this.img.onload = () => {
      this.natural = this.img.naturalWidth;
      if (this.fit) this.updateVal();
    };
  },

  setLang(l) {
    this.lang = l;
    $$('#lb-langs [data-lang]').forEach((b) =>
      b.setAttribute('aria-pressed', b.dataset.lang === l));
    this.setSrc();
  },

  setFit(on) {
    this.fit = on;
    this.stage.classList.toggle('is-fit', on);
    this.stage.classList.toggle('is-grab', !on);
    $('#lb-fit').setAttribute('aria-pressed', String(on));
    if (on) { this.img.style.width = ''; this.zoom = 1; }
    else if (!this.img.style.width) this.img.style.width = this.natural + 'px';
    this.updateVal();
  },

  /* La escala que se está viendo ahora mismo. En modo «ajustar» la imagen se
     estira por CSS, así que el zoom real es el ancho mostrado sobre el natural. */
  ratio() {
    return (this.fit && this.natural) ? this.img.clientWidth / this.natural : this.zoom;
  },

  setZoom(z) {
    this.zoom = Math.min(4, Math.max(0.25, z));
    if (this.fit) this.setFit(false);
    this.img.style.width = Math.round(this.natural * this.zoom) + 'px';
    this.updateVal();
  },

  updateVal() {
    $('#lb-val').textContent = (Math.round(this.ratio() * 100) || 100) + '%';
  },

  close() {
    if (!this.el.classList.contains('is-open')) return;
    this.el.classList.remove('is-open');
    document.body.style.overflow = '';
    if (this.lastFocus && document.contains(this.lastFocus)) this.lastFocus.focus();
  }
};

/* ---------- Panel de detalle ("click and fill") ---------- */
const drawer = {
  el: null, backdrop: null, lastFocus: null,
  init() {
    this.el = $('#drawer');
    this.backdrop = $('#drawer-backdrop');
    $('#drawer-close').addEventListener('click', () => this.close());
    this.backdrop.addEventListener('click', () => this.close());
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.close(); });
  },
  open(eyebrow, title, bodyHTML) {
    this.lastFocus = document.activeElement;
    $('#drawer-eyebrow').textContent = eyebrow;
    $('#drawer-title').textContent = title;
    $('#drawer-body').innerHTML = bodyHTML;
    $('#drawer-body').scrollTop = 0;
    this.el.classList.add('is-open');
    this.backdrop.classList.add('is-open');
    this.el.setAttribute('aria-hidden', 'false');
    $('#drawer-close').focus();
  },
  close() {
    if (!this.el.classList.contains('is-open')) return;
    this.el.classList.remove('is-open');
    this.backdrop.classList.remove('is-open');
    this.el.setAttribute('aria-hidden', 'true');
    $$('.is-open', $('#main')).forEach((r) => r.classList.remove('is-open'));
    if (this.lastFocus && document.contains(this.lastFocus)) this.lastFocus.focus();
  }
};

const dl = (pairs) => `<dl class="dl">${pairs
  .filter(([, v]) => v)
  .map(([k, v]) => `<dt>${esc(k)}</dt><dd>${v}</dd>`).join('')}</dl>`;

/* ---------- Estado de los filtros ---------- */
const filtros = {
  procesos:   { estado: new Set(), texto: '' },
  reportes:   { estado: new Set(), texto: '' },
  calendario: { estado: new Set(), texto: '', ciclo: 'ambos' }
};

const barraFiltros = (id, extra = '') => `
  <div class="filters" data-filtros="${id}">
    <span class="filters__label">Estado</span>
    ${Object.entries(ESTADOS).map(([k, v]) => `
      <button class="pill" type="button" data-estado="${k}" aria-pressed="false">
        <span class="pill__dot" style="background:var(--st-${k})"></span>${esc(v.label)}
      </button>`).join('')}
    ${extra ? `<span class="filters__sep" aria-hidden="true"></span>${extra}` : ''}
    <span class="filters__sep" aria-hidden="true"></span>
    <label class="search">
      ${svg('search')}
      <span class="sr-only">Buscar</span>
      <input type="search" data-buscar="${id}" placeholder="Buscar actividad, responsable o entregable…">
    </label>
    <span class="result-count" data-conteo="${id}"></span>
  </div>`;

const pasaFiltro = (f, estado, campos) => {
  if (f.estado.size && !f.estado.has(estado)) return false;
  if (f.texto && !norm(campos.join(' ')).includes(f.texto)) return false;
  return true;
};

/* ============================================================
   VISTAS
   ============================================================ */

const TODAS_ACTIVIDADES = FASES.flatMap((f) =>
  f.actividades.map((a) => ({ ...a, fase: f.n, faseTitulo: f.titulo, faseCuando: f.cuando })));

/* ---- Resumen ---- */
function viewResumen() {
  const cAct = countBy(TODAS_ACTIVIDADES);
  const cRep = countBy(REPORTES);
  const totalAct = TODAS_ACTIVIDADES.length;
  const pctOperando = Math.round((cAct.operando / totalAct) * 100);

  const kpis = [
    { icon: 'flow',  cls: '',          fig: totalAct,           lab: 'Actividades en el ciclo mensual,<br>repartidas en 5 fases' },
    { icon: 'check', cls: 'kpi__icon--positive', fig: `${cAct.operando} de ${totalAct}`, lab: `Actividades operando con evidencia<br>${pctOperando}% del proceso construido` },
    { icon: 'report',cls: 'kpi__icon--violet',   fig: `${cRep.operando} de ${REPORTES.length}`, lab: 'Reportes del catálogo ya producidos<br>con evidencia de junio y julio' },
    { icon: 'clock', cls: 'kpi__icon--amber',    fig: EN_CURSO.length,   lab: 'Frentes abiertos en curso,<br>con dueño y cierre definido' },
    { icon: 'risk',  cls: 'kpi__icon--grey',     fig: NO_INICIADO.length,lab: 'Bloques que no han empezado<br>y condicionan la venta local' }
  ];

  const porResp = {};
  TODAS_ACTIVIDADES.forEach((a) => { porResp[a.resp] = (porResp[a.resp] || 0) + 1; });
  const respTop = Object.entries(porResp).sort((a, b) => b[1] - a[1]);
  const maxResp = respTop[0][1];

  return `
    ${headline(
      'Torrent Pharma Chile SpA · Sociedad T303 · Planta E303',
      'El tramo de compras, intercompañía y cierre contable ya opera con evidencia; el tramo de venta local todavía no existe.',
      'Hoja de ruta consolidada a partir de los documentos de la carpeta. Estado a la fecha del documento fuente: <b>6 de agosto de 2026</b>.'
    )}

    <div class="kpi-row">
      ${kpis.map((k) => `
        <article class="kpi">
          <span class="kpi__icon ${k.cls}">${svg(k.icon)}</span>
          <div class="kpi__body">
            <div class="kpi__figure">${esc(String(k.fig))}</div>
            <div class="kpi__label">${k.lab}</div>
          </div>
        </article>`).join('')}
    </div>

    <div class="grid-rail">
      <div>
        ${panel('Avance del proceso', 'Actividades por estado', progressBar(cAct))}

        ${panel('Avance por fase del mes', '5 fases · 27 actividades', `
          <div class="table-wrap">
            <table class="data">
              <thead><tr>
                <th>Fase</th><th>Cuándo</th><th class="num">Act.</th>
                <th style="min-width:190px">Avance</th><th class="num">Operando</th>
              </tr></thead>
              <tbody>
                ${FASES.map((f) => {
                  const c = countBy(f.actividades);
                  const t = f.actividades.length;
                  return `<tr class="is-clickable" data-goto="procesos">
                    <td class="cell-strong">${f.n} · ${esc(f.titulo)}</td>
                    <td class="cell-muted">${esc(f.cuando)}</td>
                    <td class="num">${t}</td>
                    <td>${progressBar(c).split('<div class="progress-legend">')[0]}</td>
                    <td class="num ${c.operando ? 'pos' : 'cell-muted'}">${c.operando}/${t}</td>
                  </tr>`;
                }).join('')}
                <tr class="total">
                  <td>Total</td><td></td><td class="num">${totalAct}</td>
                  <td></td><td class="num pos">${cAct.operando}/${totalAct}</td>
                </tr>
              </tbody>
            </table>
          </div>`, true)}

        ${panel('Carga por responsable', 'Actividades del ciclo mensual', `
          <div class="table-wrap">
            <table class="data" style="min-width:520px">
              <thead><tr><th>Responsable</th><th style="min-width:200px">Actividades</th><th class="num">Nº</th></tr></thead>
              <tbody>
                ${respTop.map(([r, n]) => `
                  <tr>
                    <td class="cell-strong">${esc(r)}</td>
                    <td><div class="bar-cell">
                      <span class="bar-cell__track"><span class="bar-cell__fill" style="width:${(n / maxResp) * 100}%"></span></span>
                    </div></td>
                    <td class="num">${n}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>`, true)}
      </div>

      <div class="stack">
        ${insight('Lectura principal', [
          'Ninguna de las tres piezas centrales del ciclo de venta está en manos de Torrent: <b>Forvis Mazars</b> factura y contabiliza sobre SoftLand, <b>Pharma ISA</b> despacha sobre CISAT y la consolidación ocurre en SAP y BPC en India. <b>Chile no tiene SAP local.</b>',
          'El proceso no se construye configurando un sistema, sino <b>definiendo qué reporte entrega cada tercero</b>, en qué formato, con qué frecuencia y contra qué se concilia.',
          'Finanzas LATAM concentra la responsabilidad final (A) de casi todo el proceso, mientras la ejecución (R) está mayoritariamente en los dos terceros. <b>Ese desbalance es lo que la reportería semanal debe compensar.</b>',
          'El cruce orden de compra → factura → despacho → pago <b>es el control que sostiene todo el cierre</b>.'
        ])}

        ${panel('Lo que falta para cerrar el ciclo', '', `
          <div class="stack" style="gap:.6rem">
            ${NO_INICIADO.map((p) => `
              <div class="state-bar state-bar--pendiente" style="padding-left:.7rem">
                <div style="font-weight:600;font-size:.875rem;line-height:1.35">${esc(p.pendiente)}</div>
                <div style="font-size:.75rem;color:var(--ink-400);margin-top:.15rem">${esc(p.dueno)}</div>
              </div>`).join('')}
          </div>`)}

        ${panel('Fechas comprometidas', 'Advertencia del documento fuente', `
          <p style="font-size:.875rem;margin:0 0 .6rem">
            Los días <b>D</b> del ciclo de cierre son una <b>propuesta de Torrent Finanzas LATAM</b>.
            No han sido confirmados por Forvis Mazars ni por Pharma ISA.
          </p>
          <p style="font-size:.875rem;margin:0">
            La cadencia semanal (viernes / lunes / martes) sí surge del acuerdo del
            <b>6 de agosto de 2026</b> con Forvis Mazars y está en implementación.
          </p>`)}
      </div>
    </div>`;
}

/* ---- Archivos ---- */
function viewArchivos() {
  return `
    ${headline(
      'Carpeta de origen · Claude / App Torrent Latam',
      'Seis archivos sostienen esta hoja de ruta: uno define el estilo, tres definen el proceso y dos lo ilustran.',
      'Cada tarjeta indica qué aporta el archivo y lleva directamente a la sección del tablero que lo consume.'
    )}
    <div class="files">
      ${ARCHIVOS.map((f) => `
        <article class="file-card">
          <div class="file-card__top">
            <span class="file-card__ext ext--${f.ext}">${f.ext.toUpperCase()}</span>
            <div style="min-width:0">
              <div class="file-card__name">${esc(f.nombre)}</div>
              <div class="file-card__meta">${esc(f.meta)}</div>
            </div>
          </div>
          ${f.fig ? `
            <button class="figure__frame" type="button" data-fig="${f.fig}"
                    aria-label="Abrir «${esc(FIGURAS[f.fig].titulo)}» a pantalla completa">
              <img src="${FIGURAS[f.fig].archivo}" alt="${esc(FIGURAS[f.fig].alt)}" loading="lazy" decoding="async">
              <span class="figure__zoom">${svg('zoom')} Ampliar</span>
            </button>` : ''}
          <p class="file-card__desc">${esc(f.desc)}</p>
          <div class="file-card__tags">
            ${f.aporta.map((t) => `<span class="chip chip--plain chip--neutral">${esc(t)}</span>`).join('')}
          </div>
          <div class="file-card__foot">
            <button class="btn btn--primary btn--sm" type="button" data-goto="${f.ir}">
              ${svg('link')} Ver en el tablero
            </button>
            ${f.fig
              ? `<button class="btn btn--ghost btn--sm" type="button" data-fig="${f.fig}">${svg('zoom')} Ampliar</button>`
              : `<span class="chip chip--plain chip--violet">${f.secciones} secciones</span>`}
          </div>
        </article>`).join('')}
    </div>

    ${insight('Cómo se relacionan', [
      '<b>DISENO.md</b> no aporta contenido de negocio: define la tipografía Manrope, la paleta índigo y violeta, los componentes y la retícula que esta aplicación usa. Es la capa de forma.',
      'El <b>PDF de Proceso O2C</b> es la fuente de casi todo el contenido: fases, calendario, reportes, RACI, riesgos, timeline y próximos pasos.',
      'La <b>minuta del 23 de julio</b> aporta el detalle contable operativo y los doce compromisos con responsable y fecha.',
      'Las <b>tres figuras PNG</b> son las vistas gráficas del proceso; sus datos están reconstruidos aquí como tablas y tarjetas navegables.'
    ])}`;
}

/* ---- Procesos ---- */
function viewProcesos() {
  return `
    ${headline(
      'Mapa del proceso end-to-end · cinco fases que recorren el mes',
      'Veintisiete actividades encadenadas, cada una con su responsable, su insumo y el entregable que pasa al siguiente eslabón.',
      'Pulse cualquier actividad para ver su detalle completo. Use los filtros para aislar lo que ya opera de lo que falta.'
    )}
    ${figura('mapa')}
    ${barraFiltros('procesos')}
    <div id="procesos-lista"></div>`;
}

function pintarProcesos() {
  const f = filtros.procesos;
  const cont = $('#procesos-lista');
  if (!cont) return;
  let visibles = 0;

  cont.innerHTML = FASES.map((fase) => {
    const acts = fase.actividades.filter((a) =>
      pasaFiltro(f, a.estado, [a.act, a.resp, a.input, a.output]));
    if (!acts.length) return '';
    visibles += acts.length;
    const c = countBy(acts);
    return `
      <section class="phase">
        <header class="phase__head">
          <span class="phase__n">${fase.n}</span>
          <div>
            <h3 class="phase__title">${esc(fase.titulo)}</h3>
            <div class="phase__when">${esc(fase.en)} — ${esc(fase.cuando)}</div>
          </div>
          <div class="phase__stats">
            ${c.operando ? `<span class="chip chip--operando">${c.operando}</span>` : ''}
            ${c.definicion ? `<span class="chip chip--definicion">${c.definicion}</span>` : ''}
            ${c.pendiente ? `<span class="chip chip--pendiente">${c.pendiente}</span>` : ''}
          </div>
        </header>
        <div class="act-grid">
          ${acts.map((a) => {
            const i = TODAS_ACTIVIDADES.findIndex((x) => x.act === a.act && x.fase === fase.n);
            return `
              <button class="act state-bar state-bar--${a.estado}" type="button" data-act="${i}">
                <span class="act__name">${esc(a.act)}</span>
                <span class="act__owner">${svg('user')}${esc(a.resp)}</span>
                <span class="act__out">→ ${esc(a.output)}</span>
                <span class="act__foot">${chip(a.estado)}</span>
              </button>`;
          }).join('')}
        </div>
      </section>`;
  }).join('') || `<div class="empty">Ninguna actividad coincide con los filtros aplicados.</div>`;

  const el = $('[data-conteo="procesos"]');
  if (el) el.textContent = `${visibles} de ${TODAS_ACTIVIDADES.length} actividades`;
}

function abrirActividad(i) {
  const a = TODAS_ACTIVIDADES[i];
  if (!a) return;
  drawer.open(`Fase ${a.fase} · ${a.faseTitulo}`, a.act, `
    ${dl([
      ['Estado', `${chip(a.estado)} <span style="display:block;margin-top:.35rem;color:var(--ink-400);font-size:.75rem">${esc(ESTADOS[a.estado].desc)}</span>`],
      ['Responsable', esc(a.resp)],
      ['Cuándo ocurre', esc(a.faseCuando)]
    ])}
    <div class="flow">
      <div class="flow__step"><span class="flow__k">Input requerido</span>${esc(a.input)}</div>
      <div class="flow__step"><span class="flow__k">Actividad</span>${esc(a.act)}</div>
      <div class="flow__step"><span class="flow__k">Output entregado</span>${esc(a.output)}</div>
    </div>
    ${insight('Por qué importa', [
      `Esta actividad pertenece a la <b>fase ${a.fase} — ${esc(a.faseTitulo)}</b>, que corre en <b>${esc(a.faseCuando)}</b>.`,
      `Si el output <i>«${esc(a.output)}»</i> no se produce en la fecha acordada, el eslabón siguiente del cierre queda sin insumo.`
    ])}`);
}

/* ---- Calendario ---- */
function viewCalendario() {
  const extra = `
    <span class="filters__label">Ciclo</span>
    ${[['ambos', 'Ambos'], ['semanal', 'Semanal'], ['cierre', 'Cierre mensual']]
      .map(([k, l]) => `<button class="pill" type="button" data-ciclo="${k}"
             aria-pressed="${k === 'ambos'}">${l}</button>`).join('')}`;
  return `
    ${headline(
      'Calendario mensual · dos ciclos superpuestos',
      'Un ciclo semanal sostiene la cartera todo el mes; el ciclo de cierre arranca en D-3 y termina en D+10.',
      'Los días de la cadencia semanal surgen del acuerdo del 6 de agosto con Forvis Mazars. <b>Los días D del cierre son una propuesta de Torrent y requieren confirmación formal de Forvis Mazars y Pharma ISA.</b>'
    )}
    ${barraFiltros('calendario', extra)}
    <div id="calendario-lista"></div>`;
}

function pintarCalendario() {
  const f = filtros.calendario;
  const cont = $('#calendario-lista');
  if (!cont) return;

  const fila = (r, tipo) => {
    const idx = (tipo === 'semanal' ? CICLO_SEMANAL : CICLO_CIERRE).indexOf(r);
    return `
      <div class="cal__row state-bar state-bar--${r.estado}" role="button" tabindex="0"
           data-cal="${tipo}:${idx}">
        <span class="cal__day${r.dia === 'D' ? ' cal__day--d0' : ''}">${esc(r.dia)}</span>
        <div style="min-width:0">
          <div class="cal__act">${esc(r.act)}</div>
          <div class="cal__deliv">→ ${esc(r.entregable)}</div>
        </div>
        <span class="cal__owner">${esc(r.resp)}</span>
        ${chip(r.estado)}
      </div>`;
  };

  const sem = CICLO_SEMANAL.filter((r) => pasaFiltro(f, r.estado, [r.act, r.resp, r.entregable, r.dia]));
  const cie = CICLO_CIERRE.filter((r) => pasaFiltro(f, r.estado, [r.act, r.resp, r.entregable, r.dia]));
  const verSem = f.ciclo === 'ambos' || f.ciclo === 'semanal';
  const verCie = f.ciclo === 'ambos' || f.ciclo === 'cierre';

  let html = '';
  if (verSem) {
    html += panel('Ciclo semanal', 'Todas las semanas del mes',
      sem.length ? `<div class="cal">${sem.map((r) => fila(r, 'semanal')).join('')}</div>`
                 : `<div class="empty">Sin coincidencias en el ciclo semanal.</div>`);
  }
  if (verCie) {
    html += `<div class="note"><strong>Propuesta, no compromiso.</strong>
      D se define como día hábil posterior al último día del mes. Se propone dejar el calendario
      firmado por las tres partes antes de fin de agosto de 2026, para que el cierre de septiembre
      sea el primero con fechas comprometidas.</div>`;
    html += panel('Ciclo de cierre mensual', 'D-3 a D+10 · propuesta',
      cie.length ? `<div class="cal">${cie.map((r) => fila(r, 'cierre')).join('')}</div>`
                 : `<div class="empty">Sin coincidencias en el ciclo de cierre.</div>`);
  }
  cont.innerHTML = html || `<div class="empty">Ningún ciclo seleccionado.</div>`;

  const total = (verSem ? CICLO_SEMANAL.length : 0) + (verCie ? CICLO_CIERRE.length : 0);
  const vis = (verSem ? sem.length : 0) + (verCie ? cie.length : 0);
  const el = $('[data-conteo="calendario"]');
  if (el) el.textContent = `${vis} de ${total} hitos`;
}

function abrirCalendario(tipo, idx) {
  const r = (tipo === 'semanal' ? CICLO_SEMANAL : CICLO_CIERRE)[idx];
  if (!r) return;
  const es = tipo === 'semanal' ? 'Ciclo semanal' : 'Ciclo de cierre mensual';
  drawer.open(`${es} · ${r.dia}`, r.act, `
    ${dl([
      ['Estado', `${chip(r.estado)} <span style="display:block;margin-top:.35rem;color:var(--ink-400);font-size:.75rem">${esc(ESTADOS[r.estado].desc)}</span>`],
      ['Día', esc(r.dia)],
      ['Responsable', esc(r.resp)],
      ['Entregable', esc(r.entregable)]
    ])}
    ${tipo === 'cierre'
      ? `<div class="note"><strong>Fecha propuesta.</strong> Este día D es una posición de Torrent
           Finanzas LATAM y requiere confirmación formal de Forvis Mazars y de Pharma ISA antes de
           considerarse comprometido.</div>`
      : `<div class="note" style="background:var(--st-operando-bg);border-left-color:var(--positive)">
           <strong style="color:var(--positive)">Cadencia acordada.</strong> La secuencia semanal fue
           acordada en principio con Forvis Mazars el 6 de agosto de 2026: la cartola se envía el
           viernes y los reportes de cuentas por pagar, por cobrar y facturación se reciben el lunes
           o el martes siguiente.</div>`}`);
}

/* ---- Reportes ---- */
function viewReportes() {
  return `
    ${headline(
      'Catálogo de reportes · los dieciséis entregables que sostienen el proceso',
      'Ocho ya se producen con evidencia de los cierres de junio y julio; cuatro están acordados pero sin formato estable; cuatro no han empezado.',
      'Ésta es la tabla que conviene usar como <b>lista de verificación mensual</b>.'
    )}
    <div class="note">
      <strong>Discrepancia detectada en el documento fuente.</strong>
      El texto introductorio del §8 del PDF dice «nueve ya se producen […]; cuatro están acordados
      […]; y tres no han empezado» (9 + 4 + 3), pero la tabla del mismo §8 clasifica
      <b>8 operando, 4 en definición y 4 pendientes</b>. Este tablero usa la tabla, que es el dato
      a nivel de fila. Los dos reportes en discusión son el <b>nº 8</b> (inventario y despachos de la
      semana, de Pharma ISA) y el <b>nº 9</b> (closing stock valorizado): ambos dependen de CISAT, que
      todavía no ha sido revisado a fondo. Conviene corregir el párrafo antes de circular el documento.
    </div>
    ${barraFiltros('reportes')}
    <div id="reportes-lista"></div>`;
}

function pintarReportes() {
  const f = filtros.reportes;
  const cont = $('#reportes-lista');
  if (!cont) return;
  const rows = REPORTES.filter((r) =>
    pasaFiltro(f, r.estado, [r.reporte, r.emisor, r.receptor, r.frecuencia, r.sistema]));
  const c = countBy(REPORTES);

  cont.innerHTML =
    panel('Estado del catálogo', '16 entregables', progressBar(c)) +
    panel('Catálogo de reportes', 'Emisor · receptor · frecuencia · sistema', rows.length ? `
      <div class="table-wrap">
        <table class="data">
          <thead><tr>
            <th class="num">#</th><th>Reporte o entregable</th><th>Emisor</th>
            <th>Receptor</th><th>Frecuencia</th><th>Sistema / soporte</th><th>Estado</th>
          </tr></thead>
          <tbody>
            ${rows.map((r) => `
              <tr class="is-clickable" data-rep="${r.n}" tabindex="0">
                <td class="num cell-muted">${r.n}</td>
                <td class="cell-strong">${esc(r.reporte)}</td>
                <td>${esc(r.emisor)}</td>
                <td>${esc(r.receptor)}</td>
                <td class="cell-muted">${esc(r.frecuencia)}</td>
                <td class="cell-muted">${esc(r.sistema)}</td>
                <td>${chip(r.estado)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>` : `<div class="empty">Ningún reporte coincide con los filtros aplicados.</div>`, true);

  const el = $('[data-conteo="reportes"]');
  if (el) el.textContent = `${rows.length} de ${REPORTES.length} reportes`;
}

function abrirReporte(n) {
  const r = REPORTES.find((x) => x.n === Number(n));
  if (!r) return;
  drawer.open(`Reporte ${r.n} de 16`, r.reporte, `
    ${dl([
      ['Estado', `${chip(r.estado)} <span style="display:block;margin-top:.35rem;color:var(--ink-400);font-size:.75rem">${esc(ESTADOS[r.estado].desc)}</span>`],
      ['Emisor', esc(r.emisor)],
      ['Receptor', esc(r.receptor)],
      ['Frecuencia', esc(r.frecuencia)],
      ['Sistema / soporte', esc(r.sistema)]
    ])}
    ${r.estado === 'definicion' ? `<div class="note"><strong>Formato por validar.</strong>
      El 6 de agosto se solicitó a Forvis Mazars una muestra de cada reporte. Hasta recibirla, las
      columnas mínimas exigidas son un requerimiento, no una descripción de lo existente.</div>` : ''}
    ${r.estado === 'pendiente' ? `<div class="note"><strong>No ha empezado.</strong>
      Este entregable todavía no se produce. Revise la sección «Próximos pasos» para ver de qué
      acción depende su puesta en marcha.</div>` : ''}
    ${r.estado === 'operando' ? `<div class="note" style="background:var(--st-operando-bg);border-left-color:var(--positive)">
      <strong style="color:var(--positive)">Con evidencia.</strong> Este entregable ya se produjo al
      menos una vez, con soporte documental de los cierres de junio y julio de 2026.</div>` : ''}`);
}

/* ---- RACI ---- */
function viewRaci() {
  const badge = (v) => {
    if (v === '—') return `<span class="raci-none">—</span>`;
    return v.split(' / ').map((x) => `<span class="raci-badge raci-${x}">${x}</span>`).join(' ');
  };
  return `
    ${headline(
      'Matriz RACI · quién ejecuta y quién responde',
      'Finanzas LATAM concentra la responsabilidad final de casi todo el proceso, mientras la ejecución está mayoritariamente en los dos terceros.',
      'Ese desbalance es exactamente lo que la reportería semanal debe compensar.'
    )}
    ${panel('Leyenda', '', `
      <div class="raci-key">
        <span><span class="raci-badge raci-R">R</span> Responsible — quién ejecuta</span>
        <span><span class="raci-badge raci-A">A</span> Accountable — quién responde por el resultado</span>
        <span><span class="raci-badge raci-C">C</span> Consulted — quién debe ser consultado</span>
        <span><span class="raci-badge raci-I">I</span> Informed — quién debe ser informado</span>
      </div>`)}
    ${panel('Matriz RACI', '14 actividades · 5 actores', `
      <div class="table-wrap">
        <table class="data">
          <thead><tr><th style="min-width:280px">Actividad</th>
            ${RACI_ACTORES.map((a) => `<th style="text-align:center">${esc(a)}</th>`).join('')}
          </tr></thead>
          <tbody>
            ${RACI.map((r) => `<tr>
              <td class="cell-strong">${esc(r.act)}</td>
              ${r.v.map((v) => `<td class="raci-cell">${badge(v)}</td>`).join('')}
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`, true)}`;
}

/* ---- Timeline ---- */
function viewTimeline() {
  return `
    ${headline(
      'Timeline de construcción · lo recorrido y lo que sigue',
      'Nueve hitos ya ocurrieron con evidencia documental entre marzo y agosto de 2026; cinco frentes están en curso y cinco bloques no han empezado.',
      'La franja central marca la fecha del documento fuente: 6 de agosto de 2026.'
    )}
    ${figura('timeline')}
    <div class="grid-2">
      <div>
        ${panel('Construido, con evidencia', `${CONSTRUIDO.length} hitos`, `
          <div class="tl">
            ${CONSTRUIDO.map((h) => `
              <div class="tl__item tl__item--done">
                <div class="tl__when">${esc(h.cuando)}</div>
                <div class="tl__what">${esc(h.hito)}</div>
                <div class="tl__ev">${svg('check', 'nav__icon')} ${esc(h.evidencia)}</div>
              </div>`).join('')}
            <div class="tl__now">6 de agosto de 2026 — fecha del documento fuente</div>
          </div>`)}
      </div>
      <div class="stack">
        ${panel('En curso', `${EN_CURSO.length} frentes abiertos`, `
          <div class="tl">
            ${EN_CURSO.map((h) => `
              <div class="tl__item tl__item--progress">
                <div class="tl__when">${esc(h.resp)}</div>
                <div class="tl__what">${esc(h.frente)}</div>
                <div class="tl__ev">Qué falta: ${esc(h.falta)}</div>
              </div>`).join('')}
          </div>`)}

        ${panel('Pendiente de iniciar', `${NO_INICIADO.length} bloques`, `
          <div class="tl">
            ${NO_INICIADO.map((h) => `
              <div class="tl__item">
                <div class="tl__when">${esc(h.dueno)}</div>
                <div class="tl__what">${esc(h.pendiente)}</div>
                <div class="tl__ev">Por qué importa: ${esc(h.porque)}</div>
              </div>`).join('')}
          </div>`)}
      </div>
    </div>`;
}

/* ---- Riesgos ---- */
function viewRiesgos() {
  return `
    ${headline(
      'Riesgos y controles clave',
      'Ocho riesgos estructurales, todos derivados de la misma causa: dos de los tres sistemas transaccionales pertenecen a terceros.',
      'Cada riesgo lleva su control propuesto y el dueño que responde por él.'
    )}
    <div class="grid-2">
      ${RIESGOS.map((r) => `
        <article class="risk">
          <h3 class="risk__t">${esc(r.riesgo)}</h3>
          <div class="risk__why"><span class="risk__k">Por qué ocurre</span>${esc(r.porque)}</div>
          <div class="risk__ctl risk__ctl-box"><span class="risk__k">Control propuesto</span>${esc(r.control)}</div>
          <div><span class="chip chip--plain chip--neutral">${svg('user', 'nav__icon')} ${esc(r.dueno)}</span></div>
        </article>`).join('')}
    </div>`;
}

/* ---- Próximos pasos ---- */
function viewPasos() {
  return `
    ${headline(
      'Próximos pasos y decisiones requeridas',
      'Nueve acciones ordenadas por dependencia: las cuatro primeras habilitan todo lo demás.',
      'Sin formato de reporte y sin visibilidad de inventario no hay conciliación posible.'
    )}
    <div class="grid-rail">
      <div>
        ${PASOS.map((p) => `
          <article class="step">
            <span class="step__n">${p.n}</span>
            <div>
              <div class="step__t">${esc(p.accion)}</div>
              <div class="step__meta">
                <span>${svg('user', 'nav__icon')} <b>${esc(p.dueno)}</b></span>
                <span>${svg('calendar', 'nav__icon')} <b>${esc(p.fecha)}</b></span>
              </div>
              <div class="step__dep">Depende de: ${esc(p.dep)}</div>
            </div>
          </article>`).join('')}
      </div>
      <div class="stack">
        ${insight('Las cuatro que habilitan el resto', [
          '<b>1 · Muestra de formato</b> de los cuatro reportes semanales de Forvis Mazars.',
          '<b>2 · Sesión técnica con Pharma ISA</b> para inventariar la capacidad de reporte de CISAT.',
          '<b>3 · Proceso de cobranza</b>: cupos de crédito, antigüedad, escalamiento y DSO objetivo.',
          '<b>4 · Memo de flujo contable</b> y formalidades tributarias de Chile para HO.'
        ])}
        ${PREGUNTAS.map((g) => panel('Preguntas abiertas', g.para, `
          <ul style="margin:0;padding-left:1.1rem;display:grid;gap:.55rem;font-size:.875rem">
            ${g.items.map((i) => `<li>${esc(i)}</li>`).join('')}
          </ul>`)).join('')}
      </div>
    </div>`;
}

/* ---- Compromisos (minuta) ---- */
function viewCompromisos() {
  const porResp = {};
  COMPROMISOS.forEach((c) => { porResp[c.resp] = (porResp[c.resp] || 0) + 1; });
  return `
    ${headline(
      'Minuta del 23 de julio de 2026 · Alineamiento de cierre contable Mazars & Torrent',
      'Doce compromisos con responsable y fecha, y diez temas contables abiertos, de los cuales uno es el punto de mayor exposición.',
      'Asistentes: Nicolás Navas y José Manuel Herrera por Torrent; Yulmaris Valderrama, Carlos Castillo y Cristhian Espinoza por Mazars.'
    )}
    <div class="kpi-row">
      <article class="kpi">
        <span class="kpi__icon">${svg('handshake')}</span>
        <div class="kpi__body"><div class="kpi__figure">${COMPROMISOS.length}</div>
        <div class="kpi__label">Compromisos con responsable<br>y fecha acordada</div></div>
      </article>
      ${Object.entries(porResp).map(([r, n]) => `
        <article class="kpi">
          <span class="kpi__icon kpi__icon--violet">${svg('user')}</span>
          <div class="kpi__body"><div class="kpi__figure">${n}</div>
          <div class="kpi__label">${esc(r)}</div></div>
        </article>`).join('')}
    </div>

    ${panel('Tabla de compromisos', 'Responsable · fecha', `
      <div class="table-wrap">
        <table class="data">
          <thead><tr><th>Compromiso / próximo paso</th><th>Responsable</th><th>Fecha</th><th>Tema</th></tr></thead>
          <tbody>
            ${COMPROMISOS.map((c) => `<tr>
              <td class="cell-strong">${esc(c.compromiso)}</td>
              <td>${esc(c.resp)}</td>
              <td class="cell-muted">${esc(c.fecha)}</td>
              <td><span class="chip chip--plain chip--neutral">${esc(c.tipo)}</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`, true)}

    ${panel('Temas tratados', '10 puntos · pulse para ver el detalle', `
      <div class="act-grid">
        ${TEMAS_MINUTA.map((t) => `
          <button class="act ${t.critico ? 'state-bar' : ''}" type="button" data-tema="${t.n}"
                  ${t.critico ? 'style="border-left:4px solid var(--negative)"' : ''}>
            <span class="act__name">${t.n}. ${esc(t.tema)}</span>
            ${t.critico ? `<span class="chip chip--plain" style="color:var(--negative);background:var(--negative-bg)">Mayor exposición</span>` : ''}
            <span class="act__out">Ver detalle →</span>
          </button>`).join('')}
      </div>`)}

    ${insight('El punto de mayor exposición', [
      'El <b>impuesto adicional del 35%</b> sobre las facturas de Adecco de 2025: servicios prestados por una empresa sin residencia en Chile, sujetos a Formulario 50, que no fue declarado ni pagado en su momento.',
      'Dos alternativas: declararlo en el año que correspondía (2025, con ajuste a la renta de ese ejercicio) o declararlo en el mes actual, con observación por extemporaneidad. <b>En ambos casos aplican multas e intereses aún no cuantificados.</b>',
      'Una tercera vía: si Torrent aporta la <b>documentación de no residencia</b> solicitada por Mazars, podría no aplicar la retención.',
      'Torrent no se comprometió a resolverlo dentro del cierre de julio, pero gestionará la documentación con Adecco y validará la alternativa con el área de Tax, <b>con miras a regularizar en agosto</b>.'
    ])}`;
}

function abrirTema(n) {
  const t = TEMAS_MINUTA.find((x) => x.n === Number(n));
  if (!t) return;
  drawer.open(`Minuta 23-jul-2026 · Punto ${t.n} de 10`, t.tema, `
    ${t.critico ? `<div class="note" style="background:var(--negative-bg);border-left-color:var(--negative)">
      <strong style="color:var(--negative)">Punto de mayor exposición de la reunión.</strong></div>` : ''}
    <p style="font-size:.9rem;line-height:1.6">${esc(t.detalle)}</p>
    ${(() => {
      const rel = (t.comp || []).map((i) => COMPROMISOS[i]).filter(Boolean);
      return rel.length ? `
        <h4 style="font-size:.75rem;letter-spacing:.07em;text-transform:uppercase;color:var(--ink-400);margin:1.2rem 0 .5rem">
          Compromisos asociados</h4>
        <div class="stack" style="gap:.5rem">
          ${rel.map((c) => `
            <div style="border-left:3px solid var(--ink-500);padding-left:.7rem;font-size:.875rem">
              <div style="font-weight:600">${esc(c.compromiso)}</div>
              <div style="color:var(--ink-400);font-size:.75rem;margin-top:.15rem">${esc(c.resp)} · ${esc(c.fecha)}</div>
            </div>`).join('')}
        </div>` : '';
    })()}`);
}

/* ---- Actores ---- */
function viewActores() {
  return `
    ${headline(
      'Actores, sistemas y responsabilidades',
      'Dos de los tres sistemas transaccionales son de terceros: el control de Torrent es por reportería y conciliación, no por acceso al sistema.',
      'Torrent no necesita acceso a SoftLand ni a CISAT para controlar el proceso, pero sí necesita que los reportes de ambos lleguen con estructura fija y campos suficientes para cruzarse entre sí.'
    )}

    ${figura('arquitectura')}

    ${panel('Arquitectura de información', 'Tres capas por las que viaja el dato', `
      <div class="grid-3">
        <div class="state-bar state-bar--definicion" style="padding:.8rem .9rem;background:var(--n-025);border-radius:var(--r-panel)">
          <div style="font-weight:600;margin-bottom:.3rem">1 · Sistemas de origen</div>
          <p style="font-size:.875rem;margin:0;color:var(--ink-400)">
            SoftLand (Forvis Mazars) y CISAT (Pharma ISA). <b>Pertenecen a terceros.</b>
            Torrent no configura, sólo recibe reportes.</p>
        </div>
        <div class="state-bar" style="padding:.8rem .9rem;background:var(--negative-bg);border-radius:var(--r-panel);border-left-color:var(--negative)">
          <div style="font-weight:600;margin-bottom:.3rem">2 · Control local</div>
          <p style="font-size:.875rem;margin:0;color:var(--ink-400)">
            Hoy es <b>enteramente manual</b>: vive en Excel y en el correo.
            <b>Aquí está el riesgo central del proceso.</b></p>
        </div>
        <div class="state-bar state-bar--operando" style="padding:.8rem .9rem;background:var(--n-025);border-radius:var(--r-panel)">
          <div style="font-weight:600;margin-bottom:.3rem">3 · Consolidación en HO</div>
          <p style="font-size:.875rem;margin:0;color:var(--ink-400)">
            SAP T303 / E303 y BPC en India. Recibe el paquete de cierre en D+8.</p>
        </div>
      </div>
      <p style="font-size:.875rem;margin:1rem 0 0;color:var(--ink-400)">
        Cada reporte que no llegue en un formato estable y en la fecha acordada <b>rompe el cierre</b>.
        El cruce orden de compra → factura → despacho → pago es el control que sostiene todo.</p>`)}

    <div class="grid-2">
      ${ACTORES.map((a) => `
        <article class="panel">
          <div class="panel__head">${esc(a.corto)}<span class="panel__unit">${esc(a.tipo)}</span></div>
          <div class="panel__body">
            ${dl([
              ['Personas clave', a.personas.map((p) => esc(p)).join('<br>')],
              ['Sistema', esc(a.sistema)],
              ['Responsabilidad en el proceso', esc(a.resp)]
            ])}
            <div style="font-size:.75rem;color:var(--ink-400)">
              ${(() => {
                const n = TODAS_ACTIVIDADES.filter((x) => norm(x.resp).includes(norm(a.corto.split(' ')[0]))).length;
                return n ? `${n} actividad${n > 1 ? 'es' : ''} del ciclo mensual` : '';
              })()}
            </div>
          </div>
        </article>`).join('')}
    </div>`;
}

/* ---- Diseño ---- */
function viewDiseno() {
  const sevChip = { critico: 'negative', alto: 'definicion', medio: 'pendiente' };
  return `
    ${headline(
      'Sistema de diseño · DISENO.md aplicado a esta interfaz',
      'Existe un lenguaje visual Torrent real y reconocible, pero vive casi por completo como píxeles pegados y cuadros de texto colocados a mano.',
      'Esta aplicación implementa como CSS nativo los componentes que el documento marca como no reutilizables, y fija los valores que el documento deja sin definir.'
    )}

    ${panel('Tipografía', 'Manrope · la tipografía institucional', `
      <div style="display:grid;gap:1.1rem">
        <div>
          <div style="font-size:.75rem;letter-spacing:.07em;text-transform:uppercase;color:var(--ink-400);font-weight:600">Título de portada · 72 pt · SemiBold</div>
          <div style="font-family:var(--font-display);font-weight:600;font-size:3rem;line-height:1;letter-spacing:-.02em;color:var(--torrent-indigo)">Torrent Pharma</div>
        </div>
        <div>
          <div style="font-size:.75rem;letter-spacing:.07em;text-transform:uppercase;color:var(--ink-400);font-weight:600">Titular · ~28 pt · SemiBold</div>
          <div style="font-family:var(--font-display);font-weight:600;font-size:2rem;color:var(--ink-900)">El hallazgo va en el titular</div>
        </div>
        <div>
          <div style="font-size:.75rem;letter-spacing:.07em;text-transform:uppercase;color:var(--ink-400);font-weight:600">Antetítulo · 18 pt · cursiva · violeta</div>
          <div style="font-style:italic;font-size:1.15rem;color:var(--ink-500)">El alcance del dato va en el antetítulo</div>
        </div>
        <div>
          <div style="font-size:.75rem;letter-spacing:.07em;text-transform:uppercase;color:var(--ink-400);font-weight:600">Texto corrido · 16 pt · regular</div>
          <p style="margin:0">Formal, medido, con fuentes. Atribuye a instituciones por nombre. Encuadre comparativo frente a pares nombrados.</p>
        </div>
      </div>
      <div class="note" style="margin-top:1.1rem;margin-bottom:0">
        <strong>Cuatro tipografías alcanzables por herencia.</strong> Una diapositiva que hereda del tema
        recibe Aptos; una que hereda del patrón recibe Arial; una con diseño derivado de Google Slides
        recibe Calibri. Sólo el texto formateado a mano recibe Manrope. Ninguna de las cuatro rutas de
        herencia lleva a la tipografía de la marca.</div>`)}

    ${TOKENS_COLOR.map((g) => panel(g.grupo, 'Tokens de color', `
      <div class="table-wrap">
        <table class="data" style="min-width:560px">
          <thead><tr><th style="width:70px">Muestra</th><th>Token</th><th>Hex</th><th>Uso</th></tr></thead>
          <tbody>
            ${g.items.map((i) => `<tr>
              <td><span style="display:block;width:44px;height:26px;border-radius:4px;background:${i.h};border:1px solid var(--n-200)"></span></td>
              <td class="cell-strong" style="font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.8rem">${esc(i.n)}</td>
              <td style="font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.8rem">${esc(i.h)}</td>
              <td class="cell-muted">${esc(i.u)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`, true)).join('')}

    ${panel('Componentes reconstruidos', 'DISENO.md §4 — todos marcados ▣ existían sólo como píxeles', `
      <div class="grid-3">
        <div>
          <div style="font-size:.75rem;letter-spacing:.07em;text-transform:uppercase;color:var(--ink-400);font-weight:600;margin-bottom:.5rem">4.2 · Tarjeta de KPI</div>
          <article class="kpi">
            <span class="kpi__icon">${svg('report')}</span>
            <div class="kpi__body"><div class="kpi__figure">USD 25.1M</div>
            <div class="kpi__label">Cifra grande en negrita<br>sobre leyenda de dos líneas</div></div>
          </article>
        </div>
        <div>
          <div style="font-size:.75rem;letter-spacing:.07em;text-transform:uppercase;color:var(--ink-400);font-weight:600;margin-bottom:.5rem">4.1 · Tarjeta de panel</div>
          <section class="panel mb0">
            <div class="panel__head">Retail Sales by Segment<span class="panel__unit">USD (2023–2025)</span></div>
            <div class="panel__body" style="font-size:.875rem;color:var(--ink-400)">
              Barra de cabecera azul marino a todo el ancho, texto blanco en negrita centrado, borde fino, radio 4 px.</div>
          </section>
        </div>
        <div>
          <div style="font-size:.75rem;letter-spacing:.07em;text-transform:uppercase;color:var(--ink-400);font-weight:600;margin-bottom:.5rem">4.3 · Tarjeta de insight</div>
          ${insight('Key Insights', ['Relleno lavanda, borde lavanda, radio 8 px.', 'Es la voz editorial: dice qué significan los números.'])}
        </div>
      </div>`)}

    ${panel('Hallazgos del documento', 'Ordenados por severidad', `
      <div class="stack" style="gap:.7rem">
        ${HALLAZGOS_DISENO.map((h) => `
          <div style="border-left:4px solid var(--st-${sevChip[h.sev] === 'negative' ? 'pendiente' : sevChip[h.sev]});padding-left:.85rem;${h.sev === 'critico' ? 'border-left-color:var(--negative)' : ''}">
            <div style="display:flex;gap:.6rem;align-items:center;flex-wrap:wrap;margin-bottom:.2rem">
              <span style="font-weight:600;font-size:.95rem">${esc(h.t)}</span>
              <span class="chip chip--plain" style="${h.sev === 'critico'
                ? 'color:var(--negative);background:var(--negative-bg)'
                : h.sev === 'alto' ? 'color:var(--st-definicion);background:var(--st-definicion-bg)'
                : 'color:var(--st-pendiente);background:var(--st-pendiente-bg)'}">${esc(h.sev)}</span>
            </div>
            <p style="margin:0;font-size:.875rem;color:var(--ink-400);line-height:1.55">${esc(h.d)}</p>
          </div>`).join('')}
      </div>`)}

    ${insight('Qué se corrigió al llevarlo a esta interfaz', [
      '<b>Los seis azules marinos</b> del §2.2 se consolidaron en <code>--ink-900</code> y <code>--ink-700</code>.',
      '<b>Los siete grises</b> de cuatro orígenes distintos se consolidaron en una rampa única de seis pasos.',
      '<b>Los colores semánticos</b>, que el documento deja «sin definir — hoy verde/rojo a ojo», quedaron fijados en valores que aprueban AA.',
      '<b>El gris de leyenda</b> <code>#888888</code> (3.54:1, no aprueba AA) se sustituyó por <code>--ink-400</code> #5A6172, que da 6.6:1. El original se conserva sólo para uso decorativo.',
      '<b>El violeta de marca</b> #9283BE (3.38:1) no se usa en texto pequeño; para eso está <code>--ink-500</code> #5E328C, que da 9.09:1.',
      '<b>La regla del titular</b> del §6.1 — afirmación en el titular, alcance en el antetítulo en cursiva — está codificada como componente y se aplica en todas las secciones.'
    ])}`;
}

/* ---- Glosario ---- */
function viewGlosario() {
  return `
    ${headline(
      'Glosario',
      'Trece términos que atraviesan todo el proceso, de O2C a YMFASUB.',
      'Tomado del Anexo B del documento de proceso.'
    )}
    ${panel('Términos', `${GLOSARIO.length} entradas`, `
      <div class="table-wrap">
        <table class="data">
          <thead><tr><th style="width:230px">Término</th><th>Significado</th></tr></thead>
          <tbody>
            ${GLOSARIO.map((g) => `<tr>
              <td class="cell-strong">${esc(g.t)}</td>
              <td>${esc(g.d)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`, true)}`;
}

/* ============================================================
   Navegación
   ============================================================ */

const VISTAS = [
  { id: 'resumen',     label: 'Resumen',            icon: 'home',      grupo: 'Panorama', render: viewResumen },
  { id: 'archivos',    label: 'Archivos',           icon: 'files',     grupo: 'Panorama', render: viewArchivos,  n: ARCHIVOS.length },
  { id: 'actores',     label: 'Actores y sistemas', icon: 'layers',    grupo: 'Panorama', render: viewActores,   n: ACTORES.length },
  { id: 'procesos',    label: 'Procesos y fases',   icon: 'flow',      grupo: 'El ciclo mensual', render: viewProcesos,   n: TODAS_ACTIVIDADES.length },
  { id: 'calendario',  label: 'Calendario',         icon: 'calendar',  grupo: 'El ciclo mensual', render: viewCalendario, n: CICLO_SEMANAL.length + CICLO_CIERRE.length },
  { id: 'reportes',    label: 'Catálogo de reportes', icon: 'report',  grupo: 'El ciclo mensual', render: viewReportes,   n: REPORTES.length },
  { id: 'raci',        label: 'Matriz RACI',        icon: 'raci',      grupo: 'El ciclo mensual', render: viewRaci,       n: RACI.length },
  { id: 'timeline',    label: 'Timeline',           icon: 'timeline',  grupo: 'Avance y decisiones', render: viewTimeline, n: CONSTRUIDO.length + EN_CURSO.length + NO_INICIADO.length },
  { id: 'riesgos',     label: 'Riesgos y controles',icon: 'risk',      grupo: 'Avance y decisiones', render: viewRiesgos,  n: RIESGOS.length },
  { id: 'pasos',       label: 'Próximos pasos',     icon: 'steps',     grupo: 'Avance y decisiones', render: viewPasos,    n: PASOS.length },
  { id: 'compromisos', label: 'Minuta y compromisos', icon: 'handshake', grupo: 'Avance y decisiones', render: viewCompromisos, n: COMPROMISOS.length },
  { id: 'diseno',      label: 'Sistema de diseño',  icon: 'palette',   grupo: 'Referencia', render: viewDiseno },
  { id: 'glosario',    label: 'Glosario',           icon: 'book',      grupo: 'Referencia', render: viewGlosario,  n: GLOSARIO.length }
];

let vistaActual = null;

function construirNav() {
  const nav = $('#nav');
  let grupo = null;
  nav.innerHTML = VISTAS.map((v) => {
    const head = v.grupo !== grupo ? (grupo = v.grupo, `<div class="nav__group">${esc(v.grupo)}</div>`) : '';
    return `${head}
      <button class="nav__item" type="button" data-vista="${v.id}">
        ${svg(v.icon, 'nav__icon')}
        <span class="nav__label">${esc(v.label)}</span>
        ${v.n ? `<span class="nav__count">${v.n}</span>` : ''}
      </button>`;
  }).join('');
}

function irA(id, push = true) {
  const v = VISTAS.find((x) => x.id === id) || VISTAS[0];
  if (vistaActual === v.id) { $('#main').scrollTo({ top: 0 }); return; }
  vistaActual = v.id;

  $('#view').innerHTML = `<div class="view is-active">${v.render()}</div>`;
  $('#topbar-title').textContent = v.label;
  $$('.nav__item').forEach((b) => {
    const on = b.dataset.vista === v.id;
    b.setAttribute('aria-current', on ? 'page' : 'false');
  });

  if (id === 'procesos')   pintarProcesos();
  if (id === 'reportes')   pintarReportes();
  if (id === 'calendario') pintarCalendario();

  if (push && location.hash !== `#${v.id}`) history.pushState({ v: v.id }, '', `#${v.id}`);
  window.scrollTo({ top: 0 });
  $('#nav').classList.remove('is-open');
  drawer.close();
}

/* ============================================================
   Arranque
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  drawer.init();
  lightbox.init();
  construirNav();

  $('#topbar-meta').innerHTML = `
    <span>Sociedad <b>${esc(META.sociedad)}</b></span>
    <span>Planta <b>${esc(META.planta)}</b></span>
    <span>Documento fuente <b>${esc(META.version)} · ${esc(META.fuenteFecha)}</b></span>`;

  $('#menu-toggle').addEventListener('click', () => $('#nav').classList.toggle('is-open'));
  $('#btn-print').addEventListener('click', () => window.print());

  /* Delegación de eventos: un solo escuchador para todo el tablero. */
  document.addEventListener('click', (e) => {
    const nav = e.target.closest('[data-vista]');
    if (nav) return irA(nav.dataset.vista);

    const goto = e.target.closest('[data-goto]');
    if (goto) return irA(goto.dataset.goto);

    const act = e.target.closest('[data-act]');
    if (act) return abrirActividad(Number(act.dataset.act));

    const rep = e.target.closest('[data-rep]');
    if (rep) { $$('tr.is-open').forEach((r) => r.classList.remove('is-open'));
               rep.classList.add('is-open'); return abrirReporte(rep.dataset.rep); }

    const cal = e.target.closest('[data-cal]');
    if (cal) { const [t, i] = cal.dataset.cal.split(':'); return abrirCalendario(t, Number(i)); }

    const tema = e.target.closest('[data-tema]');
    if (tema) return abrirTema(tema.dataset.tema);

    const fig = e.target.closest('[data-fig]');
    if (fig) return lightbox.open(fig.dataset.fig);

    const lang = e.target.closest('[data-lang]');
    if (lang) return lightbox.setLang(lang.dataset.lang);

    /* Filtros de estado */
    const pill = e.target.closest('.pill[data-estado]');
    if (pill) {
      const id = pill.closest('[data-filtros]').dataset.filtros;
      const k = pill.dataset.estado;
      const set = filtros[id].estado;
      set.has(k) ? set.delete(k) : set.add(k);
      pill.setAttribute('aria-pressed', set.has(k));
      return repintar(id);
    }

    /* Filtro de ciclo (calendario) */
    const ciclo = e.target.closest('.pill[data-ciclo]');
    if (ciclo) {
      filtros.calendario.ciclo = ciclo.dataset.ciclo;
      $$('.pill[data-ciclo]').forEach((p) =>
        p.setAttribute('aria-pressed', p.dataset.ciclo === ciclo.dataset.ciclo));
      return repintar('calendario');
    }
  });

  /* Teclado en filas clicables */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const row = e.target.closest('[data-cal],[data-rep]');
    if (row) { e.preventDefault(); row.click(); }
  });

  /* Búsqueda */
  document.addEventListener('input', (e) => {
    const inp = e.target.closest('[data-buscar]');
    if (!inp) return;
    const id = inp.dataset.buscar;
    filtros[id].texto = norm(inp.value.trim());
    repintar(id);
  });

  window.addEventListener('popstate', () => irA(location.hash.slice(1) || 'resumen', false));

  irA(location.hash.slice(1) || 'resumen', false);
});

function repintar(id) {
  if (id === 'procesos')   pintarProcesos();
  if (id === 'reportes')   pintarReportes();
  if (id === 'calendario') pintarCalendario();
}
