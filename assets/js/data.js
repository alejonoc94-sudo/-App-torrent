/* ============================================================
   Torrent Pharma LATAM · Datos de la hoja de ruta
   ------------------------------------------------------------
   Todo el contenido de este archivo está transcrito de los
   documentos de la carpeta "Claude / App Torrent Latam":

     · 2026.08.06_TORRENT CHILE_Proceso O2C y Cierre Contable_v1.pdf
     · Minuta_Alineamiento_Cierre_Mazars_Torrent.docx (23-jul-2026)
     · DISENO.md (sistema de diseño aplicado a esta interfaz)

   Escala de estado (PDF O2C §2.2):
     operando   verde  — el entregable ya se produjo al menos una vez, con evidencia
     definicion ámbar  — acordado o en discusión, sin entregable estable
     pendiente  gris   — no ha empezado
   ============================================================ */

const META = {
  entidad:  'Torrent Pharma Chile SpA',
  sociedad: 'T303',
  planta:   'E303',
  version:  'v1.0',
  fuenteFecha: '6 de agosto de 2026',
  preparado: 'Nicolás Navas — Finanzas LATAM, Torrent Pharma',
  audiencia: 'Torrent Pharma Chile · Finanzas LATAM · Corporate Finance HO (India) · Forvis Mazars · Pharma ISA',
  clasificacion: 'Documento de uso interno — contiene acuerdos aún no confirmados por terceros'
};

const ESTADOS = {
  operando:   { label: 'Operando',      desc: 'El entregable ya se produjo al menos una vez, con evidencia documental.' },
  definicion: { label: 'En definición', desc: 'Acordado o en discusión, pero todavía sin un entregable estable.' },
  pendiente:  { label: 'Pendiente',     desc: 'No ha empezado.' }
};

/* ---- 1 · Archivos de la carpeta (§ acceso a documentos) ---- */
const ARCHIVOS = [
  {
    nombre: '2026.08.06_TORRENT CHILE_Proceso O2C y Cierre Contable_v1.pdf',
    ext: 'pdf',
    meta: '19 páginas · v1.0 · 6-ago-2026 · Nicolás Navas',
    desc: 'Documento maestro. Define el flujo end-to-end del ciclo Order-to-Cash y del cierre contable de Torrent Pharma Chile: mapa de proceso por fases, calendario mensual de días hábiles, catálogo de 16 reportes, matriz RACI, riesgos y timeline de construcción.',
    aporta: ['Fases y actividades', 'Calendario', 'Reportes', 'RACI', 'Riesgos', 'Próximos pasos', 'Timeline'],
    secciones: 15,
    ir: 'procesos'
  },
  {
    nombre: 'Minuta_Alineamiento_Cierre_Mazars_Torrent.docx',
    ext: 'docx',
    meta: 'Reunión de 39 min · 23-jul-2026 · elaboró Nicolás Navas',
    desc: 'Minuta del alineamiento contable entre Torrent y Forvis Mazars. Cubre el calendario de pre-cierre, el proyecto de facturación electrónica en Chile y diez partidas contables abiertas, con su tabla de compromisos por responsable y fecha.',
    aporta: ['12 compromisos', '10 temas contables', 'Cadencia semanal'],
    secciones: 10,
    ir: 'compromisos'
  },
  {
    nombre: 'DISENO.md',
    ext: 'md',
    meta: 'Sistema de diseño · 8 secciones · 21-ago-2026',
    desc: 'Ingeniería inversa del lenguaje visual Torrent a partir de tres presentaciones. Tipografía Manrope, paleta índigo/violeta, componentes y retícula. Es la base de estilo de esta aplicación: tokens, colores, fuentes y patrones de componente salen de aquí.',
    aporta: ['Tokens de color', 'Tipografía', 'Componentes', 'Retícula', 'Accesibilidad'],
    secciones: 8,
    ir: 'diseno'
  },
  {
    nombre: 'Fig1_Information Architecture_Torrent Chile_EN.png',
    ext: 'png', fig: 'arquitectura',
    meta: 'Figura 1 · Arquitectura de información · 3060 × 1307 px',
    desc: 'Las tres capas por las que viaja el dato: sistemas de origen en manos de terceros, capa de control local manual en Excel y correo, y capa de consolidación en HO. El riesgo central está en la capa intermedia.',
    aporta: ['Arquitectura', 'Sistemas', 'Capas de control'],
    secciones: 3,
    ir: 'actores'
  },
  {
    nombre: 'Fig2_O2C Process Map_Torrent Chile_EN.png',
    ext: 'png', fig: 'mapa',
    meta: 'Figura 2 · Mapa del proceso · 3216 × 1680 px',
    desc: 'Mapa del proceso O2C y cierre contable por stakeholder y por fase del mes. Cada caja lleva una barra de color a la izquierda que indica si la actividad ya opera, está en definición o no ha empezado.',
    aporta: ['5 fases', '27 actividades', 'Estado por actividad'],
    secciones: 5,
    ir: 'procesos'
  },
  {
    nombre: 'Fig3_Timeline Construccion Proceso_Torrent Chile.png',
    ext: 'png', fig: 'timeline',
    meta: 'Figura 3 · Timeline de construcción · español e inglés · 3216 × 1322 px',
    desc: 'Dos bandas: lo recorrido de marzo a agosto de 2026 con evidencia documental, y la secuencia propuesta de agosto en adelante. La franja central marca la fecha del documento. Es la única figura que existe en las dos versiones de idioma.',
    aporta: ['9 hitos construidos', '5 frentes en curso', '5 pendientes', 'ES + EN'],
    secciones: 3,
    ir: 'timeline'
  }
];

/* ---- 2 · Actores y sistemas (PDF §3) ---- */
const ACTORES = [
  {
    id: 'chile', nombre: 'Torrent Pharma Chile', corto: 'Torrent Chile',
    personas: ['José Manuel Herrera'],
    sistema: 'CISAT (consulta) · SoftLand (consulta)',
    tipo: 'Torrent',
    resp: 'Validación comercial de la orden de compra, cupo de crédito y stock; instrucción de despacho; conciliación de orden de compra contra factura contra despacho; validación del inventario físico; corte de despachos y facturación del mes.'
  },
  {
    id: 'latam', nombre: 'Torrent Pharma · Finanzas LATAM', corto: 'Finanzas LATAM',
    personas: ['Nicolás Navas', 'Emilio Jiménez', 'Osvaldo Gómez', 'Jorge Barreto'],
    sistema: 'Excel · banca electrónica',
    tipo: 'Torrent',
    resp: 'Dueño del proceso end-to-end. Control de precios y crédito, envío de la cartola bancaria, aplicación de pagos, gestión de cartera, conciliación intercompañía, mapeo a BPC, YMFASUB, Cash Balance y envío del paquete de cierre a HO.'
  },
  {
    id: 'mazars', nombre: 'Forvis Mazars', corto: 'Forvis Mazars',
    personas: ['Yulmaris Valderrama (AOS Manager)', 'Oscary Vicent Pacheco', 'Carlos Castillo', 'Cristhian Espinoza'],
    sistema: 'SoftLand',
    tipo: 'Tercero — BPO contable y AOS',
    resp: 'Emisión de la factura electrónica y su reporte al SII; contabilidad y cierre de libros; cuentas por cobrar, cuentas por pagar y facturación; causación de impuestos; balance de comprobación y estados financieros; cumplimiento tributario chileno.'
  },
  {
    id: 'isa', nombre: 'Pharma ISA', corto: 'Pharma ISA',
    personas: ['Contraparte operativa por definir'],
    sistema: 'CISAT',
    tipo: 'Tercero — operador logístico y 3PL',
    resp: 'Recepción de la importación, almacenamiento, control de inventario por lote y vencimiento, picking, packing y despacho al cliente; reporte de inventario y de closing stock; mermas y devoluciones.'
  },
  {
    id: 'ho', nombre: 'Corporate Finance HO (India)', corto: 'HO India',
    personas: ['Parth K. Shah', 'Malay R. Shah', 'Dhruvi Mer'],
    sistema: 'SAP T303 / E303 · BPC',
    tipo: 'Casa matriz',
    resp: 'Definición del escenario SAP y del alcance de compras, inventario y S&D; validación de la conciliación intercompañía; consolidación en BPC; requerimientos de formato (inventory working file, IC file) y de cumplimiento.'
  },
  {
    id: 'scm', nombre: 'SCM y logística de grupo', corto: 'SCM grupo',
    personas: ['Jorge Castañeda San Juan', 'S. P. Patel', 'Sanjeev Bhardwaj'],
    sistema: 'SAP',
    tipo: 'Grupo',
    resp: 'Embarque desde India, seguimiento del tránsito marítimo, desaduanaje y entrega al 3PL; registro de la venta intercompañía en los libros de TPL India.'
  }
];

/* ---- 3 · Fases y actividades (PDF §6) ---- */
const FASES = [
  {
    n: 1, titulo: 'Operación diaria', en: 'Daily operation',
    cuando: 'Día 1 al fin de mes',
    actividades: [
      { act: 'Recepción de la orden de compra del cliente', resp: 'Cliente / canal',
        input: 'Lista de precios vigente y catálogo de SKU habilitados en Chile',
        output: 'Orden de compra formal con SKU, cantidad y precio', estado: 'definicion' },
      { act: 'Validación de la orden: SKU, precio, cupo de crédito y stock disponible', resp: 'Torrent Chile',
        input: 'Orden de compra, política de precios, estado de cartera del cliente, stock en CISAT',
        output: 'Orden aprobada e instrucción de despacho a Pharma ISA', estado: 'definicion' },
      { act: 'Picking, packing y despacho', resp: 'Pharma ISA (CISAT)',
        input: 'Instrucción de despacho aprobada',
        output: 'Guía de despacho, salida de stock registrada por lote', estado: 'definicion' },
      { act: 'Emisión de la factura electrónica y reporte al SII', resp: 'Forvis Mazars (SoftLand)',
        input: 'Guía de despacho, orden de compra aprobada, datos del cliente y régimen tributario',
        output: 'Factura electrónica (DTE) emitida y aceptada por el SII', estado: 'definicion' },
      { act: 'Control de precios, crédito y excepciones del día', resp: 'Finanzas LATAM',
        input: 'Reporte de facturación del día o de la semana',
        output: 'Aprobaciones, alertas y bloqueos de despacho', estado: 'definicion' }
    ]
  },
  {
    n: 2, titulo: 'Cadencia semanal', en: 'Weekly cadence',
    cuando: 'Viernes a lunes/martes',
    actividades: [
      { act: 'Descarga y envío de la cartola bancaria', resp: 'Finanzas LATAM (Torrent)',
        input: 'Accesos a banca electrónica (Citi, HSBC)',
        output: 'Cartola bancaria semanal enviada a Forvis Mazars el viernes', estado: 'operando' },
      { act: 'Reporte semanal de inventario y despachos', resp: 'Pharma ISA (CISAT)',
        input: 'Movimientos de la semana en CISAT',
        output: 'Stock inicial, entradas, salidas, despachos y stock final por SKU y lote', estado: 'pendiente' },
      { act: 'Paquete semanal de reportería contable', resp: 'Forvis Mazars (SoftLand)',
        input: 'Cartola del viernes anterior, documentos de venta y de compra de la semana',
        output: 'Cuatro reportes: órdenes de compra contra facturas; cartera con antigüedad; cuentas por pagar; causación de impuestos e inventarios', estado: 'definicion' },
      { act: 'Conciliación orden de compra contra factura contra despacho', resp: 'Torrent Chile + Finanzas LATAM',
        input: 'Reporte de Mazars, reporte de CISAT y órdenes de compra originales',
        output: 'Log de excepciones con diferencias de precio, cantidad o SKU y su responsable', estado: 'pendiente' },
      { act: 'Aplicación de pagos e identificación de abonos de clientes', resp: 'Forvis Mazars + Finanzas LATAM',
        input: 'Cartola bancaria y cartera abierta',
        output: 'Pagos aplicados y partidas no identificadas escaladas', estado: 'definicion' },
      { act: 'Comité semanal de cartera', resp: 'Torrent Chile + Finanzas LATAM',
        input: 'Cartera con antigüedad actualizada',
        output: 'Acciones de cobro, clientes a bloquear y compromisos de pago', estado: 'pendiente' }
    ]
  },
  {
    n: 3, titulo: 'Pre-cierre', en: 'Pre-close',
    cuando: 'D-3 a D+2',
    actividades: [
      { act: 'Corte de despachos y de facturación del mes', resp: 'Torrent Chile',
        input: 'Calendario de cierre acordado con las tres partes',
        output: 'Acta de cutoff: último despacho y última factura del mes', estado: 'pendiente' },
      { act: 'Cutoff intercompañía: embarques en tránsito y arribos', resp: 'Finanzas LATAM + SCM',
        input: 'Estado de embarques, documentos de importación y fechas de desaduanaje',
        output: 'Aviso de arribos y de compras intercompañía a HO', estado: 'operando' },
      { act: 'Inventario de cierre valorizado por lote', resp: 'Pharma ISA (CISAT)',
        input: 'Movimientos del mes cerrados en CISAT',
        output: 'Closing stock por SKU, lote y vencimiento, con valorización', estado: 'pendiente' },
      { act: 'Validación del inventario físico contra CISAT y contra libros', resp: 'Torrent Chile',
        input: 'Closing stock de CISAT y saldo contable de inventario en SoftLand',
        output: 'Ajustes de inventario aprobados y explicación de diferencias', estado: 'pendiente' },
      { act: 'Cierre de libros de ventas, de compras y mayor', resp: 'Forvis Mazars (SoftLand)',
        input: 'Documentos del mes, cartola, ajustes de inventario y provisiones',
        output: 'Libros del SII y mayor contable cerrados', estado: 'operando' }
    ]
  },
  {
    n: 4, titulo: 'Cierre contable', en: 'Accounting close',
    cuando: 'D+3 a D+6',
    actividades: [
      { act: 'Balance de comprobación y estados financieros', resp: 'Forvis Mazars (SoftLand)',
        input: 'Libros cerrados y ajustes aprobados',
        output: 'Trial Balance de TPCS y estados financieros del mes', estado: 'operando' },
      { act: 'Reporte de mermas, vencimientos y devoluciones', resp: 'Pharma ISA (CISAT)',
        input: 'Novedades del mes en bodega',
        output: 'Ajustes valorizados para contabilización', estado: 'pendiente' },
      { act: 'Conciliación intercompañía y cuentas por pagar IC', resp: 'Finanzas LATAM + HO',
        input: 'Facturas intercompañía de TPL India y saldo en libros de TPCS',
        output: 'IC reconciliation e IC payable conciliados y firmados', estado: 'operando' },
      { act: 'Mapeo contable a BPC y asientos de banco', resp: 'Finanzas LATAM',
        input: 'Trial Balance, cartola del mes y plan de cuentas del grupo',
        output: 'Bank statement con asientos contables y BPC mapping', estado: 'operando' },
      { act: 'YMFASUB e inventory working file', resp: 'Finanzas LATAM',
        input: 'Trial Balance, closing stock valorizado y costeo de importación',
        output: 'YMFASUB del mes e inventory working file en formato de grupo', estado: 'definicion' }
    ]
  },
  {
    n: 5, titulo: 'Reporte a HO', en: 'Reporting to HO',
    cuando: 'D+7 a D+10',
    actividades: [
      { act: 'Envío del paquete de cierre a Corporate Finance', resp: 'Finanzas LATAM',
        input: 'Trial Balance, BPC mapping, YMFASUB, IC files e inventory working file',
        output: 'Paquete de cierre mensual completo enviado a HO', estado: 'operando' },
      { act: 'Cash Balance del mes', resp: 'Finanzas LATAM',
        input: 'Cartolas del mes de Citi y HSBC',
        output: 'Cash Balance consolidado del mes', estado: 'operando' },
      { act: 'Indicadores de cartera y de O2C', resp: 'Finanzas LATAM + Torrent Chile',
        input: 'Cartera con antigüedad y facturación del mes',
        output: 'DSO, cartera vencida por tramo y cumplimiento del ciclo de facturación', estado: 'pendiente' },
      { act: 'Validación de la conciliación intercompañía contra SAP', resp: 'Corporate Finance HO',
        input: 'IC files recibidos de la subsidiaria',
        output: 'Intercompañía confirmada para consolidación', estado: 'operando' },
      { act: 'Consolidación en BPC', resp: 'Corporate Finance HO',
        input: 'Paquete de cierre validado',
        output: 'Estados financieros consolidados del grupo', estado: 'operando' },
      { act: 'Atención de consultas de HO y de auditoría', resp: 'Forvis Mazars',
        input: 'Requerimientos de información',
        output: 'Soportes, aclaraciones y ajustes si aplica', estado: 'operando' }
    ]
  }
];

/* ---- 4 · Ciclo semanal (PDF §7.1) ---- */
const CICLO_SEMANAL = [
  { dia: 'Viernes', act: 'Descarga de cartolas y envío a Forvis Mazars', resp: 'Finanzas LATAM',
    entregable: 'Cartola bancaria semanal (Citi y HSBC)', estado: 'operando' },
  { dia: 'Viernes', act: 'Cierre de la semana operativa en bodega', resp: 'Pharma ISA',
    entregable: 'Movimientos de la semana cerrados en CISAT', estado: 'pendiente' },
  { dia: 'Lunes', act: 'Reporte semanal de inventario y despachos', resp: 'Pharma ISA',
    entregable: 'Stock inicial, entradas, salidas y stock final por lote', estado: 'pendiente' },
  { dia: 'Lunes o martes', act: 'Paquete semanal de reportería contable', resp: 'Forvis Mazars',
    entregable: 'Órdenes de compra contra facturas · cartera con antigüedad · cuentas por pagar · causación de impuestos e inventarios', estado: 'definicion' },
  { dia: 'Martes', act: 'Aplicación de pagos de clientes identificados en la cartola', resp: 'Forvis Mazars',
    entregable: 'Cartera actualizada con pagos aplicados', estado: 'definicion' },
  { dia: 'Martes o miércoles', act: 'Conciliación orden de compra contra factura contra despacho', resp: 'Torrent Chile + Finanzas LATAM',
    entregable: 'Log de excepciones con responsable y fecha de solución', estado: 'pendiente' },
  { dia: 'Miércoles', act: 'Comité de cartera (30 minutos)', resp: 'Torrent Chile + Finanzas LATAM',
    entregable: 'Acciones de cobro y decisiones de bloqueo de crédito', estado: 'pendiente' },
  { dia: 'Jueves', act: 'Seguimiento de excepciones abiertas de la semana anterior', resp: 'Finanzas LATAM',
    entregable: 'Excepciones cerradas o escaladas', estado: 'pendiente' }
];

/* ---- 5 · Ciclo de cierre mensual (PDF §7.2 — PROPUESTA) ---- */
const CICLO_CIERRE = [
  { dia: 'D-3', act: 'Recordatorio de cierre y confirmación de la fecha de cutoff a las tres partes', resp: 'Finanzas LATAM',
    entregable: 'Comunicación de cierre enviada', estado: 'pendiente' },
  { dia: 'D-2', act: 'Corte de recepción de órdenes de compra para despacho dentro del mes', resp: 'Torrent Chile',
    entregable: 'Órdenes en cola identificadas y priorizadas', estado: 'pendiente' },
  { dia: 'D-1 / D', act: 'Corte de despachos y de facturación del mes', resp: 'Torrent Chile + Pharma ISA + Forvis Mazars',
    entregable: 'Acta de cutoff con último despacho y última factura', estado: 'pendiente' },
  { dia: 'D', act: 'Cutoff intercompañía: confirmación de embarques en tránsito y de arribos del mes', resp: 'Finanzas LATAM + SCM',
    entregable: 'Aviso de arribos y compras intercompañía a HO', estado: 'operando' },
  { dia: 'D+1', act: 'Inventario de cierre valorizado por SKU, lote y vencimiento', resp: 'Pharma ISA',
    entregable: 'Closing stock del mes', estado: 'pendiente' },
  { dia: 'D+2', act: 'Validación del inventario físico contra CISAT y contra libros; envío de ajustes', resp: 'Torrent Chile',
    entregable: 'Ajustes de inventario aprobados', estado: 'pendiente' },
  { dia: 'D+3', act: 'Cierre de libros de ventas, de compras y mayor', resp: 'Forvis Mazars',
    entregable: 'Libros del SII y mayor cerrados', estado: 'operando' },
  { dia: 'D+4', act: 'Conciliación intercompañía e IC payable con HO', resp: 'Finanzas LATAM + HO',
    entregable: 'IC reconciliation e IC payable firmados', estado: 'operando' },
  { dia: 'D+5', act: 'Balance de comprobación y estados financieros del mes', resp: 'Forvis Mazars',
    entregable: 'Trial Balance de TPCS y estados financieros', estado: 'operando' },
  { dia: 'D+6', act: 'BPC mapping, asientos de banco, YMFASUB e inventory working file', resp: 'Finanzas LATAM',
    entregable: 'Archivos de consolidación completos', estado: 'operando' },
  { dia: 'D+7', act: 'Revisión cruzada del paquete antes del envío', resp: 'Finanzas LATAM (E. Jiménez, O. Gómez)',
    entregable: 'Paquete revisado y observaciones resueltas', estado: 'operando' },
  { dia: 'D+8', act: 'Envío del paquete de cierre a Corporate Finance en India', resp: 'Finanzas LATAM',
    entregable: 'Paquete de cierre mensual enviado', estado: 'operando' },
  { dia: 'D+9', act: 'Cash Balance del mes y conciliación final de tesorería', resp: 'Finanzas LATAM',
    entregable: 'Cash Balance del mes', estado: 'operando' },
  { dia: 'D+10', act: 'Reporte de cartera e indicadores del ciclo (DSO, antigüedad, cumplimiento)', resp: 'Finanzas LATAM + Torrent Chile',
    entregable: 'Tablero mensual de O2C y cartera', estado: 'pendiente' }
];

/* ---- 6 · Catálogo de reportes (PDF §8) ---- */
const REPORTES = [
  { n: 1,  reporte: 'Cartola bancaria semanal', emisor: 'Torrent LATAM', receptor: 'Forvis Mazars', frecuencia: 'Semanal (viernes)', sistema: 'Banca electrónica Citi y HSBC', estado: 'operando' },
  { n: 2,  reporte: 'Pagos de la semana (TPCS Payments)', emisor: 'Torrent LATAM', receptor: 'Interno y Mazars', frecuencia: 'Semanal', sistema: 'Excel + soportes en PDF', estado: 'operando' },
  { n: 3,  reporte: 'Órdenes de compra contra facturas, con SKU, precio, cantidad e impuestos', emisor: 'Forvis Mazars', receptor: 'Torrent', frecuencia: 'Semanal (lunes o martes)', sistema: 'SoftLand', estado: 'definicion' },
  { n: 4,  reporte: 'Cartera (cuentas por cobrar) con antigüedad y cobranza pendiente', emisor: 'Forvis Mazars', receptor: 'Torrent', frecuencia: 'Mensual hoy; semanal propuesto', sistema: 'SoftLand', estado: 'definicion' },
  { n: 5,  reporte: 'Cuentas por pagar', emisor: 'Forvis Mazars', receptor: 'Torrent', frecuencia: 'Semanal', sistema: 'SoftLand', estado: 'operando' },
  { n: 6,  reporte: 'Reporte de facturación y libro de ventas del SII', emisor: 'Forvis Mazars', receptor: 'Torrent', frecuencia: 'Semanal y mensual', sistema: 'SoftLand', estado: 'definicion' },
  { n: 7,  reporte: 'Causación de impuestos e inventarios', emisor: 'Forvis Mazars', receptor: 'Torrent', frecuencia: 'Semanal', sistema: 'SoftLand', estado: 'definicion' },
  { n: 8,  reporte: 'Inventario y despachos de la semana', emisor: 'Pharma ISA', receptor: 'Torrent', frecuencia: 'Semanal', sistema: 'CISAT', estado: 'pendiente' },
  { n: 9,  reporte: 'Closing stock valorizado por lote e inventory working file', emisor: 'Pharma ISA + Torrent LATAM', receptor: 'HO', frecuencia: 'Mensual', sistema: 'CISAT + Excel', estado: 'pendiente' },
  { n: 10, reporte: 'IC reconciliation e IC payable', emisor: 'Torrent LATAM', receptor: 'HO', frecuencia: 'Mensual', sistema: 'Excel + SAP', estado: 'operando' },
  { n: 11, reporte: 'Balance de comprobación (Trial Balance TPCS)', emisor: 'Forvis Mazars', receptor: 'Torrent', frecuencia: 'Mensual', sistema: 'SoftLand', estado: 'operando' },
  { n: 12, reporte: 'Bank statement con asientos contables y BPC mapping', emisor: 'Torrent LATAM', receptor: 'HO', frecuencia: 'Mensual', sistema: 'Excel', estado: 'operando' },
  { n: 13, reporte: 'YMFASUB', emisor: 'Torrent LATAM', receptor: 'HO', frecuencia: 'Mensual', sistema: 'Excel / SAP', estado: 'operando' },
  { n: 14, reporte: 'Cash Balance', emisor: 'Torrent LATAM', receptor: 'HO', frecuencia: 'Mensual (con corte semanal)', sistema: 'Excel', estado: 'operando' },
  { n: 15, reporte: 'Memo de flujo contable y formalidades tributarias de Chile', emisor: 'Torrent + Forvis Mazars', receptor: 'HO', frecuencia: 'Una vez, con actualización anual', sistema: 'Documento', estado: 'pendiente' },
  { n: 16, reporte: 'Tablero de O2C y cartera con indicadores (DSO, antigüedad)', emisor: 'Torrent LATAM', receptor: 'Dirección', frecuencia: 'Mensual', sistema: 'Excel o Power BI', estado: 'pendiente' }
];

/* ---- 7 · Matriz RACI (PDF §9) ---- */
const RACI_ACTORES = ['Torrent Chile', 'Finanzas LATAM', 'Forvis Mazars', 'Pharma ISA', 'HO India'];
const RACI = [
  { act: 'Validación comercial y de crédito de la orden',        v: ['R', 'A', 'I', 'C', '—'] },
  { act: 'Despacho y control de inventario',                     v: ['C', 'A', 'I', 'R', 'I'] },
  { act: 'Emisión de la factura electrónica y reporte al SII',   v: ['C', 'A', 'R', 'I', 'I'] },
  { act: 'Conciliación orden de compra contra factura contra despacho', v: ['R', 'A', 'C', 'C', 'I'] },
  { act: 'Envío de la cartola bancaria y aplicación de pagos',   v: ['I', 'R / A', 'R', '—', '—'] },
  { act: 'Gestión de cobranza y cartera',                        v: ['R', 'A', 'C', '—', 'I'] },
  { act: 'Corte de despachos y facturación del mes',             v: ['R', 'A', 'C', 'C', 'I'] },
  { act: 'Inventario de cierre y su validación',                 v: ['R', 'A', 'C', 'R', 'I'] },
  { act: 'Cierre de libros y balance de comprobación',           v: ['C', 'A', 'R', 'I', 'I'] },
  { act: 'Conciliación intercompañía',                           v: ['I', 'R', 'C', '—', 'A'] },
  { act: 'BPC mapping, YMFASUB y paquete de cierre',             v: ['I', 'R / A', 'C', '—', 'C'] },
  { act: 'Consolidación en BPC',                                 v: ['—', 'C', '—', '—', 'R / A'] },
  { act: 'Cumplimiento tributario chileno',                      v: ['C', 'A', 'R', 'I', 'I'] },
  { act: 'Definición del escenario SAP T303',                    v: ['I', 'C', '—', '—', 'R / A'] }
];

/* ---- 8 · Timeline de construcción (PDF §11) ---- */
const CONSTRUIDO = [
  { cuando: 'Marzo 2026', hito: 'Estructura empresarial de Chile creada en SAP: sociedad T303 y planta E303',
    evidencia: 'CRF HO-25-0080 y desarrollos asociados' },
  { cuando: 'Marzo 2026 (ETD 8-mar, ETA 30-may)', hito: 'Embarque intercompañía desde India despachado y registrado en los libros de TPL',
    evidencia: 'Facturas 9120583891, 9120583892, 9120534457, 9120534521; BL HLCUBO1260346614 y HLCUBO1260311096' },
  { cuando: '18 al 20 de junio de 2026', hito: 'Mercancía desaduanada y recibida en el 3PL Pharma ISA',
    evidencia: 'Confirmación de SCM en la cadena de correo del 15 de junio' },
  { cuando: 'Junio 2026', hito: 'Cierre de Q1 FY26-27 con conciliación intercompañía',
    evidencia: 'Inter co reco TPCS June 26; IC payable June 26; Chile Closing Q1 FY 2026-27' },
  { cuando: 'Julio 2026', hito: 'Cierre contable mensual completo de julio 2026',
    evidencia: 'TPCS Chile Trial Balance FY26-27 Jul; YMFASUB Jul 26; Bank Statement TPCS accounting entries and BPC mapping Jul 2026; Movimientos cierre Chile Jul 2026' },
  { cuando: 'Julio y agosto 2026', hito: 'Cadencia semanal de pagos operando',
    evidencia: 'TPCS Payments Semana 1 a 4 de julio y Semana 1 de agosto, con soportes' },
  { cuando: 'Agosto 2026', hito: 'Cash Balance mensual con corte semanal',
    evidencia: 'Cash Balance August 2026; Citi August 2026; HSBC August 2026' },
  { cuando: 'Cierre de julio 2026', hito: 'Acuerdo de pagos con Forvis Mazars vía cartola bancaria semanal',
    evidencia: 'Correo del 6 de agosto de 2026, punto 2' },
  { cuando: '6 de agosto de 2026', hito: 'Cuatro acuerdos de reportería fijados con Forvis Mazars',
    evidencia: 'Correo del 6 de agosto de 2026, puntos 1 a 4, y respuesta de Forvis Mazars del mismo día' }
];

const EN_CURSO = [
  { frente: 'Muestra de formato de los cuatro reportes semanales', resp: 'Forvis Mazars',
    falta: 'Recibir la muestra, validar que cubra los campos mínimos que pide HO y congelar el formato' },
  { frente: 'Revisión a fondo de la plataforma CISAT', resp: 'Torrent Chile + Pharma ISA',
    falta: 'Sesión técnica con Pharma ISA para inventariar qué reportes entrega CISAT, con qué campos y con qué frecuencia' },
  { frente: 'Detalle del flujo por etapa con el equipo local', resp: 'Torrent Chile + Finanzas LATAM',
    falta: 'Cerrar la sesión de trabajo iniciada el 6 de agosto y comunicar el resultado por la cadena de correo con HO' },
  { frente: 'Inventory working file e IC file de T303', resp: 'Finanzas LATAM + HO',
    falta: 'Replicar el formato que HO usa hoy para México (T300) y validarlo con Corporate Finance' },
  { frente: 'Escenario SAP T303: compras, inventario y S&D', resp: 'Corporate Finance y ITD en HO',
    falta: 'Feasibility check de la creación de la factura de venta y definición de organización de compras, maestro de materiales y condiciones de precio' }
];

const NO_INICIADO = [
  { pendiente: 'Definición del proceso de cobranza', dueno: 'Torrent Chile + Finanzas LATAM, con Forvis Mazars',
    porque: 'Sin política de crédito, antigüedad, escalamiento y DSO objetivo, la primera venta local a crédito queda sin control de recaudo' },
  { pendiente: 'Memo de flujo contable y formalidades tributarias de Chile', dueno: 'Finanzas LATAM con Forvis Mazars',
    porque: 'Es un requerimiento explícito de Corporate Finance desde el 4 de agosto y condiciona el registro de la venta local, el IVA de 19 por ciento, la factura electrónica y los derechos de importación' },
  { pendiente: 'Reporte semanal de inventario y despachos desde CISAT', dueno: 'Pharma ISA',
    porque: 'Sin él no hay forma de conciliar despacho contra factura ni de validar el closing stock' },
  { pendiente: 'Calendario de cierre firmado por las tres partes', dueno: 'Finanzas LATAM',
    porque: 'Hoy las fechas son una expectativa de Torrent, no un compromiso de los terceros' },
  { pendiente: 'Tablero mensual de O2C y cartera con indicadores', dueno: 'Finanzas LATAM',
    porque: 'Sin indicadores no se puede medir si el proceso mejora ni sustentar decisiones de crédito' }
];

/* ---- 9 · Riesgos y controles (PDF §12) ---- */
const RIESGOS = [
  { riesgo: 'Falta de segregación de funciones en el ciclo de venta',
    porque: 'Forvis Mazars emite la factura y además la contabiliza, sin un tercero que valide el hecho económico',
    control: 'Conciliación semanal obligatoria de orden de compra contra factura contra despacho, ejecutada por Torrent Chile y revisada por Finanzas LATAM',
    dueno: 'Finanzas LATAM' },
  { riesgo: 'Dependencia de reportes de terceros para poder cerrar',
    porque: 'Ni el sistema de facturación ni el de inventario son de Torrent',
    control: 'Formato de reporte congelado y fechas comprometidas en el calendario firmado; alerta automática si un reporte no llega en la fecha',
    dueno: 'Finanzas LATAM' },
  { riesgo: 'Diferencias de cutoff entre despacho, facturación y contabilidad',
    porque: 'Tres sistemas distintos con tres cortes distintos',
    control: 'Acta de cutoff única firmada por las tres partes en D-1 o D',
    dueno: 'Torrent Chile' },
  { riesgo: 'Cartera sin gestión durante los primeros meses de venta',
    porque: 'El proceso de cobranza no está definido y los pagos deben identificarse manualmente en la cartola',
    control: 'Política de crédito y comité semanal de cartera desde antes de la primera factura a crédito',
    dueno: 'Torrent Chile' },
  { riesgo: 'Error en la valorización del closing stock',
    porque: 'El costeo de importación (flete, seguro, derechos) se arma por fuera del sistema',
    control: 'Hoja de costeo de importación por embarque, conciliada contra el inventory working file cada mes',
    dueno: 'Finanzas LATAM' },
  { riesgo: 'Diferencia de tipo de cambio en la intercompañía',
    porque: 'La factura intercompañía se emite en dólares y los libros locales están en pesos chilenos',
    control: 'Regla única de tipo de cambio documentada en el memo contable y aplicada por Forvis Mazars',
    dueno: 'Finanzas LATAM + Forvis Mazars' },
  { riesgo: 'Incumplimiento tributario en la factura electrónica',
    porque: 'La emisión al SII la ejecuta un tercero sobre su propio sistema',
    control: 'Revisión mensual del libro de ventas contra el reporte de facturación y contra la declaración de IVA',
    dueno: 'Forvis Mazars' },
  { riesgo: 'Retraso en la consolidación del grupo',
    porque: 'HO consolida por primera vez a Chile y depende del paquete de cierre',
    control: 'Compromiso de envío en D+8 y aviso anticipado de arribos e intercompañía en D',
    dueno: 'Finanzas LATAM' }
];

/* ---- 10 · Próximos pasos (PDF §13) ---- */
const PASOS = [
  { n: 1, accion: 'Recibir de Forvis Mazars la muestra de formato de los cuatro reportes semanales y validarla contra el requerimiento de HO',
    dueno: 'Forvis Mazars → Finanzas LATAM', fecha: 'Semana del 10 de agosto de 2026', dep: 'Solicitud ya enviada el 6 de agosto' },
  { n: 2, accion: 'Sesión técnica con Pharma ISA para inventariar la capacidad de reporte de CISAT',
    dueno: 'Torrent Chile', fecha: 'Semana del 10 de agosto de 2026', dep: 'Disponibilidad de la contraparte de Pharma ISA' },
  { n: 3, accion: 'Definir y documentar el proceso de cobranza: cupos de crédito, antigüedad, escalamiento y DSO objetivo',
    dueno: 'Torrent Chile + Finanzas LATAM', fecha: 'Segunda quincena de agosto de 2026', dep: 'Reporte de cartera con antigüedad de Forvis Mazars' },
  { n: 4, accion: 'Enviar a HO el memo de flujo contable y formalidades tributarias de Chile para el escenario de ventas',
    dueno: 'Finanzas LATAM con Forvis Mazars', fecha: 'Segunda quincena de agosto de 2026', dep: 'Confirmación técnica de Forvis Mazars sobre IVA y factura electrónica' },
  { n: 5, accion: 'Cerrar y firmar el calendario de cierre con las tres partes',
    dueno: 'Finanzas LATAM', fecha: 'Antes del 31 de agosto de 2026', dep: 'Acciones 1 y 2' },
  { n: 6, accion: 'Ejecutar el primer cierre de O2C completo con facturación de venta local',
    dueno: 'Todas las partes', fecha: 'Cierre de septiembre de 2026', dep: 'Acciones 1 a 5' },
  { n: 7, accion: 'Entregar el inventory working file y el IC file de T303 en formato de grupo',
    dueno: 'Finanzas LATAM', fecha: 'Cierre de septiembre de 2026', dep: 'Closing stock valorizado de Pharma ISA' },
  { n: 8, accion: 'Obtener de HO el resultado del feasibility check de SAP T303 para compras y facturación en SD',
    dueno: 'Corporate Finance e ITD en HO', fecha: 'Q3 FY26-27', dep: 'Priorización en HO' },
  { n: 9, accion: 'Publicar el SOP y el tablero mensual de O2C y cartera',
    dueno: 'Finanzas LATAM', fecha: 'Q3 a Q4 FY26-27', dep: 'Acción 6' }
];

/* ---- 11 · Compromisos de la minuta del 23-jul-2026 ---- */
const COMPROMISOS = [
  { compromiso: 'Confirmar viabilidad de calendario de pre-cierre (23-24) y cierre firme (día 31)', resp: 'Forvis Mazars', fecha: 'Próximos días', tipo: 'Calendario' },
  { compromiso: 'Dar seguimiento a TI (Juan Eduardo) y compartir avance/cotización de facturación electrónica', resp: 'Forvis Mazars', fecha: 'Esta semana', tipo: 'Facturación electrónica' },
  { compromiso: 'Enviar correo formalizando el anticipo de $779.000 para aplicar en agosto', resp: 'Nicolás Navas', fecha: 'Inmediato', tipo: 'Anticipos' },
  { compromiso: 'Confirmar % de patente municipal aplicable y enviarlo por el grupo', resp: 'Forvis Mazars', fecha: 'Esta semana', tipo: 'Tributario' },
  { compromiso: 'Enviar cartola de pagos bancarios cada viernes al cierre', resp: 'Nicolás Navas', fecha: 'Recurrente (viernes)', tipo: 'Cadencia semanal' },
  { compromiso: 'Enviar reporte actualizado de cuentas por pagar cada miércoles a primera hora', resp: 'Forvis Mazars', fecha: 'Recurrente (miércoles)', tipo: 'Cadencia semanal' },
  { compromiso: 'Ubicar y responder correo de Mazars solicitando la póliza de seguros; remitir el documento', resp: 'Nicolás Navas', fecha: 'Esta semana', tipo: 'Seguros' },
  { compromiso: 'Gestionar acceso directo a la agencia de aduanas en línea', resp: 'Forvis Mazars (Cristhian Espinoza)', fecha: 'En curso', tipo: 'Costeo importación' },
  { compromiso: 'Compartir repositorio/mapeo de partidas de costeo de importación (fletes, aduana, impuestos)', resp: 'Nicolás Navas', fecha: 'Próxima semana', tipo: 'Costeo importación' },
  { compromiso: 'Alinear y reclasificar anticipos de aduana al costo de mercadería', resp: 'Ambas partes', fecha: 'Próxima semana', tipo: 'Costeo importación' },
  { compromiso: 'Gestionar con Adecco la documentación faltante y definir con Tax la alternativa de declaración F50 (35%)', resp: 'Nicolás Navas', fecha: 'Próxima semana / meta agosto', tipo: 'Tributario' },
  { compromiso: 'Corregir correo de contacto en Softland para envío automático de facturas de venta', resp: 'Forvis Mazars', fecha: 'Esta semana', tipo: 'Accesos' }
];

/* ---- 12 · Temas contables abiertos de la minuta ---- */
const TEMAS_MINUTA = [
  { n: 1, comp: [0], tema: 'Calendario de pre-cierre y cierre mensual',
    detalle: 'Torrent solicitó formalizar un calendario recurrente: pre-cierre entregado por Mazars entre el día 23 y 24 de cada mes, y cierre definitivo el último día del mes, de forma que al primer día hábil del mes siguiente no queden movimientos pendientes de registrar. Mazars tomó la solicitud para revisarla internamente y confirmar viabilidad.' },
  { n: 2, comp: [1], tema: 'Facturación electrónica en Chile (proyecto TI)',
    detalle: 'Persiste el vacío de una cotización formal del servicio de digitación manual de facturas mientras se define si el desarrollo interno de TI (integración de lote XML) es viable para el 1 de agosto. Mazars dará seguimiento con el equipo de TI para obtener un estatus de avance y hacer explícito si el proceso será automático o manual en el corto plazo.' },
  { n: 3, comp: [2], tema: 'Anticipo por pago duplicado a Mazars ($779.000)',
    detalle: 'Torrent transfirió por error $779.000 adicionales a Mazars, monto que no corresponde a ninguna factura pendiente (la única vigente, de $653.000, ya fue cubierta). Ambas partes acordaron registrar el excedente como anticipo y aplicarlo contra la factura de servicios de agosto. Torrent enviará el correo formal dejando trazabilidad del ajuste.' },
  { n: 4, comp: [3], tema: 'Patente municipal (Chile)',
    detalle: 'Se validó que la patente municipal no se amortiza contablemente: se registra como gasto directo en los meses en que se paga (enero y julio), calculado como un porcentaje del capital propio tributario según la municipalidad de registro. Mazars confirmará el porcentaje aplicable. El monto no estaba presupuestado, dado que la compañía no tenía visibilidad histórica de este gasto en su primer año de operación; se documentará como soporte para la desviación presupuestal.' },
  { n: 5, comp: [4, 5], tema: 'Reporte semanal de cuentas por pagar y cartola de pagos',
    detalle: 'Para evitar descalces entre lo que Mazars registra como pendiente y lo que Torrent efectivamente paga, se acordó un flujo recurrente: Torrent envía la cartola de pagos bancarios los viernes al cierre, y Mazars actualiza y envía el estado de cuentas por pagar los miércoles a primera hora, con corte a partir de la cartola del viernes anterior.' },
  { n: 6, comp: [], tema: 'Conciliación de facturas Farmaisa',
    detalle: 'Se aclaró que existen dos conceptos de facturación distintos con Farmaisa: uno de aprox. $2.300.000 (5 facturas de julio, servicio recurrente) y otro de aprox. $14.000.000 (servicio distinto, acumulado por pagos no realizados durante el año). Ambas partes quedaron alineadas sobre la naturaleza de cada partida.' },
  { n: 7, comp: [6], tema: 'Seguros asociados a importación',
    detalle: 'El gasto de seguros (incendio y responsabilidad civil) debe amortizarse durante la vigencia de la póliza, pero Mazars no cuenta con el documento de la póliza y por ahora lo mantiene registrado como gasto directo. Torrent buscará el correo donde Mazars solicitó este soporte y se compromete a remitir la póliza para permitir el ajuste contable correspondiente, incluyendo la corrección del mes ya registrado.' },
  { n: 8, comp: [7, 8, 9], tema: 'Costeo de mercadería importada',
    detalle: 'Se discutió cómo incorporar al costo de la mercadería, además del valor de la mercancía, los fletes, gastos de revisión en puerto y aranceles de importación. Mazars mantiene estos pagos —incluyendo los del agente de aduanas— registrados como anticipos a proveedores, a la espera de la documentación soporte y del acceso directo a la agencia aduanera para poder reclasificarlos al costo. Torrent compartirá su propio mapeo de partidas para validar el alineamiento.' },
  { n: 9, comp: [10], tema: 'Impuesto adicional (35%) sobre facturas Adecco 2025',
    detalle: 'Al depurar la cuenta de anticipos a proveedores, Mazars identificó facturas de Adecco pagadas en agosto de 2025 por servicios prestados por una empresa sin residencia en Chile, sujetas a un impuesto adicional del 35% (Formulario 50) que no fue declarado ni pagado en su momento. Existen dos alternativas: declarar el impuesto en el año que correspondía (2025, con ajuste a la renta de ese ejercicio) o declararlo en el mes actual (con observación por extemporaneidad); en ambos casos aplican multas e intereses aún no cuantificados. Alternativamente, si Torrent aporta la documentación de no residencia, podría no aplicar la retención.',
    critico: true },
  { n: 10, comp: [11], tema: 'Acceso a información de facturación (Book Finanzas)',
    detalle: 'Nicolás reportó que no está recibiendo directamente las facturas de venta emitidas, sólo por reenvío de José Manuel. Mazars identificó que el correo de contacto no fue actualizado en Softland tras el reemplazo de Leandra por Nicolás en la plataforma, y solicitará al equipo de finanzas la corrección para que los reportes automáticos de los lunes lleguen correctamente.' }
];

/* ---- 13 · Preguntas abiertas a los terceros (PDF §14) ---- */
const PREGUNTAS = [
  { para: 'Forvis Mazars (SoftLand)', items: [
    '¿El reporte de órdenes de compra contra facturas puede entregarse a nivel de línea, con SKU, cantidad, precio unitario, descuento, neto, IVA y total, y con la referencia de la orden de compra del cliente?',
    '¿La cartera se puede entregar con tramos de antigüedad fijos (corriente, 1 a 30, 31 a 60, 61 a 90 y más de 90 días) y con la fecha de vencimiento por documento?',
    '¿Qué necesitan exactamente de Torrent para identificar un abono como pago de cliente, más allá de la cartola: referencia, monto, RUT del pagador?',
    '¿En qué día hábil pueden comprometer el balance de comprobación y los estados financieros del mes?',
    '¿Cómo se documenta y con qué periodicidad se revisa el tipo de cambio aplicado a las transacciones intercompañía en dólares?'
  ]},
  { para: 'Pharma ISA (CISAT)', items: [
    '¿Qué reportes estándar entrega CISAT y con qué campos: SKU, lote, vencimiento, cantidad, valor, ubicación y estado?',
    '¿Puede CISAT entregar un closing stock valorizado al último día del mes, y en qué día hábil?',
    '¿Cómo se reportan mermas, vencimientos, devoluciones y diferencias de inventario, y con qué soporte?',
    '¿Es posible un acceso de consulta para Torrent Chile, o el control se mantiene únicamente por reportería?',
    '¿Cuál es el tiempo de respuesta comprometido entre la instrucción de despacho y la salida efectiva de la mercancía?'
  ]}
];

/* ---- 14 · Glosario (PDF §15) ---- */
const GLOSARIO = [
  { t: 'O2C (Order to Cash)', d: 'Ciclo completo desde la orden de compra del cliente hasta el recaudo efectivo del dinero.' },
  { t: 'T303 / E303', d: 'Código de sociedad y de planta de Torrent Pharma Chile SpA en SAP. T300 y M001 son las referencias equivalentes de México.' },
  { t: 'SoftLand', d: 'Sistema contable y de facturación electrónica que opera Forvis Mazars para Torrent Chile.' },
  { t: 'CISAT', d: 'Plataforma de gestión de inventario y despacho que opera Pharma ISA como 3PL.' },
  { t: 'BPC', d: 'Herramienta de consolidación financiera del grupo Torrent, usada por Corporate Finance en India.' },
  { t: 'YMFASUB', d: 'Reporte de subsidiarias del grupo que acompaña el paquete de cierre mensual.' },
  { t: 'IC / intercompañía', d: 'Transacciones entre entidades del mismo grupo, en este caso la venta de TPL India a TPCS Chile, facturada en dólares.' },
  { t: 'Cartola bancaria', d: 'Extracto de movimientos de la cuenta bancaria. Es el insumo con el que se identifican los pagos de clientes.' },
  { t: 'SII', d: 'Servicio de Impuestos Internos de Chile, ante el cual se reporta la factura electrónica.' },
  { t: 'DTE', d: 'Documento Tributario Electrónico: la factura electrónica chilena.' },
  { t: 'Closing stock', d: 'Inventario final del mes, valorizado, que soporta el saldo contable de existencias.' },
  { t: 'DSO (Days Sales Outstanding)', d: 'Días promedio de recaudo de la cartera. Indicador central del seguimiento de cobranza.' },
  { t: 'D / día hábil D', d: 'Día hábil contado desde el cierre del mes. D es el primer día hábil de corte y D+8 es el octavo día hábil posterior.' }
];

/* ---- 15 · Tokens de diseño, para la vista "Diseño" ---- */
const TOKENS_COLOR = [
  { grupo: 'Marca', items: [
    { n: '--torrent-indigo',      h: '#292662', u: 'Primario. Del logo (60.7% de sus píxeles).' },
    { n: '--torrent-violet',      h: '#9283BE', u: 'Acento. 3.38:1 sobre blanco — no apto para texto pequeño.' },
    { n: '--torrent-lavender',    h: '#C3B2D4', u: 'Texto sobre fondo oscuro, acento claro.' },
    { n: '--torrent-lavender-bg', h: '#F7F4FB', u: 'Relleno de la tarjeta de insight.' },
    { n: '--cover-indigo',        h: '#34367F', u: 'Campo de portada.' },
    { n: '--footer-violet',       h: '#9681BC', u: 'Filete del pie de 0.267 in.' }
  ]},
  { grupo: 'Tinta', items: [
    { n: '--ink-900', h: '#12295C', u: 'Titulares. Sustituye a los seis azules marinos del §2.2.' },
    { n: '--ink-700', h: '#1F3864', u: 'Cabeceras de panel y barras de título. 11.6:1 en negativo.' },
    { n: '--ink-500', h: '#5E328C', u: 'Antetítulo en cursiva. 9.09:1 sobre blanco — el violeta seguro.' },
    { n: '--ink-400', h: '#5A6172', u: 'Añadido: gris de leyenda accesible, 6.6:1. Reemplaza a #888888.' },
    { n: '--ink-300', h: '#888888', u: '3.54:1 — no aprueba AA. Sólo decorativo.' }
  ]},
  { grupo: 'Semánticos y estado', items: [
    { n: '--positive',      h: '#1E7A3C', u: 'Crecimiento positivo. Fijado aquí: el documento lo deja sin definir.' },
    { n: '--negative',      h: '#B3261E', u: 'Variación negativa. Fijado aquí: sin definir en el documento.' },
    { n: '--st-operando',   h: '#1E7A3C', u: 'Entregable producido con evidencia.' },
    { n: '--st-definicion', h: '#8A5A00', u: 'Acordado o en discusión, sin entregable estable.' },
    { n: '--st-pendiente',  h: '#5A6172', u: 'No ha empezado.' }
  ]},
  { grupo: 'Datos', items: [
    { n: '--data-1', h: '#073C6D', u: 'Serie 1' }, { n: '--data-2', h: '#0195DF', u: 'Serie 2' },
    { n: '--data-3', h: '#43AA2E', u: 'Serie 3' }, { n: '--data-4', h: '#5B9BD5', u: 'Serie 4' },
    { n: '--data-5', h: '#8FBF6E', u: 'Serie 5' }, { n: '--data-6', h: '#A9A9A9', u: 'Serie 6' },
    { n: '--data-7', h: '#1B4F72', u: 'Serie 7' }
  ]}
];

const HALLAZGOS_DISENO = [
  { sev: 'critico', t: 'La presentación es una foto de una presentación',
    d: 'Cinco de las once diapositivas no contienen ningún contenido editable: cada titular, tabla, gráfico y tarjeta es un PNG aplanado. Si se extrae todo el texto editable de la presentación completa sólo quedan el número de página, la fecha de actualización, la línea legal y la fuente.' },
  { sev: 'critico', t: 'No hay tema',
    d: 'No existe ningún .thmx y ningún archivo lleva un clrScheme ni un fontScheme Torrent. Es la causa raíz de los seis azules marinos y de las cuatro tipografías alcanzables por herencia.' },
  { sev: 'critico', t: 'No hay un patrón utilizable',
    d: 'El patrón de templates.pptx define título, cuerpo y otros como Arial 14 pt negro en los nueve niveles de esquema: ninguna jerarquía. El chrome del pie no se hereda, se pega como imagen en cada diapositiva.' },
  { sev: 'alto', t: 'Fuentes no incrustadas en las presentaciones de trabajo',
    d: 'Manrope no viene con Windows ni con Office. En cualquier máquina donde no esté instalada, el respaldo se resuelve vía el tema a Aptos: cualquiera a quien se le envíe la presentación ve una presentación distinta.' },
  { sev: 'alto', t: 'No hay estilo de tabla ni plantilla de gráfico',
    d: 'tableStyles.xml está vacío (182 bytes). Las tablas de datos están bien diseñadas y son completamente no reutilizables. Sin .crtx, cada gráfico se colorea a mano serie por serie.' },
  { sev: 'medio', t: 'Espaciado y retícula sin definir',
    d: 'Tres márgenes izquierdos (0.41 / 0.46 / 0.917 in), dos medianiles, cuatro líneas base de pie para lo que debería ser una sola, y un carril de tarjetas que se desvía 0.08 in entre tarjetas.' },
  { sev: 'medio', t: 'Ninguna verificación de accesibilidad',
    d: 'El violeta de marca sobre blanco da 3.38:1 y hoy se usa en etiquetas de ~10 pt. El gris de leyenda da 3.54:1. Ninguno aprueba AA para texto normal. Ninguna imagen tiene texto alternativo, incluidas las cinco diapositivas que son imágenes.' }
];

/* ---- 16 · Figuras del documento de proceso ----
   Las tres figuras originales, descargadas de la carpeta de SharePoint.
   El texto alternativo es descriptivo y completo: DISENO.md §7.12 registra
   que en las fuentes no hay «texto alternativo en ninguna imagen, incluidas
   las cinco diapositivas que son imágenes». Aquí sí lo hay. */
const FIGURAS = {
  arquitectura: {
    n: 1,
    archivo: 'assets/img/fig1-arquitectura-informacion-en.png',
    titulo: 'Arquitectura de información',
    unidad: 'De dónde viene cada dato',
    kicker: 'Figura 1 · Information architecture of the O2C and closing cycle',
    idioma: 'Original en inglés',
    pie: 'Tres capas, cero integración automatizada: hoy todo viaja por correo y Excel. El riesgo central está en la capa 2, que es enteramente manual — cada reporte que no llegue en un formato estable rompe el cierre.',
    alt: 'Diagrama de tres columnas. Columna 1, sistemas de origen en manos de terceros: CISAT de Pharma ISA, con inventario por lote, recepciones, salidas, despachos y closing stock; SoftLand de Forvis Mazars, con factura electrónica al SII, libros de ventas y compras, cuentas por cobrar y por pagar y mayor contable; y el banco, Citi y HSBC, con la cartola de cobros de clientes y salidas. Columna 2, control local de Torrent LATAM en Excel y correo: conciliación de orden de compra contra factura contra despacho, cartera con antigüedad y DSO, Trial Balance de TPCS, bank statement con asientos y BPC mapping, YMFASUB con IC reconciliation e IC payable, y Cash Balance con los pagos semanales. Columna 3, consolidación en HO India: SAP T303 y E303 para compras, inventario y S&D bajo revisión de factibilidad; BPC para la consolidación de los estados financieros del grupo; e inventory working file e IC file en formato replicado de México. Las flechas van de izquierda a derecha entre las tres capas. Una leyenda al pie marca en verde lo que ya opera, en ámbar lo que está en definición y en gris lo que no ha empezado.'
  },
  mapa: {
    n: 2,
    archivo: 'assets/img/fig2-mapa-proceso-o2c-en.png',
    titulo: 'Mapa del proceso O2C y cierre contable',
    unidad: 'Por stakeholder y por fase del mes',
    kicker: 'Figura 2 · O2C and month-end closing process map by stakeholder and by phase',
    idioma: 'Original en inglés',
    pie: 'Cada caja indica la actividad y, debajo, el entregable que produce. La barra de color a la izquierda indica si esa actividad ya está operando hoy, si está en definición o si no ha empezado. D = día hábil posterior al fin de mes; la cadencia semanal y los días D son una propuesta de Torrent, sujeta a confirmación por Forvis Mazars y Pharma ISA.',
    alt: 'Matriz de seis filas por cinco columnas. Las filas son los stakeholders: cliente o canal (cadenas de farmacia y distribuidores de Chile); Torrent Chile (José M. Herrera, operación local); Pharma ISA como 3PL (plataforma CISAT, inventario y despacho); Forvis Mazars como BPO (sistema SoftLand, facturación y contabilidad); Torrent LATAM Finanzas (N. Navas, E. Jiménez, O. Gómez); y HO India (SAP T303 y BPC, Corporate Finance). Las columnas son las cinco fases del mes: operación diaria del día 1 al fin de mes, cadencia semanal de viernes a lunes o martes, pre-cierre de D-3 a D+2, cierre contable de D+3 a D+6, y reporte a HO de D+7 a D+10. Cada celda contiene una actividad y el output que entrega, con una barra de color a la izquierda que indica su estado. Flechas punteadas conectan las actividades encadenadas entre filas y columnas.'
  },
  timeline: {
    n: 3,
    archivo: 'assets/img/fig3-timeline-construccion-es.png',
    archivoEn: 'assets/img/fig3-timeline-construccion-en.png',
    titulo: 'Timeline de construcción del proceso',
    unidad: 'Lo recorrido y lo que sigue',
    kicker: 'Figura 3 · What has been built and what comes next',
    idioma: 'Disponible en español e inglés',
    pie: 'El espaciado es secuencial, no proporcional al tiempo. Las fechas de «lo que sigue» son una propuesta de Torrent Finanzas LATAM.',
    alt: 'Timeline de dos bandas separadas por una franja central que marca «hoy, 6 de agosto de 2026». La banda superior, «lo recorrido», va de marzo de 2026 al 6 de agosto de 2026 y encadena diez hitos completados en verde: aprobación del CRF HO-25-0080 con la estructura empresarial de Chile en SAP; zarpe del embarque intercompañía de India a Valparaíso el 8 de marzo; confirmación de que Chile opera sin SAP local; desaduanaje y recepción de la mercancía en el 3PL Pharma ISA entre el 18 y el 20 de junio; definición por parte de HO del alcance SAP para T303 el 19 de junio; cierre de Q1 FY26-27 con IC reconciliation e IC payable; cierre completo de julio con Trial Balance, YMFASUB y BPC mapping; acuerdo de pagos con Mazars vía cartola bancaria semanal, con cuatro semanas ya operando; solicitud formal a Mazars del consolidado de órdenes de compra contra facturas el 3 de agosto; y estructura del proceso comunicada a HO con cuatro acuerdos de reportería fijados el 5 y 6 de agosto. La banda inferior, «lo que sigue», va de agosto de 2026 en adelante y alterna hitos en curso en ámbar y pendientes en gris: sesión de trabajo con José M. Herrera; muestra de formato de los cuatro reportes de Mazars; revisión a fondo de la plataforma CISAT; memo a HO con el flujo contable de la venta local, IVA del 19 por ciento y factura electrónica; definición del proceso de cobranza con cupos de crédito, antigüedad, escalamiento y DSO objetivo; calendario de cierre firmado por las tres partes a fin de agosto; primer cierre O2C completo con facturación de venta local en septiembre; inventory working file e IC file de T303 en el formato de México; feasibility de SAP T303 en Q3 FY26-27; y SOP documentado con tablero mensual de O2C y cartera en Q3-Q4 FY26-27.'
  }
};
