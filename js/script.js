/**
 * ============================================================================
 * MAPA HACIA EL SECRETO DEL DESARROLLO WEB
 * Lógica de la aplicación para aprender y estudiar conceptos frontend.
 * ============================================================================
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 0. BIBLIOTECA DE ICONOS SVG MINIMALISTAS (un solo color, estilo Lucide)
  // -------------------------------------------------------------------------
  const ICON_PATHS = {
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    anchor: '<circle cx="12" cy="5" r="3"/><path d="M12 22v-10M4 12H2a10 10 0 0 0 20 0h-2"/>',
    gem: '<path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.7V17c0 .6-.5 1-1 1.2-1.2.5-2 2-2 3.8M14 14.7V17c0 .6.5 1 1 1.2 1.2.5 2 2 2 3.8M18 2H6v7a6 6 0 0 0 12 0z"/>',
    unlock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    checkCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    alert: '<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"/><path d="M12 9v4M12 17h.01"/>',
    volume: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 4.9a10 10 0 0 1 0 14.2"/>',
    volumeX: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="m22 9-6 6M16 9l6 6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>'
  };

  function icon(name, size = 16, extraClass = '') {
    const paths = ICON_PATHS[name] || '';
    return `<svg class="ui-icon ${extraClass}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  }

  // Escapa texto inyectado en HTML (evita que etiquetas como <a> o <dialog> se interpreten)
  function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(text).replace(/[&<>"']/g, ch => map[ch]);
  }

  // -------------------------------------------------------------------------
  // 1. BASE DE DATOS DE CONTENIDO: 3 ISLAS, 10 MÓDULOS C/U + EXÁMENES FINALES
  // -------------------------------------------------------------------------
  const COURSE_DATA = {
    html: {
      id: 'html',
      name: 'Isla HTML',
      shortName: 'HTML',
      subtitle: 'Estructura y contenido',
      lessons: [
        {
          id: 'html-1',
          title: 'Estructura Básica y Doctype',
          content: `
            <p>Todo viaje en altamar comienza con un buen mapa náutico, y todo documento web comienza con una estructura HTML fundamental.</p>
            <p>La declaración <code>&lt;!DOCTYPE html&gt;</code> al principio del archivo informa al navegador que estamos utilizando la versión moderna de HTML5. A continuación, el elemento raíz <code>&lt;html&gt;</code> envuelve todo el documento.</p>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="es"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Mi Primera Travesía&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;¡Tierra a la vista!&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
            <div class="lesson-callout">
              <strong>Regla del Timonel:</strong> Lo que va dentro de <code>&lt;head&gt;</code> contiene información para el navegador y motores de búsqueda (metadatos). Lo que va dentro de <code>&lt;body&gt;</code> es el contenido visible para los tripulantes.
            </div>
          `,
          questions: [
            {
              statement: 'La etiqueta <!DOCTYPE html> es una etiqueta de cierre que va al final del documento.',
              answer: false,
              explanation: 'Falso. Es una declaración preliminar que se coloca en la primera línea del archivo para indicar al navegador que use el estándar HTML5, y no tiene cierre.'
            },
            {
              statement: 'Todo el contenido visible para el usuario en una página web debe colocarse dentro de la etiqueta <body>.',
              answer: true,
              explanation: 'Verdadero. La etiqueta <body> aloja los textos, imágenes, botones y secciones visibles.'
            },
            {
              statement: 'El atributo lang en la etiqueta <html> especifica el idioma principal del contenido de la página.',
              answer: true,
              explanation: 'Verdadero. Indicar lang="es" ayuda a la accesibilidad y a los motores de búsqueda a identificar el idioma de la página.'
            }
          ]
        },
        {
          id: 'html-2',
          title: 'Encabezados y Párrafos',
          content: `
            <p>En un cuaderno de bitácora los títulos jerarquizan los eventos del día. En HTML, los encabezados van desde <code>&lt;h1&gt;</code> (el más importante) hasta <code>&lt;h6&gt;</code> (el de menor jerarquía).</p>
            <p>Nunca debes usar etiquetas de encabezado solo para hacer el texto más grande o en negrita; su función es semántica y define la jerarquía del contenido.</p>
            <pre><code>&lt;h1&gt;Capítulo 1: El Galeón Fantasma&lt;/h1&gt;
&lt;h2&gt;Preparativos de la tripulación&lt;/h2&gt;
&lt;p&gt;El viento soplaba favorable mientras zarpamos del puerto.&lt;/p&gt;</code></pre>
            <p>Para los textos regulares y explicaciones se utiliza el elemento <code>&lt;p&gt;</code> (párrafo), el cual crea un bloque de texto separado con espaciado natural.</p>
          `,
          questions: [
            {
              statement: 'Solo se recomienda tener un único elemento <h1> por página que represente el tema principal.',
              answer: true,
              explanation: 'Verdadero. Las buenas prácticas de SEO y accesibilidad dictan que debe existir un solo <h1> principal por documento.'
            },
            {
              statement: 'El encabezado <h6> tiene una jerarquía superior y más relevante que <h2>.',
              answer: false,
              explanation: 'Falso. <h1> es el más relevante y <h6> es el de menor nivel en la jerarquía.'
            },
            {
              statement: 'Los elementos <p> son etiquetas en bloque utilizadas para redactar párrafos de texto.',
              answer: true,
              explanation: 'Verdadero. Los párrafos agrupan texto en bloque y crean saltos visuales antes y después.'
            }
          ]
        },
        {
          id: 'html-3',
          title: 'Enlaces e Hipervínculos',
          content: `
            <p>Los hipervínculos son las rutas marítimas que conectan diferentes islas en la gran red web. Se crean con la etiqueta <code>&lt;a&gt;</code> (áncora o ancla).</p>
            <p>El atributo más importante es <code>href</code> (hypertext reference), el cual indica la dirección de destino del enlace.</p>
            <pre><code>&lt;!-- Enlace a otra isla o página externa --&gt;
&lt;a href="https://ejemplo.com" target="_blank" rel="noopener noreferrer"&gt;
  Ir al Mapa Exterior
&lt;/a&gt;</code></pre>
            <div class="lesson-callout">
              <strong>El Secreto del Corsario:</strong> Al usar <code>target="_blank"</code> el enlace se abre en una nueva pestaña. Por seguridad, siempre acompáñalo de <code>rel="noopener noreferrer"</code>.
            </div>
          `,
          questions: [
            {
              statement: 'El atributo href es obligatorio en la etiqueta <a> para definir el destino del enlace.',
              answer: true,
              explanation: 'Verdadero. Sin el atributo href, el enlace no conduce a ninguna ubicación ni funciona como hipervínculo.'
            },
            {
              statement: 'El atributo target="_blank" hace que el enlace se abra en la misma pestaña actual sustituyendo la página.',
              answer: false,
              explanation: 'Falso. target="_blank" hace que se abra en una nueva pestaña o ventana; el valor por defecto que abre en la misma pestaña es _self.'
            },
            {
              statement: 'Un enlace puede apuntar a una sección interna de la misma página utilizando un identificador (ej. href="#seccion1").',
              answer: true,
              explanation: 'Verdadero. Los enlaces internos usan el símbolo almohadilla # seguido del id del elemento de destino.'
            }
          ]
        },
        {
          id: 'html-4',
          title: 'Imágenes y Accesibilidad',
          content: `
            <p>Un mapa pirata sin ilustraciones de monstruos marinos o islas no tiene vida. En HTML las imágenes se insertan con la etiqueta <code>&lt;img&gt;</code>.</p>
            <p>La etiqueta <code>&lt;img&gt;</code> es auto-conclusiva (no necesita etiqueta de cierre <code>&lt;/img&gt;</code>) y requiere dos atributos esenciales:</p>
            <ul>
              <li><code>src</code>: La ruta (URL o archivo local) de la imagen.</li>
              <li><code>alt</code>: El texto alternativo descriptivo.</li>
            </ul>
            <pre><code>&lt;img src="tesoro.jpg" alt="Cofre de madera tallada con doblones de oro" width="300"&gt;</code></pre>
            <div class="lesson-callout">
              <strong>Accesibilidad Sagrada:</strong> El atributo <code>alt</code> describe la imagen a personas con discapacidad visual que usan lectores de pantalla, y se muestra si la imagen no logra cargarse.
            </div>
          `,
          questions: [
            {
              statement: 'La etiqueta <img> requiere obligatoriamente una etiqueta de cierre </img>.',
              answer: false,
              explanation: 'Falso. <img> es un elemento vacío o auto-conclusivo y no lleva etiqueta de cierre en HTML5.'
            },
            {
              statement: 'El atributo alt es fundamental para la accesibilidad y describe el contenido de la imagen.',
              answer: true,
              explanation: 'Verdadero. El texto alternativo permite a lectores de pantalla describir la imagen y se muestra si falla la carga.'
            },
            {
              statement: 'El atributo src define la fuente o ruta donde se ubica el archivo de la imagen.',
              answer: true,
              explanation: 'Verdadero. src proviene de "source" e indica la ruta de la imagen.'
            }
          ]
        },
        {
          id: 'html-5',
          title: 'Listas Ordenadas y Desordenadas',
          content: `
            <p>Para alistar provisiones, municiones o los pasos para encontrar el cofre, HTML ofrece dos tipos principales de listas:</p>
            <p><strong>Listas desordenadas (<code>&lt;ul&gt;</code>)</strong>: Muestran elementos con viñetas o puntos. Perfectas cuando el orden no altera el resultado.</p>
            <p><strong>Listas ordenadas (<code>&lt;ol&gt;</code>)</strong>: Muestran elementos con números o letras secuenciales.</p>
            <pre><code>&lt;!-- Inventario pirata (Desordenada) --&gt;
&lt;ul&gt;
  &lt;li&gt;Brújula de latón&lt;/li&gt;
  &lt;li&gt;Catalejo&lt;/li&gt;
&lt;/ul&gt;

&lt;!-- Pasos para desenterrar el tesoro (Ordenada) --&gt;
&lt;ol&gt;
  &lt;li&gt;Caminar 20 pasos al norte de la roca.&lt;/li&gt;
  &lt;li&gt;Cavar bajo la palmera solitaria.&lt;/li&gt;
&lt;/ol&gt;</code></pre>
            <p>Cada elemento dentro de la lista se encierra en la etiqueta <code>&lt;li&gt;</code> (list item).</p>
          `,
          questions: [
            {
              statement: 'La etiqueta <ol> crea una lista numerada u ordenada secuencialmente.',
              answer: true,
              explanation: 'Verdadero. <ol> significa "ordered list" y numera automáticamente sus elementos.'
            },
            {
              statement: 'Los elementos individuales dentro de una lista <ul> se encierran con la etiqueta <item>.',
              answer: false,
              explanation: 'Falso. Se utiliza la etiqueta <li> (list item) tanto para <ul> como para <ol>.'
            },
            {
              statement: 'Es posible anidar una lista <ul> dentro de otra lista para crear subniveles o menús.',
              answer: true,
              explanation: 'Verdadero. Las listas anidadas son una práctica común y estándar para representar jerarquías.'
            }
          ]
        },
        {
          id: 'html-6',
          title: 'Elementos Semánticos Modernos',
          content: `
            <p>Antiguamente los marineros marcaban todo con cajas genéricas (<code>&lt;div&gt;</code>). Pero HTML5 introdujo <strong>etiquetas semánticas</strong> que describen con claridad el significado del contenido para el navegador y los motores de búsqueda.</p>
            <ul>
              <li><code>&lt;header&gt;</code>: Cabecera de la página o de una sección.</li>
              <li><code>&lt;nav&gt;</code>: Bloque que contiene enlaces principales de navegación.</li>
              <li><code>&lt;main&gt;</code>: El contenido central y único del documento.</li>
              <li><code>&lt;section&gt;</code>: Una sección temática de contenido.</li>
              <li><code>&lt;article&gt;</code>: Contenido autónomo y reutilizable (noticia, post).</li>
              <li><code>&lt;footer&gt;</code>: Pie de página con créditos, enlaces legales o contacto.</li>
            </ul>
          `,
          questions: [
            {
              statement: 'La etiqueta <nav> está diseñada específicamente para agrupar enlaces de navegación principales.',
              answer: true,
              explanation: 'Verdadero. <nav> comunica semánticamente que su contenido es un menú o bloque de navegación.'
            },
            {
              statement: 'Un documento HTML puede tener múltiples etiquetas <main> activas al mismo nivel sin restricciones.',
              answer: false,
              explanation: 'Falso. Debe existir un único elemento <main> representativo del contenido principal en la página.'
            },
            {
              statement: 'El uso de etiquetas semánticas mejora la accesibilidad para usuarios con lectores de pantalla.',
              answer: true,
              explanation: 'Verdadero. Los lectores de pantalla usan puntos de referencia semánticos como <header>, <nav> y <main> para facilitar la navegación.'
            }
          ]
        },
        {
          id: 'html-7',
          title: 'Formularios y Entradas',
          content: `
            <p>Cuando un nuevo marinero solicita unirse a la tripulación, debe rellenar un pergamino de alistamiento. En la web usamos <code>&lt;form&gt;</code>.</p>
            <p>El elemento <code>&lt;label&gt;</code> se asocia a un campo mediante el atributo <code>for</code> que coincide con el <code>id</code> del <code>&lt;input&gt;</code>.</p>
            <pre><code>&lt;form action="/reclutar" method="POST"&gt;
  &lt;label for="nombre-marinero"&gt;Nombre del Corsario:&lt;/label&gt;
  &lt;input type="text" id="nombre-marinero" name="nombre" placeholder="Ej. Barbanegra" required&gt;
  
  &lt;button type="submit"&gt;Enviar Solicitud&lt;/button&gt;
&lt;/form&gt;</code></pre>
            <p>El atributo <code>placeholder</code> muestra una pista de texto provisional en gris antes de que el usuario escriba.</p>
          `,
          questions: [
            {
              statement: 'El atributo for de un <label> debe coincidir con el id del <input> al que está asociado.',
              answer: true,
              explanation: 'Verdadero. Esto vincula formalmente la etiqueta con el campo de entrada mejorando la accesibilidad.'
            },
            {
              statement: 'El atributo placeholder sustituye al atributo <label> y hace innecesario usar etiquetas accesibles.',
              answer: false,
              explanation: 'Falso. El placeholder desaparece al escribir y no es leído adecuadamente por todos los lectores de pantalla; el <label> sigue siendo indispensable.'
            },
            {
              statement: 'El atributo required evita que el formulario se envíe si el campo de texto está vacío.',
              answer: true,
              explanation: 'Verdadero. required aplica validación nativa obligatoria en el navegador.'
            }
          ]
        },
        {
          id: 'html-8',
          title: 'Tipos de Input y Opciones',
          content: `
            <p>No todos los datos se recogen con texto simple. El elemento <code>&lt;input&gt;</code> cuenta con el versátil atributo <code>type</code>:</p>
            <ul>
              <li><code>type="text"</code>: Texto plano estándar.</li>
              <li><code>type="email"</code>: Valida automáticamente formato de correo electrónico.</li>
              <li><code>type="password"</code>: Oculta los caracteres ingresados (ideal para contraseñas o cofres secretos).</li>
              <li><code>type="radio"</code>: Permite seleccionar solo una opción de un grupo (comparten el mismo <code>name</code>).</li>
              <li><code>type="checkbox"</code>: Permite marcar o desmarcar casillas independientes.</li>
            </ul>
            <pre><code>&lt;!-- Elegir bando --&gt;
&lt;input type="radio" id="pirata" name="bando" value="pirata"&gt;
&lt;label for="pirata"&gt;Pirata&lt;/label&gt;

&lt;input type="radio" id="corsario" name="bando" value="corsario"&gt;
&lt;label for="corsario"&gt;Corsario&lt;/label&gt;</code></pre>
          `,
          questions: [
            {
              statement: 'Para que los botones de tipo radio sean excluyentes entre sí, deben compartir el mismo atributo name.',
              answer: true,
              explanation: 'Verdadero. Al tener el mismo name, el navegador sabe que pertenecen al mismo grupo y solo permite elegir uno.'
            },
            {
              statement: 'El tipo type="checkbox" solo permite seleccionar una única opción en todo el formulario.',
              answer: false,
              explanation: 'Falso. Las casillas de verificación (checkbox) permiten seleccionar múltiples opciones simultáneamente.'
            },
            {
              statement: 'El tipo type="password" oculta visualmente los caracteres escritos por seguridad.',
              answer: true,
              explanation: 'Verdadero. Muestra puntos o asteriscos para resguardar la privacidad.'
            }
          ]
        },
        {
          id: 'html-9',
          title: 'Tablas y Datos Tabulares',
          content: `
            <p>Para llevar la contabilidad del botín o el censo de buques capturados, HTML proporciona el elemento <code>&lt;table&gt;</code>.</p>
            <p>Una tabla bien estructurada utiliza las siguientes etiquetas:</p>
            <ul>
              <li><code>&lt;tr&gt;</code>: Representa una fila en la tabla (table row).</li>
              <li><code>&lt;th&gt;</code>: Celda de encabezado (table header), usualmente en negrita y centrada.</li>
              <li><code>&lt;td&gt;</code>: Celda de datos común (table data).</li>
              <li><code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tfoot&gt;</code>: Agrupadores semánticos de cabecera, cuerpo y pie de la tabla.</li>
            </ul>
          `,
          questions: [
            {
              statement: 'La etiqueta <tr> se utiliza para definir una fila dentro de una tabla.',
              answer: true,
              explanation: 'Verdadero. <tr> proviene de "table row" y contiene las celdas de esa fila.'
            },
            {
              statement: 'Las celdas de encabezado de una tabla se definen mediante la etiqueta <td>.',
              answer: false,
              explanation: 'Falso. Las celdas de encabezado se definen con <th> (table header), mientras que <td> representa celdas de datos regulares.'
            },
            {
              statement: 'Hoy en día las tablas deben utilizarse para diseñar el layout de toda la página web.',
              answer: false,
              explanation: 'Falso. Las tablas solo deben utilizarse para datos tabulares; el diseño visual se realiza con CSS (Flexbox y Grid).'
            }
          ]
        },
        {
          id: 'html-10',
          title: 'Metadatos y la Cabeza del Barco',
          content: `
            <p>Llegamos a la última lección de la Isla HTML. La etiqueta <code>&lt;head&gt;</code> es la cabina del timonel: nadie la ve desde el muelle, pero contiene los instrumentos vitales de navegación.</p>
            <pre><code>&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;Diario de Navegación&lt;/title&gt;
  &lt;link rel="stylesheet" href="CSS/styles.css"&gt;
&lt;/head&gt;</code></pre>
            <p><code>&lt;meta charset="UTF-8"&gt;</code> asegura que caracteres como la 'ñ' y los acentos se interpreten sin errores. <code>&lt;meta name="viewport" ...&gt;</code> garantiza que el sitio sea responsivo en dispositivos móviles.</p>
          `,
          questions: [
            {
              statement: 'La etiqueta <title> define el título de la pestaña que aparece en la parte superior del navegador.',
              answer: true,
              explanation: 'Verdadero. <title> es indispensable para la pestaña del navegador y los resultados de búsqueda.'
            },
            {
              statement: 'La etiqueta <link rel="stylesheet"> debe colocarse obligatoriamente dentro del <body>.',
              answer: false,
              explanation: 'Falso. Se debe colocar en el <head> para que el navegador descargue y aplique los estilos antes de pintar la página.'
            },
            {
              statement: 'UTF-8 es la codificación estándar que permite mostrar correctamente tildes y símbolos especiales.',
              answer: true,
              explanation: 'Verdadero. UTF-8 cubre prácticamente todos los caracteres de las lenguas del mundo.'
            }
          ]
        }
      ],
      exam: {
        title: 'Examen Final de HTML: El Cetro de la Estructura',
        questions: [
          {
            type: 'tf',
            statement: '¿Es el elemento <main> el contenedor adecuado para todo el contenido central y exclusivo de la página?',
            answer: true,
            explanation: 'Correcto. <main> representa el contenido dominante y único de la página.'
          },
          {
            type: 'mc',
            statement: '¿Cuál es el atributo correcto para abrir un enlace en una nueva pestaña del navegador?',
            options: [
              'window="new"',
              'target="_blank"',
              'href="_newtab"',
              'open="tab"'
            ],
            answerIndex: 1,
            explanation: 'target="_blank" es el atributo estándar en HTML para abrir enlaces en una pestaña nueva.'
          },
          {
            type: 'fill',
            statement: 'En una imagen HTML, el atributo _____ proporciona una descripción textual para accesibilidad y en caso de que la imagen falle.',
            options: ['src', 'alt', 'title', 'label'],
            correctWord: 'alt',
            explanation: 'alt (alternate text) es el atributo esencial de accesibilidad en imágenes.'
          },
          {
            type: 'tf',
            statement: '¿Las etiquetas <h1> a <h6> deben elegirse según el tamaño de fuente visual que queramos en lugar de la jerarquía?',
            answer: false,
            explanation: 'Falso. Deben elegirse siempre por su jerarquía semántica; el aspecto visual se controla con CSS.'
          },
          {
            type: 'mc',
            statement: '¿Qué etiqueta HTML se utiliza para agrupar las opciones de una lista con viñetas no ordenadas?',
            options: ['<ol>', '<dl>', '<ul>', '<list>'],
            answerIndex: 2,
            explanation: '<ul> (unordered list) crea listas desordenadas con viñetas.'
          },
          {
            type: 'fill',
            statement: 'Para que varios botones de tipo radio permitan seleccionar solo una opción deben tener el mismo atributo _____.',
            options: ['id', 'class', 'name', 'value'],
            correctWord: 'name',
            explanation: 'El atributo name agrupa los inputs tipo radio para que actúen de forma excluyente.'
          }
        ]
      }
    },

    css: {
      id: 'css',
      name: 'Isla CSS',
      shortName: 'CSS',
      subtitle: 'Estilos y diseño',
      lessons: [
        {
          id: 'css-1',
          title: 'Sintaxis de CSS y Reglas',
          content: `
            <p>CSS (Cascading Style Sheets) es el arte de pintar y dar vida al barco de madera construido con HTML.</p>
            <p>Una regla CSS consta de un <strong>selector</strong> (a quién queremos aplicar el estilo) y un <strong>bloque de declaraciones</strong> entre llaves <code>{}</code> con parejas de <strong>propiedad: valor;</strong>.</p>
            <pre><code>/* Selector de elemento */
p {
  color: #2C1810;
  font-size: 16px;
}

/* Selector de clase */
.bandera-pirata {
  background-color: black;
}</code></pre>
            <div class="lesson-callout">
              <strong>Viento en popa:</strong> Nunca olvides cerrar cada declaración con un punto y coma <code>;</code> para evitar que las siguientes propiedades se rompan.
            </div>
          `,
          questions: [
            {
              statement: 'En CSS, un selector de clase se antecede con un punto (ejemplo: .boton-pirata).',
              answer: true,
              explanation: 'Verdadero. El punto (.) indica que se trata de un selector de clase, mientras que la almohadilla (#) indica un selector de identificador (id).'
            },
            {
              statement: 'Cada declaración de propiedad en CSS debe terminar con dos puntos (:).',
              answer: false,
              explanation: 'Falso. La propiedad y el valor se separan con dos puntos, pero cada declaración termina con punto y coma (;).'
            },
            {
              statement: 'El selector universal (*) selecciona todos los elementos presentes en el documento.',
              answer: true,
              explanation: 'Verdadero. El asterisco es el comodín universal que apunta a todos los elementos.'
            }
          ]
        },
        {
          id: 'css-2',
          title: 'Colores y Fondos',
          content: `
            <p>En el mar los colores transmiten mensajes: aguas turquesas significan calma y velas negras anuncian batalla.</p>
            <p>En CSS podemos especificar colores de múltiples formas:</p>
            <ul>
              <li><strong>Nombres clave:</strong> <code>gold</code>, <code>black</code>, <code>white</code>.</li>
              <li><strong>Hexadecimal:</strong> <code>#EEC67C</code> o <code>#07CEF5</code>.</li>
              <li><strong>RGB / RGBA:</strong> <code>rgb(7, 206, 245)</code> o con canal alfa de transparencia <code>rgba(7, 206, 245, 0.5)</code>.</li>
            </ul>
            <pre><code>body {
  background-color: #EEC67C;
  color: #2A1A0F;
}</code></pre>
            <p>La propiedad <code>color</code> cambia el color del texto, mientras que <code>background-color</code> pinta el fondo del elemento.</p>
          `,
          questions: [
            {
              statement: 'La propiedad color se utiliza para cambiar el color de fondo de un contenedor.',
              answer: false,
              explanation: 'Falso. color cambia el color del texto. Para el fondo se usa background-color.'
            },
            {
              statement: 'El canal alfa en rgba(...) permite definir la transparencia u opacidad de un color.',
              answer: true,
              explanation: 'Verdadero. El cuarto parámetro (de 0 a 1) controla la transparencia del color.'
            },
            {
              statement: 'El código hexadecimal #FFFFFF representa el color blanco en CSS.',
              answer: true,
              explanation: 'Verdadero. Los tres pares FF representan los valores máximos de rojo, verde y azul.'
            }
          ]
        },
        {
          id: 'css-3',
          title: 'El Modelo de Caja (Box Model)',
          content: `
            <p>Todo elemento en una página web es en realidad una caja rectangular. El modelo de caja se compone de cuatro capas desde el interior hacia afuera:</p>
            <ol>
              <li><strong>Content (Contenido):</strong> Donde se sitúan el texto o las imágenes.</li>
              <li><strong>Padding (Relleno interno):</strong> El espacio entre el contenido y el borde.</li>
              <li><strong>Border (Borde):</strong> La línea que rodea al padding.</li>
              <li><strong>Margin (Margen externo):</strong> El espacio exterior que separa esta caja de las demás cajas vecinas.</li>
            </ol>
            <pre><code>.cofre-card {
  padding: 20px;   /* Espacio interior */
  border: 2px solid #5C3B1E;
  margin: 15px;    /* Distancia con otras cajas */
}</code></pre>
            <div class="lesson-callout">
              <strong>Truco de oro:</strong> Usar <code>box-sizing: border-box;</code> hace que el padding y el border no aumenten el ancho total asignado a la caja.
            </div>
          `,
          questions: [
            {
              statement: 'El padding crea espacio en el exterior del borde para separar elementos entre sí.',
              answer: false,
              explanation: 'Falso. El padding es el relleno interior (entre el contenido y el borde). El margen (margin) es el que crea espacio exterior.'
            },
            {
              statement: 'La propiedad box-sizing: border-box incluye el padding y el borde en el ancho total de la caja.',
              answer: true,
              explanation: 'Verdadero. Esto evita cálculos difíciles y es la norma en el desarrollo moderno.'
            },
            {
              statement: 'El margen puede tener valores automáticos como margin: 0 auto; para centrar cajas horizontalmente en bloque.',
              answer: true,
              explanation: 'Verdadero. Cuando un elemento en bloque tiene un ancho definido, margin: 0 auto lo centra horizontalmente.'
            }
          ]
        },
        {
          id: 'css-4',
          title: 'Bordes y Esquinas Redondeadas',
          content: `
            <p>Los bordes delimitan las áreas de navegación de nuestros mapas. La propiedad abreviada <code>border</code> recibe tres valores:</p>
            <pre><code>.pergamino {
  /* ancho | estilo | color */
  border: 2px solid #BFA06E;
  border-radius: 12px; /* Esquinas ligeramente redondeadas */
}</code></pre>
            <p>Con <code>border-radius</code> podemos suavizar las esquinas rígidas. Si le asignamos <code>border-radius: 50%</code> a un elemento cuadrado, se transforma en un círculo perfecto (ideal para medallas o avatares).</p>
          `,
          questions: [
            {
              statement: 'La propiedad border-radius permite redondear las esquinas de un contenedor.',
              answer: true,
              explanation: 'Verdadero. border-radius suaviza las esquinas con el radio de curvatura especificado.'
            },
            {
              statement: 'Un elemento cuadrado con border-radius: 50% se convertirá en una figura circular.',
              answer: true,
              explanation: 'Verdadero. Al aplicar 50% a una caja con igual ancho y alto, se crea un círculo.'
            },
            {
              statement: 'El único estilo de borde permitido en CSS es solid (línea sólida).',
              answer: false,
              explanation: 'Falso. Existen estilos como dashed (punteado largo), dotted (puntos), double (doble), entre otros.'
            }
          ]
        },
        {
          id: 'css-5',
          title: 'Tipografía y Fuentes',
          content: `
            <p>La tipografía transmite la voz del capitán. En CSS podemos controlar cómo se lee el texto:</p>
            <ul>
              <li><code>font-family</code>: Familia tipográfica (ej. 'Courier New', monospace).</li>
              <li><code>font-size</code>: Tamaño del texto (ej. 16px, 1.2rem).</li>
              <li><code>font-weight</code>: Grosor de la letra (ej. normal, bold, 700).</li>
              <li><code>line-height</code>: Interlineado vertical para que los párrafos respiren.</li>
            </ul>
            <pre><code>h1 {
  font-family: 'Pirata One', serif;
  font-size: 2.5rem;
  letter-spacing: 2px;
}</code></pre>
          `,
          questions: [
            {
              statement: 'La propiedad font-size controla el tamaño de la tipografía.',
              answer: true,
              explanation: 'Verdadero. Permite definir el tamaño en pixeles, rems u otras unidades.'
            },
            {
              statement: 'La propiedad font-weight con el valor bold se utiliza para mostrar el texto en negrita y aumentar su grosor.',
              answer: true,
              explanation: 'Verdadero. font-weight define el grosor de la tipografía y el valor bold aplica estilo en negrita.'
            },
            {
              statement: 'Siempre es recomendable incluir fuentes de respaldo en font-family separadas por comas.',
              answer: true,
              explanation: 'Verdadero. Si la primera fuente no se encuentra disponible en el sistema del usuario, el navegador usa la siguiente opción de respaldo.'
            }
          ]
        },
        {
          id: 'css-6',
          title: 'Unidades de Medida Web',
          content: `
            <p>En el mar medimos en millas y nudos; en CSS disponemos de unidades absolutas y relativas:</p>
            <ul>
              <li><code>px</code> (Píxeles): Unidad absoluta fija. 1px es un punto en pantalla.</li>
              <li><code>rem</code>: Relativa al tamaño de fuente raíz del documento (<code>&lt;html&gt;</code>, típicamente 16px). ¡La más recomendada!</li>
              <li><code>em</code>: Relativa al tamaño de fuente del elemento padre.</li>
              <li><code>%</code> (Porcentaje): Relativa al tamaño del elemento contenedor.</li>
              <li><code>vw</code> / <code>vh</code>: 1% del ancho o alto visible de la ventana del navegador (viewport).</li>
            </ul>
          `,
          questions: [
            {
              statement: 'La unidad rem calcula su tamaño basándose en el tamaño de fuente raíz del elemento <html>.',
              answer: true,
              explanation: 'Verdadero. rem significa "root em" y responde a la configuración de la raíz.'
            },
            {
              statement: '100vh representa exactamente el 100% del ancho horizontal de la pantalla.',
              answer: false,
              explanation: 'Falso. vh es "viewport height" (altura vertical). El ancho es vw (viewport width).'
            },
            {
              statement: 'El uso de rem en lugar de px fijos facilita la accesibilidad para usuarios que aumentan el tamaño de fuente en el navegador.',
              answer: true,
              explanation: 'Verdadero. Al usar rem, toda la escala responde armónicamente a las preferencias del usuario.'
            }
          ]
        },
        {
          id: 'css-7',
          title: 'Posicionamiento en CSS',
          content: `
            <p>La propiedad <code>position</code> decide cómo se ubica un barco en las coordenadas del mapa:</p>
            <ul>
              <li><code>static</code>: El flujo normal por defecto.</li>
              <li><code>relative</code>: Se mueve respecto a su posición original sin afectar a los demás.</li>
              <li><code>absolute</code>: Se retira del flujo y se posiciona respecto al ancestro más cercano que tenga <code>position: relative</code>.</li>
              <li><code>fixed</code>: Se queda anclado a la pantalla incluso si el usuario hace scroll (ej. un timón fijo).</li>
              <li><code>sticky</code>: Se comporta como relativo hasta que llega a un umbral de scroll y se queda pegado.</li>
            </ul>
          `,
          questions: [
            {
              statement: 'Un elemento con position: absolute se posiciona relativo a la ventana si ninguno de sus ancestros tiene position relativo.',
              answer: true,
              explanation: 'Verdadero. Si no encuentra ningún contenedor posicionado, toma como referencia el elemento raíz.'
            },
            {
              statement: 'position: fixed hace que el elemento se mueva junto con el scroll del resto de la página.',
              answer: false,
              explanation: 'Falso. position: fixed mantiene el elemento fijo en una coordenada de la pantalla independientemente del scroll.'
            },
            {
              statement: 'Las propiedades top, left, right y bottom solo surten efecto en elementos que tengan position diferente a static.',
              answer: true,
              explanation: 'Verdadero. En elementos estáticos (static), esas propiedades de coordenadas no tienen efecto.'
            }
          ]
        },
        {
          id: 'css-8',
          title: 'Flexbox: Alineación de Tripulación',
          content: `
            <p>Flexbox es la herramienta más poderosa para alinear marineros en una sola dimensión (en fila o en columna).</p>
            <p>Al aplicar <code>display: flex;</code> a un contenedor, sus hijos se convierten en elementos flexibles:</p>
            <pre><code>.cubierta {
  display: flex;
  flex-direction: row;        /* En fila */
  justify-content: center;   /* Alineación en eje principal */
  align-items: center;       /* Alineación en eje transversal */
  gap: 15px;                 /* Separación entre marineros */
}</code></pre>
            <p>La propiedad <code>gap</code> simplifica el espaciado sin tener que recurrir a molestos márgenes manuales.</p>
          `,
          questions: [
            {
              statement: 'La propiedad justify-content alinea los elementos a lo largo del eje principal en Flexbox.',
              answer: true,
              explanation: 'Verdadero. Controla la distribución en el eje principal (por defecto horizontal si es row).'
            },
            {
              statement: 'Para activar Flexbox, se debe aplicar display: inline-block en los elementos hijos.',
              answer: false,
              explanation: 'Falso. Se aplica display: flex en el elemento contenedor padre.'
            },
            {
              statement: 'La propiedad gap define el espacio de separación entre los elementos flexibles del contenedor.',
              answer: true,
              explanation: 'Verdadero. gap crea una separación limpia y constante sin necesidad de márgenes en los bordes.'
            }
          ]
        },
        {
          id: 'css-9',
          title: 'CSS Grid: La Cuadrícula del Tesoro',
          content: `
            <p>Mientras Flexbox domina una dimensión, <strong>CSS Grid</strong> es el maestro de dos dimensiones a la vez: filas y columnas simultáneas.</p>
            <pre><code>.mapa-cuadricula {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}</code></pre>
            <p>La unidad <code>fr</code> (fracción) reparte el espacio disponible de manera proporcional y matemática.</p>
          `,
          questions: [
            {
              statement: 'CSS Grid está diseñado para maquetar layouts bidimensionales en filas y columnas al mismo tiempo.',
              answer: true,
              explanation: 'Verdadero. Grid maneja tanto filas como columnas conjuntamente con alta precisión.'
            },
            {
              statement: 'La unidad 1fr en CSS Grid representa una fracción del espacio disponible en el contenedor.',
              answer: true,
              explanation: 'Verdadero. fr proviene de fraction y distribuye equitativamente el espacio restante.'
            },
            {
              statement: 'Grid y Flexbox son incompatibles y nunca deben usarse juntos en el mismo proyecto web.',
              answer: false,
              explanation: 'Falso. Son complementarios; es muy común usar Grid para la estructura general y Flexbox para componentes internos.'
            }
          ]
        },
        {
          id: 'css-10',
          title: 'Diseño Responsivo y Media Queries',
          content: `
            <p>Un mapa debe poder consultarse tanto en el gran escritorio del galeón como en un pequeño pergamino de bolsillo.</p>
            <p>Las <strong>Media Queries</strong> permiten aplicar reglas CSS condicionales según el ancho de la pantalla del usuario:</p>
            <pre><code>/* Estilo para pantallas de teléfono */
@media (max-width: 600px) {
  .islands-grid-container {
    grid-template-columns: 1fr; /* Una sola columna en móvil */
  }
}</code></pre>
            <div class="lesson-callout">
              <strong>El Enfoque Mobile-First:</strong> Se recomienda diseñar primero para pantallas pequeñas y luego agregar media queries para expandirse a pantallas grandes.
            </div>
          `,
          questions: [
            {
              statement: 'Una Media Query permite cambiar los estilos CSS dependiendo del tamaño de pantalla u otras características del dispositivo.',
              answer: true,
              explanation: 'Verdadero. Con @media adaptamos el diseño para teléfonos, tablets y computadoras.'
            },
            {
              statement: '@media (max-width: 768px) aplicará sus reglas únicamente en pantallas de 1200px o superiores.',
              answer: false,
              explanation: 'Falso. max-width: 768px se aplica cuando la pantalla mide 768px o menos.'
            },
            {
              statement: 'El diseño web responsivo busca que un sitio se adapte visualmente a cualquier resolución sin romperse.',
              answer: true,
              explanation: 'Verdadero. Esa es la esencia del diseño responsivo moderno.'
            }
          ]
        }
      ],
      exam: {
        title: 'Examen Final de CSS: La Corona del Estilo',
        questions: [
          {
            type: 'tf',
            statement: '¿El padding es el espacio que existe entre el contenido del elemento y su borde?',
            answer: true,
            explanation: 'Correcto. El padding es el relleno interno de la caja.'
          },
          {
            type: 'mc',
            statement: '¿Cuál de las siguientes propiedades activa un contenedor flexible en CSS?',
            options: [
              'flex-direction: on;',
              'display: flex;',
              'layout: flexible;',
              'float: flex;'
            ],
            answerIndex: 1,
            explanation: 'display: flex convierte al contenedor en un flex container.'
          },
          {
            type: 'fill',
            statement: 'Para redondear las esquinas de una caja en CSS utilizamos la propiedad border-_____.',
            options: ['corner', 'round', 'radius', 'curve'],
            correctWord: 'radius',
            explanation: 'border-radius es la propiedad oficial para redondear bordes.'
          },
          {
            type: 'tf',
            statement: '¿Un selector con prefijo almohadilla (#) selecciona elementos por su nombre de clase?',
            answer: false,
            explanation: 'Falso. El símbolo # selecciona por ID; las clases se seleccionan con un punto (.).'
          },
          {
            type: 'mc',
            statement: '¿Qué valor de position mantiene a un elemento anclado a la pantalla fija aún cuando se desplaza la página?',
            options: ['relative', 'static', 'fixed', 'absolute'],
            answerIndex: 2,
            explanation: 'fixed mantiene el elemento anclado al viewport de la pantalla.'
          },
          {
            type: 'fill',
            statement: 'En Flexbox, para centrar los elementos a lo largo del eje transversal vertical se utiliza align-_____.',
            options: ['items', 'content', 'center', 'self'],
            correctWord: 'items',
            explanation: 'align-items se encarga de alinear los ítems en el eje transversal.'
          }
        ]
      }
    },

    js: {
      id: 'js',
      name: 'Isla JavaScript',
      shortName: 'JavaScript',
      subtitle: 'Interactividad',
      lessons: [
        {
          id: 'js-1',
          title: 'Introducción a JavaScript y la Consola',
          content: `
            <p>Si HTML es el casco del barco y CSS es su pintura, <strong>JavaScript</strong> es el motor y la tripulación viva que responde a los comandos.</p>
            <p>JavaScript se ejecuta en el navegador del usuario y permite dar interactividad: responder a clics, validar datos y cambiar la pantalla sin recargar.</p>
            <p>Podemos enviar mensajes secretos a la consola del desarrollador con <code>console.log()</code>:</p>
            <pre><code>console.log("¡Calavera a babor!");
console.warn("Aguas poco profundas");
console.error("¡Nos estamos hundiendo!");</code></pre>
            <p>Se enlaza en HTML mediante la etiqueta <code>&lt;script src="js/script.js"&gt;&lt;/script&gt;</code>.</p>
          `,
          questions: [
            {
              statement: 'console.log() imprime mensajes en la consola del navegador útiles para depurar código.',
              answer: true,
              explanation: 'Verdadero. La consola de herramientas de desarrollo es el principal amigo del programador.'
            },
            {
              statement: 'JavaScript y Java son exactamente el mismo lenguaje de programación.',
              answer: false,
              explanation: 'Falso. Son lenguajes completamente distintos con filosofías, sintaxis y propósitos diferentes.'
            },
            {
              statement: 'El código JavaScript se puede incluir en un archivo HTML mediante la etiqueta <script>.',
              answer: true,
              explanation: 'Verdadero. <script> permite escribir código directo o referenciar archivos externos con el atributo src.'
            }
          ]
        },
        {
          id: 'js-2',
          title: 'Variables: let y const',
          content: `
            <p>Para recordar cuántos doblones tenemos o cuál es la isla de destino, necesitamos <strong>variables</strong> que almacenen información en la memoria.</p>
            <p>En el JavaScript moderno utilizamos dos palabras clave primordiales:</p>
            <ul>
              <li><code>const</code>: Para valores constantes que <strong>no van a cambiar</strong> de reasignación. ¡Úsala siempre que sea posible!</li>
              <li><code>let</code>: Para valores que cambiarán con el tiempo (como un contador o una puntuación).</li>
            </ul>
            <pre><code>const nombreCapitan = "Edward Teach";
let doblonesDeOro = 50;

doblonesDeOro = doblonesDeOro + 10; // ¡Ahora tenemos 60!</code></pre>
            <div class="lesson-callout">
              <strong>Evita el fantasma de var:</strong> La palabra clave <code>var</code> es del JavaScript antiguo y tiene problemas de alcance (scope). En código moderno usamos <code>let</code> y <code>const</code>.
            </div>
          `,
          questions: [
            {
              statement: 'Una variable declarada con const puede ser reasignada con un nuevo valor en cualquier momento.',
              answer: false,
              explanation: 'Falso. Las variables const son constantes y lanzarían un error TypeError si intentas reasignarlas.'
            },
            {
              statement: 'let permite reasignar nuevos valores a la variable a lo largo del programa.',
              answer: true,
              explanation: 'Verdadero. let es la palabra clave indicada cuando el valor debe actualizarse.'
            },
            {
              statement: 'En JavaScript moderno se prefiere el uso de let y const en lugar de var.',
              answer: true,
              explanation: 'Verdadero. let y const tienen alcance de bloque (block scope) y previenen errores comunes.'
            }
          ]
        },
        {
          id: 'js-3',
          title: 'Tipos de Datos Primitivos',
          content: `
            <p>Todo dato en JavaScript tiene una naturaleza. Los tipos de datos primitivos más comunes son:</p>
            <ul>
              <li><strong>String (Texto):</strong> Se encierran en comillas simples, dobles o backticks. <code>"Perla Negra"</code>.</li>
              <li><strong>Number (Número):</strong> Números enteros o decimales. <code>42</code>, <code>3.14</code>.</li>
              <li><strong>Boolean (Booleano):</strong> Solo dos verdades posibles: <code>true</code> o <code>false</code>.</li>
              <li><strong>Null:</strong> Ausencia intencional de cualquier valor.</li>
              <li><strong>Undefined:</strong> Una variable que fue declarada pero aún no tiene valor asignado.</li>
            </ul>
            <p>El operador <code>typeof</code> nos revela el tipo de cualquier valor: <code>typeof 42 // "number"</code>.</p>
          `,
          questions: [
            {
              statement: 'Un tipo de dato Booleano solo puede tener dos valores: true o false.',
              answer: true,
              explanation: 'Verdadero. Los booleanos representan lógica binaria (verdadero o falso).'
            },
            {
              statement: 'typeof "Hola Pirata" devolverá "number".',
              answer: false,
              explanation: 'Falso. Cualquier dato entre comillas es de tipo "string" (cadena de texto).'
            },
            {
              statement: 'El operador typeof se utiliza para inspeccionar el tipo de dato de una variable o valor.',
              answer: true,
              explanation: 'Verdadero. typeof devuelve una cadena con el tipo correspondiente.'
            }
          ]
        },
        {
          id: 'js-4',
          title: 'Operadores y Comparaciones',
          content: `
            <p>Para tomar decisiones o calcular el botín usamos operadores:</p>
            <p><strong>Aritméticos:</strong> <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code> (módulo o resto).</p>
            <p><strong>Comparación Estricta:</strong> <code>===</code> (igual valor y mismo tipo) y <code>!==</code> (distinto estricto).</p>
            <p><strong>Lógicos:</strong></p>
            <ul>
              <li><code>&&</code> (AND): Ambas condiciones deben cumplirse.</li>
              <li><code>||</code> (OR): Al menos una condición debe cumplirse.</li>
              <li><code>!</code> (NOT): Invierte el valor booleano.</li>
            </ul>
            <div class="lesson-callout">
              <strong>El Consejo del Almirante:</strong> Usa siempre <code>===</code> en lugar de <code>==</code> para evitar conversiones implícitas de tipo inesperadas.
            </div>
          `,
          questions: [
            {
              statement: 'El operador === compara tanto el valor como el tipo de dato de manera estricta.',
              answer: true,
              explanation: 'Verdadero. Por ejemplo, 5 === "5" devuelve false porque uno es número y el otro es texto.'
            },
            {
              statement: 'En la expresión (true && false) el resultado final es true.',
              answer: false,
              explanation: 'Falso. Con el operador AND (&&), ambas partes deben ser verdaderas para que el resultado sea true.'
            },
            {
              statement: 'El operador ! invierte el valor de verdad (por ejemplo, !true es false).',
              answer: true,
              explanation: 'Verdadero. El operador de negación lógica NOT invierte el estado booleano.'
            }
          ]
        },
        {
          id: 'js-5',
          title: 'Estructuras de Control: if / else',
          content: `
            <p>El timonel debe decidir si girar a babor o a estribor según la dirección del viento. En código usamos <code>if</code> y <code>else</code>:</p>
            <pre><code>const tripulantes = 12;

if (tripulantes >= 10) {
  console.log("¡Podemos zarpar a la batalla!");
} else if (tripulantes > 5) {
  console.log("Tripulación mínima; naveguen con cautela.");
} else {
  console.log("Faltan marineros en el puerto.");
}</code></pre>
            <p>El código dentro de las llaves <code>{}</code> solo se ejecuta si la condición entre paréntesis se evalúa como verdadera.</p>
          `,
          questions: [
            {
              statement: 'El bloque dentro de un if solo se ejecuta si la condición evaluada es verdadera.',
              answer: true,
              explanation: 'Verdadero. Si es falsa, el programa salta al bloque else o continúa con la siguiente instrucción.'
            },
            {
              statement: 'Es obligatorio que todo if vaya acompañado forzosamente de un bloque else.',
              answer: false,
              explanation: 'Falso. El bloque else es completamente opcional según la lógica del problema.'
            },
            {
              statement: 'Podemos encadenar múltiples condiciones intermedias utilizando else if.',
              answer: true,
              explanation: 'Verdadero. else if permite comprobar condiciones alternativas en cascada.'
            }
          ]
        },
        {
          id: 'js-6',
          title: 'Funciones: Órdenes del Capitán',
          content: `
            <p>Una función es un conjunto de instrucciones empaquetadas que podemos reutilizar cuantas veces queramos sin reescribir código.</p>
            <pre><code>// Declaración de función tradicional
function dispararCanones(cantidad) {
  return "¡Disparando " + cantidad + " cañones con furia!";
}

// Función flecha moderna (Arrow Function)
const calcularBotin = (oro, tripulantes) => oro / tripulantes;

// Invocación de la función
const resultado = dispararCanones(3);</code></pre>
            <p>La palabra clave <code>return</code> devuelve el resultado procesado al lugar donde se llamó la función.</p>
          `,
          questions: [
            {
              statement: 'La palabra clave return devuelve un valor desde la función y finaliza su ejecución.',
              answer: true,
              explanation: 'Verdadero. return entrega el resultado y sale inmediatamente de la función.'
            },
            {
              statement: 'Una función solo puede ejecutarse una sola vez en toda la vida del programa.',
              answer: false,
              explanation: 'Falso. Las funciones son bloques reutilizables diseñados para llamarse tantas veces como sea necesario.'
            },
            {
              statement: 'Las funciones flecha (arrow functions) utilizan la sintaxis () => {}.',
              answer: true,
              explanation: 'Verdadero. Es la sintaxis concisa introducida en ES6.'
            }
          ]
        },
        {
          id: 'js-7',
          title: 'Arreglos (Arrays) y Listas',
          content: `
            <p>Un cofre con múltiples objetos se representa en JavaScript como un <strong>Array</strong> (arreglo o lista ordenada).</p>
            <p>Los arreglos se definen entre corchetes <code>[]</code> y sus posiciones están indexadas <strong>empezando desde 0</strong>:</p>
            <pre><code>const inventario = ["Brújula", "Mapa", "Ron", "Espada"];

console.log(inventario[0]); // "Brújula" (primer elemento)
console.log(inventario.length); // 4 elementos

// Métodos básicos
inventario.push("Catalejo"); // Agrega al final
inventario.pop();            // Elimina el último elemento</code></pre>
          `,
          questions: [
            {
              statement: 'En los arreglos de JavaScript, el primer elemento se encuentra en la posición o índice 0.',
              answer: true,
              explanation: 'Verdadero. La indexación en JavaScript es basada en cero (zero-indexed).'
            },
            {
              statement: 'La propiedad length de un array nos devuelve la cantidad total de elementos que contiene.',
              answer: true,
              explanation: 'Verdadero. array.length indica el número de elementos.'
            },
            {
              statement: 'El método push() elimina el primer elemento del arreglo.',
              answer: false,
              explanation: 'Falso. push() agrega un nuevo elemento al final del array. Para eliminar el último se usa pop().'
            }
          ]
        },
        {
          id: 'js-8',
          title: 'Objetos y Propiedades',
          content: `
            <p>Un barco pirata tiene muchas características: nombre, cañones, capitán y si está a flote. Para agrupar datos estructurados usamos <strong>Objetos</strong>.</p>
            <pre><code>const barco = {
  nombre: "Venganza de la Reina Ana",
  canones: 40,
  estaAFlofe: true,
  capitan: {
    nombre: "Barbanegra",
    rango: "Temido Corsario"
  }
};

// Acceso por notación de punto
console.log(barco.nombre);
console.log(barco.capitan.nombre);</code></pre>
            <p>Los objetos almacenan parejas de <code>clave: valor</code> entre llaves <code>{}</code>.</p>
          `,
          questions: [
            {
              statement: 'Los objetos en JavaScript almacenan datos organizados en pares de clave y valor.',
              answer: true,
              explanation: 'Verdadero. Cada propiedad tiene un nombre (clave) y un contenido (valor).'
            },
            {
              statement: 'Para acceder al valor de una propiedad de un objeto se utiliza la notación de punto (ej. objeto.propiedad).',
              answer: true,
              explanation: 'Verdadero. La notación de punto es la forma más común y legible de acceder a propiedades.'
            },
            {
              statement: 'Un objeto solo puede almacenar números y nunca texto u otros objetos.',
              answer: false,
              explanation: 'Falso. Los objetos pueden almacenar strings, números, booleanos, arrays, funciones e incluso otros objetos anidados.'
            }
          ]
        },
        {
          id: 'js-9',
          title: 'El DOM: Interactuando con la Página',
          content: `
            <p>El <strong>DOM (Document Object Model)</strong> es el puente mágico que permite a JavaScript leer y modificar el HTML y el CSS en vivo.</p>
            <p>Para buscar elementos en la página usamos métodos como:</p>
            <ul>
              <li><code>document.getElementById("mi-id")</code></li>
              <li><code>document.querySelector(".mi-clase")</code></li>
            </ul>
            <pre><code>// Seleccionar el título
const titulo = document.getElementById("titulo-isla");

// Modificar su texto
titulo.textContent = "¡Nuevo Puerto Conquistado!";

// Cambiar o alternar una clase CSS
titulo.classList.add("activo");</code></pre>
          `,
          questions: [
            {
              statement: 'document.getElementById() busca y devuelve un elemento por su identificador único (id).',
              answer: true,
              explanation: 'Verdadero. Es uno de los métodos más rápidos para obtener un elemento por ID.'
            },
            {
              statement: 'La propiedad textContent permite leer o cambiar el contenido de texto de un elemento HTML.',
              answer: true,
              explanation: 'Verdadero. textContent actualiza el texto de forma segura y directa.'
            },
            {
              statement: 'El DOM es inmutable y JavaScript tiene prohibido alterar las clases o estilos de los elementos.',
              answer: false,
              explanation: 'Falso. El propósito fundamental del DOM es permitir a JavaScript modificar dinámicamente elementos, clases y atributos.'
            }
          ]
        },
        {
          id: 'js-10',
          title: 'Eventos: Escuchar a los Tripulantes',
          content: `
            <p>¡Hemos llegado a la cumbre de la Isla JavaScript! Una web cobra vida cuando reacciona a lo que hace el usuario: clics, teclas o scroll.</p>
            <p>Para escuchar acciones usamos <code>addEventListener()</code>:</p>
            <pre><code>const botonDisparo = document.getElementById("btn-disparar");

botonDisparo.addEventListener("click", function() {
  alert("¡Fuego a discreción!");
});</code></pre>
            <p>El primer argumento es el nombre del evento (como <code>"click"</code> o <code>"scroll"</code>), y el segundo es la función que se ejecutará cuando el evento ocurra.</p>
          `,
          questions: [
            {
              statement: 'addEventListener() permite registrar una función que se ejecutará cuando ocurra un evento específico.',
              answer: true,
              explanation: 'Verdadero. Escucha eventos como "click", "submit", "keydown", etc.'
            },
            {
              statement: 'El evento "click" solo funciona en computadoras y nunca se activa con toques en pantallas táctiles de móviles.',
              answer: false,
              explanation: 'Falso. Los navegadores móviles traducen automáticamente los toques (taps) a eventos de click.'
            },
            {
              statement: 'Se pueden agregar múltiples escuchadores de eventos diferentes al mismo elemento HTML.',
              answer: true,
              explanation: 'Verdadero. Un mismo botón puede reaccionar a click, mouseenter, focus, etc.'
            }
          ]
        }
      ],
      exam: {
        title: 'Examen Final de JavaScript: El Orbe de la Magia',
        questions: [
          {
            type: 'tf',
            statement: '¿El método console.log() imprime información en la consola de herramientas de desarrollo?',
            answer: true,
            explanation: 'Correcto. Es el comando primordial para inspeccionar valores y depurar.'
          },
          {
            type: 'mc',
            statement: '¿Cuál es la palabra clave recomendada para declarar una variable cuyo valor nunca debe cambiar?',
            options: ['var', 'let', 'const', 'fixed'],
            answerIndex: 2,
            explanation: 'const declara variables inmutables en reasignación.'
          },
          {
            type: 'fill',
            statement: 'Para agregar un nuevo elemento al final de un arreglo utilizamos el método array._____().',
            options: ['pop', 'push', 'shift', 'insert'],
            correctWord: 'push',
            explanation: 'push() inserta uno o más elementos al final del array.'
          },
          {
            type: 'tf',
            statement: '¿La expresión 10 === "10" se evaluará como verdadera (true) en JavaScript?',
            answer: false,
            explanation: 'Falso. Con el comparador estricto === los tipos difieren (número vs string), resultando en false.'
          },
          {
            type: 'mc',
            statement: '¿Qué método del objeto document se utiliza para registrar una función ante un evento de usuario?',
            options: [
              'attachTrigger()',
              'addEventListener()',
              'setEventHandler()',
              'listenAction()'
            ],
            answerIndex: 1,
            explanation: 'addEventListener() es la API estándar del DOM para suscripción de eventos.'
          },
          {
            type: 'fill',
            statement: 'Para modificar el texto interno de un elemento del DOM mediante JavaScript usamos la propiedad text_____.',
            options: ['Content', 'Value', 'String', 'Node'],
            correctWord: 'Content',
            explanation: 'textContent permite leer y escribir texto en cualquier nodo del DOM.'
          }
        ]
      }
    }
  };

  // -------------------------------------------------------------------------
  // 2. SISTEMA DE AUDIO NÁUTICO SINTETIZADO (Web Audio API)
  // -------------------------------------------------------------------------
  class NauticalSoundManager {
    constructor() {
      this.enabled = true;
      this.audioCtx = null;
    }

    init() {
      if (!this.audioCtx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContextClass();
      }
    }

    playTone(freq, type, duration, gainVal = 0.1) {
      if (!this.enabled) return;
      try {
        this.init();
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(gainVal, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + duration);
      } catch (e) {
        // Ignorar fallas silenciosas de audio en navegadores restrictivos
      }
    }

    click() {
      this.playTone(320, 'triangle', 0.08, 0.05);
    }

    correct() {
      this.playTone(587.33, 'sine', 0.12, 0.08); // Re
      setTimeout(() => this.playTone(880, 'sine', 0.25, 0.08), 100); // La
    }

    wrong() {
      this.playTone(180, 'sawtooth', 0.2, 0.09);
    }

    victory() {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // Do, Mi, Sol, Do agudo
      notes.forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'sine', 0.3, 0.1), idx * 120);
      });
    }
  }

  const sound = new NauticalSoundManager();

  // -------------------------------------------------------------------------
  // 3. GESTOR DE ESTADO Y PERSISTENCIA (localStorage)
  // -------------------------------------------------------------------------
  const STORAGE_KEY = 'mapa_desarrollo_web_pirate_data_v1';

  function loadState() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Error leyendo localStorage:', e);
    }
    return {
      theme: 'light',
      completedLessons: {
        html: [],
        css: [],
        js: []
      },
      passedExams: {
        html: false,
        css: false,
        js: false
      }
    };
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Error guardando en localStorage:', e);
    }
  }

  const appState = loadState();

  // -------------------------------------------------------------------------
  // 4. ELEMENTOS DEL DOM
  // -------------------------------------------------------------------------
  const dom = {
    // Vistas principales
    viewHome: document.getElementById('view-home'),
    viewIsland: document.getElementById('view-island'),
    viewLesson: document.getElementById('view-lesson'),
    viewExam: document.getElementById('view-exam'),

    // Cabecera global y botones
    btnHomeNav: document.getElementById('btn-home-nav'),
    btnThemeToggle: document.getElementById('btn-theme-toggle'),
    themeThumb: document.getElementById('theme-icon-container'),
    btnSoundToggle: document.getElementById('btn-sound-toggle'),
    btnSettings: document.getElementById('btn-settings'),
    settingsPanel: document.getElementById('header-settings-panel'),
    btnResetData: document.getElementById('btn-reset-data'),

    // Targetero de fichas de conceptos
    viewGlosario: document.getElementById('view-glosario'),
    btnOpenGlosario: document.getElementById('btn-open-glosario'),
    btnBackGlosario: document.getElementById('btn-back-glosario'),
    glosarioSlider: document.getElementById('glosario-slider'),
    glosarioTrack: document.getElementById('glosario-track'),
    glosarioEmpty: document.getElementById('glosario-empty'),
    glosarioCount: document.getElementById('glosario-count'),
    glosarioPosition: document.getElementById('glosario-position'),
    glosarioSearchInput: document.getElementById('glosario-search-input'),
    btnGlosarioPrev: document.getElementById('btn-glosario-prev'),
    btnGlosarioNext: document.getElementById('btn-glosario-next'),

    // Vista Home
    globalProgressBar: document.getElementById('global-progress-bar'),
    globalProgressText: document.getElementById('global-progress-text'),
    globalMedalsText: document.getElementById('global-medals-text'),

    // Badges de las 3 islas en el Home
    badgeHtmlCount: document.getElementById('badge-html-count'),
    badgeHtmlStatus: document.getElementById('badge-html-status'),
    badgeCssCount: document.getElementById('badge-css-count'),
    badgeCssStatus: document.getElementById('badge-css-status'),
    badgeJsCount: document.getElementById('badge-js-count'),
    badgeJsStatus: document.getElementById('badge-js-status'),

    // Vista Isla
    btnBackToHome: document.getElementById('btn-back-to-home'),
    currentIslandTitle: document.getElementById('current-island-title'),
    currentIslandSubtitle: document.getElementById('current-island-subtitle'),
    islandProgressBar: document.getElementById('island-progress-bar'),
    islandProgressPercent: document.getElementById('island-progress-percent'),
    islandRatioText: document.getElementById('island-ratio-text'),
    islandLessonsList: document.getElementById('island-lessons-list'),
    finalExamTitle: document.getElementById('final-exam-title'),
    examBadgeStatus: document.getElementById('exam-badge-status'),
    btnStartFinalExam: document.getElementById('btn-start-final-exam'),
    examChestGraphic: document.getElementById('exam-chest-graphic'),

    // Vista Lección
    btnExitLesson: document.getElementById('btn-exit-lesson'),
    lessonProgressBar: document.getElementById('lesson-progress-bar'),
    lessonProgressPercent: document.getElementById('lesson-progress-percent'),
    lessonIndexPill: document.getElementById('lesson-index-pill'),
    lessonScrollContainer: document.getElementById('lesson-scroll-container'),
    lessonIslandBreadcrumb: document.getElementById('lesson-island-breadcrumb'),
    lessonConceptTitle: document.getElementById('lesson-concept-title'),
    lessonTextContent: document.getElementById('lesson-text-content'),
    lessonQuestionsContainer: document.getElementById('lesson-questions-container'),
    btnFinishLesson: document.getElementById('btn-finish-lesson'),
    finishHintText: document.getElementById('finish-hint-text'),

    // Vista Examen Final
    btnExitExam: document.getElementById('btn-exit-exam'),
    examProgressBar: document.getElementById('exam-progress-bar'),
    examProgressPercent: document.getElementById('exam-progress-percent'),
    examProgressLabel: document.getElementById('exam-progress-label'),
    examIslandPill: document.getElementById('exam-island-pill'),
    examQuestionCard: document.getElementById('exam-question-card'),
    btnExamNext: document.getElementById('btn-exam-next'),

    // Modal de Celebración
    modalCelebration: document.getElementById('modal-celebration'),
    modalSealIcon: document.getElementById('modal-seal-icon'),
    modalIllustrationContainer: document.getElementById('modal-illustration-container'),
    modalTitle: document.getElementById('modal-title'),
    modalMessage: document.getElementById('modal-message'),
    modalStatsBox: document.getElementById('modal-stats-box'),
    btnModalReturnIsland: document.getElementById('btn-modal-return-island'),
    btnModalNextStep: document.getElementById('btn-modal-next-step')
  };

  // Variables de navegación en curso
  let currentActiveIsland = 'html';
  let currentActiveLessonIndex = 0;
  let currentLessonQuestionsState = [null, null, null]; // true, false o null para cada una de las 3 preguntas
  let currentExamQuestionIndex = 0;
  let currentExamScore = 0;

  // -------------------------------------------------------------------------
  // 5. CONTROLADOR DE TEMA CLARO / OSCURO (Representación Pirata)
  // -------------------------------------------------------------------------
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
    }

    // Switch del encabezado: solo cambio visual, sin letras
    if (dom.btnThemeToggle) {
      dom.btnThemeToggle.setAttribute('aria-checked', String(theme === 'dark'));
    }
    if (dom.themeThumb) {
      dom.themeThumb.innerHTML = theme === 'dark' ? icon('moon', 14) : icon('sun', 14);
    }

    appState.theme = theme;
    saveState(appState);
  }

  // Icono del botón de sonido (volumen activo / silenciado)
  function renderSoundIcon() {
    if (!dom.btnSoundToggle) return;
    dom.btnSoundToggle.innerHTML = sound.enabled ? icon('volume', 20) : icon('volumeX', 20);
    dom.btnSoundToggle.classList.toggle('is-muted', !sound.enabled);
    dom.btnSoundToggle.setAttribute('aria-label', sound.enabled ? 'Silenciar sonido' : 'Activar sonido');
  }

  function toggleTheme() {
    sound.click();
    const newTheme = appState.theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }

  // -------------------------------------------------------------------------
  // 6. NAVEGACIÓN Y CAMBIO DE VISTAS
  // -------------------------------------------------------------------------
  function switchView(targetViewId) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    [dom.viewHome, dom.viewIsland, dom.viewLesson, dom.viewExam, dom.viewGlosario].forEach(view => {
      view.classList.remove('active');
    });

    if (targetViewId === 'home') {
      dom.viewHome.classList.add('active');
      renderHomeStats();
    } else if (targetViewId === 'island') {
      dom.viewIsland.classList.add('active');
      renderIslandView(currentActiveIsland);
    } else if (targetViewId === 'lesson') {
      dom.viewLesson.classList.add('active');
    } else if (targetViewId === 'exam') {
      dom.viewExam.classList.add('active');
    } else if (targetViewId === 'glosario') {
      dom.viewGlosario.classList.add('active');
      renderGlosario(dom.glosarioSearchInput ? dom.glosarioSearchInput.value : '');
    }
  }

  // -------------------------------------------------------------------------
  // 6B. TARGETERO DE FICHAS DE CONCEPTOS (GLOSARIO EN SLIDER)
  // -------------------------------------------------------------------------
  const GLOSSARY_DATA = Array.isArray(window.GLOSARIO_DATA) ? window.GLOSARIO_DATA : [];

  let glosarioVisibleCards = [];
  let glosarioIndex = 0;

  function renderGlosario(filter = '') {
    if (!dom.glosarioTrack) return;

    const query = String(filter).trim().toLowerCase();
    glosarioVisibleCards = GLOSSARY_DATA.filter(ficha =>
      !query ||
      ficha.term.toLowerCase().includes(query) ||
      ficha.def.toLowerCase().includes(query)
    );

    dom.glosarioTrack.innerHTML = glosarioVisibleCards.map(ficha => `
      <div class="glosario-slide">
        <article class="study-card">
          <h3 class="study-term">${escapeHtml(ficha.term)}</h3>
          <p class="study-def">${escapeHtml(ficha.def)}</p>
        </article>
      </div>
    `).join('');

    glosarioIndex = 0;
    updateGlosarioSlider(false);

    if (dom.glosarioEmpty) dom.glosarioEmpty.hidden = glosarioVisibleCards.length > 0;
    if (dom.glosarioCount) {
      dom.glosarioCount.textContent = query
        ? `${glosarioVisibleCards.length} de ${GLOSSARY_DATA.length} fichas`
        : `${GLOSSARY_DATA.length} fichas`;
    }
  }

  // Coloca la pista en la ficha actual (sin animación opcional, p. ej. al buscar)
  function updateGlosarioSlider(animate = true) {
    if (!dom.glosarioTrack) return;

    const total = glosarioVisibleCards.length;

    if (!animate) dom.glosarioTrack.style.transition = 'none';
    dom.glosarioTrack.style.transform = `translateX(-${glosarioIndex * 100}%)`;
    if (!animate) {
      void dom.glosarioTrack.offsetWidth; // forzar reflow
      dom.glosarioTrack.style.transition = '';
    }

    if (dom.glosarioPosition) {
      dom.glosarioPosition.textContent = total ? `${glosarioIndex + 1} / ${total}` : '0 / 0';
    }
    if (dom.btnGlosarioPrev) dom.btnGlosarioPrev.disabled = glosarioIndex <= 0;
    if (dom.btnGlosarioNext) dom.btnGlosarioNext.disabled = glosarioIndex >= total - 1;
  }

  function goToGlosarioCard(index) {
    const total = glosarioVisibleCards.length;
    if (!total) return;
    glosarioIndex = Math.max(0, Math.min(total - 1, index));
    updateGlosarioSlider();
  }

  // -------------------------------------------------------------------------
  // 7. RENDERIZADO DEL HOME Y ESTADÍSTICAS GLOBALES
  // -------------------------------------------------------------------------
  function renderHomeStats() {
    const totalLessons = 30;
    const completedHtml = appState.completedLessons.html.length;
    const completedCss = appState.completedLessons.css.length;
    const completedJs = appState.completedLessons.js.length;
    const totalCompleted = completedHtml + completedCss + completedJs;
    const percent = Math.round((totalCompleted / totalLessons) * 100);

    let examsPassedCount = 0;
    if (appState.passedExams.html) examsPassedCount++;
    if (appState.passedExams.css) examsPassedCount++;
    if (appState.passedExams.js) examsPassedCount++;

    dom.globalProgressBar.style.width = `${percent}%`;
    dom.globalProgressText.textContent = `${totalCompleted} / ${totalLessons} (${percent}%)`;
    dom.globalMedalsText.textContent = `${examsPassedCount} / 3`;

    // Badges de cada isla
    const renderIslandPill = (statusEl, count) => {
      statusEl.innerHTML = count === 10
        ? `<span class="pill-icon completed">${icon('check', 14)} Conquistada</span>`
        : `<span class="pill-icon">${icon('anchor', 14)} ${Math.round((count / 10) * 100)}%</span>`;
    };

    dom.badgeHtmlCount.textContent = `${completedHtml} / 10`;
    renderIslandPill(dom.badgeHtmlStatus, completedHtml);

    dom.badgeCssCount.textContent = `${completedCss} / 10`;
    renderIslandPill(dom.badgeCssStatus, completedCss);

    dom.badgeJsCount.textContent = `${completedJs} / 10`;
    renderIslandPill(dom.badgeJsStatus, completedJs);
  }

  // -------------------------------------------------------------------------
  // 8. RENDERIZADO DE LA ISLA Y SU SENDERO DE 10 LECCIONES
  // -------------------------------------------------------------------------
  function renderIslandView(islandId) {
    const islandData = COURSE_DATA[islandId];
    if (!islandData) return;

    currentActiveIsland = islandId;

    dom.currentIslandTitle.textContent = `${islandData.name}`;
    dom.currentIslandSubtitle.textContent = islandData.subtitle;

    const completedArray = appState.completedLessons[islandId] || [];
    const completedCount = completedArray.length;
    const percent = Math.round((completedCount / 10) * 100);

    dom.islandProgressBar.style.width = `${percent}%`;
    dom.islandProgressPercent.textContent = `${percent}%`;
    dom.islandRatioText.textContent = `${completedCount} / 10`;

    // Generar la lista de las 10 lecciones
    dom.islandLessonsList.innerHTML = '';

    islandData.lessons.forEach((lesson, index) => {
      const isCompleted = completedArray.includes(lesson.id);

      const li = document.createElement('li');
      li.className = 'lesson-node-item';

      li.innerHTML = `
        <div class="lesson-trail-card ${isCompleted ? 'completed' : ''}" data-lesson-index="${index}" tabindex="0" role="button" aria-label="Lección ${index + 1}: ${lesson.title}">
          <div class="lesson-node-left">
            <div class="node-step-circle">
              ${isCompleted ? icon('check', 18) : index + 1}
            </div>
            <div class="node-text-group">
              <span class="node-badge-num">Módulo ${index + 1}</span>
              <span class="node-lesson-title">${lesson.title}</span>
            </div>
          </div>
          <div class="lesson-node-right">
            <span class="status-check-badge" title="${isCompleted ? 'Completada' : 'Pendiente'}">
              ${isCompleted ? icon('check', 16) : icon('anchor', 16)}
            </span>
          </div>
        </div>
      `;

      // Evento de clic en la tarjeta de lección
      const card = li.querySelector('.lesson-trail-card');
      card.addEventListener('click', () => {
        sound.click();
        openLesson(islandId, index);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          sound.click();
          openLesson(islandId, index);
        }
      });

      dom.islandLessonsList.appendChild(li);
    });

    // Estado del Examen Final de la Isla
    dom.finalExamTitle.textContent = `Examen: ${islandData.shortName}`;
    const examPassed = appState.passedExams[islandId];

    if (examPassed) {
      dom.examBadgeStatus.innerHTML = `${icon('trophy', 15)} Conquistado`;
      dom.examBadgeStatus.style.color = '#1E824C';
      dom.btnStartFinalExam.textContent = 'Repetir';
      dom.examChestGraphic.innerHTML = icon('trophy', 42);
    } else {
      dom.examBadgeStatus.style.color = '';
      dom.examBadgeStatus.innerHTML = completedCount >= 10
        ? `${icon('unlock', 15)} Listo`
        : `${icon('anchor', 15)} ${completedCount} / 10`;
      dom.btnStartFinalExam.textContent = 'Iniciar';
      dom.examChestGraphic.innerHTML = icon('gem', 42);
    }
  }

  // -------------------------------------------------------------------------
  // FORMATEADOR DE CÓDIGO Y ETIQUETAS (Evita que el navegador oculte las etiquetas HTML)
  // -------------------------------------------------------------------------
  function formatCodeInText(text) {
    if (!text) return '';
    // Escapa y envuelve etiquetas como <ul>, <item>, <li>, <!DOCTYPE ...>, etc. en <code>&lt;...&gt;</code>
    return text.replace(/<(\/?(?:!DOCTYPE|[a-zA-Z0-9_-]+)(?:\s+[^>]*)?)>/g, (match, tagContent) => {
      return `<code>&lt;${tagContent}&gt;</code>`;
    });
  }

  // -------------------------------------------------------------------------
  // 9. VISTA LECCIÓN: LECTURA EN PERGAMINO, 3 PREGUNTAS V/F Y TERMINAR
  // -------------------------------------------------------------------------
  function openLesson(islandId, lessonIndex) {
    const islandData = COURSE_DATA[islandId];
    if (!islandData) return;
    const lesson = islandData.lessons[lessonIndex];
    if (!lesson) return;

    currentActiveIsland = islandId;
    currentActiveLessonIndex = lessonIndex;
    currentLessonQuestionsState = [null, null, null];

    // Reiniciar barra de progreso de la lección
    updateLessonProgress();

    // Rellenar cabecera
    dom.lessonIndexPill.textContent = `Módulo ${lessonIndex + 1} / 10`;
    dom.lessonIslandBreadcrumb.textContent = `${islandData.name} · Módulo ${lessonIndex + 1}`;
    dom.lessonConceptTitle.textContent = lesson.title;

    // Rellenar texto conceptual en pergamino
    dom.lessonTextContent.innerHTML = lesson.content;

    // Renderizar las 3 preguntas de Verdadero o Falso
    dom.lessonQuestionsContainer.innerHTML = '';

    lesson.questions.forEach((q, qIndex) => {
      const qCard = document.createElement('article');
      qCard.className = 'question-card';
      qCard.id = `q-card-${qIndex}`;

      qCard.innerHTML = `
        <div class="question-header-row">
          <span class="question-number-badge">Pregunta ${qIndex + 1} / 3</span>
          <span class="question-feedback-icon" id="q-icon-${qIndex}">${icon('help', 18)}</span>
        </div>
        <p class="question-prompt-text">${formatCodeInText(q.statement)}</p>
        <div class="tf-buttons-row">
          <button type="button" class="tf-btn" data-choice="true" id="btn-q-${qIndex}-true">
            <span class="tf-icon" id="btn-icon-${qIndex}-true"></span>
            <span>Verdadero</span>
          </button>
          <button type="button" class="tf-btn" data-choice="false" id="btn-q-${qIndex}-false">
            <span class="tf-icon" id="btn-icon-${qIndex}-false"></span>
            <span>Falso</span>
          </button>
        </div>
        <div class="question-explanation-box" id="q-exp-${qIndex}" style="display: none;"></div>
      `;

      // Eventos para Verdadero y Falso
      const btnTrue = qCard.querySelector('#btn-q-' + qIndex + '-true');
      const btnFalse = qCard.querySelector('#btn-q-' + qIndex + '-false');

      btnTrue.addEventListener('click', () => handleTfAnswer(qIndex, true));
      btnFalse.addEventListener('click', () => handleTfAnswer(qIndex, false));

      dom.lessonQuestionsContainer.appendChild(qCard);
    });

    // Resetear botón de terminar
    dom.btnFinishLesson.disabled = true;
    dom.finishHintText.textContent = 'Responde las 3 preguntas.';

    switchView('lesson');
  }

  // Manejo de respuesta en las preguntas V/F con retroalimentación ROJA y VERDE
  function handleTfAnswer(qIndex, userChoice) {
    const lesson = COURSE_DATA[currentActiveIsland].lessons[currentActiveLessonIndex];
    const qData = lesson.questions[qIndex];

    const btnTrue = document.getElementById(`btn-q-${qIndex}-true`);
    const btnFalse = document.getElementById(`btn-q-${qIndex}-false`);
    const expBox = document.getElementById(`q-exp-${qIndex}`);
    const iconSpan = document.getElementById(`q-icon-${qIndex}`);

    // Si ya fue respondida, no permitir cambiar
    if (btnTrue.disabled) return;

    btnTrue.disabled = true;
    btnFalse.disabled = true;

    const isCorrect = (userChoice === qData.answer);
    currentLessonQuestionsState[qIndex] = isCorrect;

    const chosenBtn = userChoice ? btnTrue : btnFalse;
    const correctBtn = qData.answer ? btnTrue : btnFalse;

    const iconTrue = document.getElementById(`btn-icon-${qIndex}-true`);
    const iconFalse = document.getElementById(`btn-icon-${qIndex}-false`);

    if (isCorrect) {
      sound.correct();
      chosenBtn.classList.add('selected-correct');
      if (iconTrue && iconFalse) {
        const okIcon = icon('check', 16, 'is-correct');
        (userChoice ? iconTrue : iconFalse).innerHTML = okIcon;
      }
      iconSpan.innerHTML = icon('checkCircle', 18, 'is-correct');
      expBox.className = 'question-explanation-box is-correct';
      expBox.innerHTML = `<strong>¡Correcto!</strong> ${formatCodeInText(qData.explanation)}`;
    } else {
      sound.wrong();
      chosenBtn.classList.add('selected-wrong');
      correctBtn.classList.add('correct-revealed');
      if (iconTrue && iconFalse) {
        (userChoice ? iconTrue : iconFalse).innerHTML = icon('x', 16, 'is-wrong');
        (qData.answer ? iconTrue : iconFalse).innerHTML = icon('check', 16, 'is-correct');
      }
      iconSpan.innerHTML = icon('alert', 18, 'is-wrong');
      expBox.className = 'question-explanation-box is-wrong';
      expBox.innerHTML = `<strong>Incorrecto.</strong> Era <u>${qData.answer ? 'Verdadero' : 'Falso'}</u>. ${formatCodeInText(qData.explanation)}`;
    }

    expBox.style.display = 'block';

    updateLessonProgress();

    // Comprobar si las 3 preguntas han sido contestadas
    const allAnswered = currentLessonQuestionsState.every(ans => ans !== null);
    if (allAnswered) {
      dom.btnFinishLesson.disabled = false;
      dom.finishHintText.innerHTML = 'Listo. Pulsa <strong>Terminar lección</strong>.';
    }
  }

  // Actualizar barra de progreso combinando scroll del texto y preguntas respondidas
  function updateLessonProgress() {
    let answeredCount = 0;
    currentLessonQuestionsState.forEach(ans => {
      if (ans !== null) answeredCount++;
    });

    // Las preguntas representan el 60% del progreso, y el avance general mínimo es 40% al llegar a ellas
    const questionsProgress = (answeredCount / 3) * 60;
    const baseProgress = 40;
    const totalPercent = Math.min(100, Math.round((answeredCount === 3) ? 100 : (baseProgress + questionsProgress * 0.6)));

    dom.lessonProgressBar.style.width = `${totalPercent}%`;
    dom.lessonProgressPercent.textContent = `${totalPercent}%`;
  }

  // Finalizar lección
  function finishLesson() {
    sound.victory();

    const lesson = COURSE_DATA[currentActiveIsland].lessons[currentActiveLessonIndex];
    const islandList = appState.completedLessons[currentActiveIsland];

    // Marcar como completada en localStorage si no lo estaba
    if (!islandList.includes(lesson.id)) {
      islandList.push(lesson.id);
      saveState(appState);
    }

    // Modal de felicitación con animación del loro pirata
    dom.modalSealIcon.innerHTML = '';
    if (dom.modalIllustrationContainer) {
      dom.modalIllustrationContainer.innerHTML = getParrotAnimationHtml();
    }
    dom.modalTitle.textContent = '¡Lección conquistada!';
    dom.modalMessage.textContent = `"${lesson.title}" completada.`;

    const totalInIsland = islandList.length;
    dom.modalStatsBox.innerHTML = `
      <p><strong>${COURSE_DATA[currentActiveIsland].name}:</strong> ${totalInIsland} / 10 módulos.</p>
    `;

    // Configurar botones del modal
    dom.btnModalReturnIsland.textContent = 'Isla';
    dom.btnModalReturnIsland.onclick = () => {
      closeCelebrationModal();
      switchView('island');
    };

    if (currentActiveLessonIndex < 9) {
      dom.btnModalNextStep.textContent = `Módulo ${currentActiveLessonIndex + 2}`;
      dom.btnModalNextStep.onclick = () => {
        closeCelebrationModal();
        openLesson(currentActiveIsland, currentActiveLessonIndex + 1);
      };
    } else {
      dom.btnModalNextStep.textContent = 'Examen final';
      dom.btnModalNextStep.onclick = () => {
        closeCelebrationModal();
        startFinalExam(currentActiveIsland);
      };
    }

    openCelebrationModal();
  }

  // -------------------------------------------------------------------------
  // 10. EXAMEN FINAL MULTIDINÁMICA (V/F, Opción Múltiple, Completar Oración)
  // -------------------------------------------------------------------------
  function startFinalExam(islandId) {
    const islandData = COURSE_DATA[islandId];
    if (!islandData) return;

    currentActiveIsland = islandId;
    currentExamQuestionIndex = 0;
    currentExamScore = 0;

    dom.examIslandPill.textContent = `Examen: ${islandData.shortName}`;
    renderExamQuestion();
    switchView('exam');
  }

  function renderExamQuestion() {
    const islandData = COURSE_DATA[currentActiveIsland];
    const examQuestions = islandData.exam.questions;
    const totalQ = examQuestions.length;
    const qData = examQuestions[currentExamQuestionIndex];

    const currentPercent = Math.round((currentExamQuestionIndex / totalQ) * 100);
    dom.examProgressBar.style.width = `${currentPercent}%`;
    dom.examProgressPercent.textContent = `${currentPercent}%`;
    dom.examProgressLabel.textContent = `${currentExamQuestionIndex + 1} / ${totalQ}`;

    dom.btnExamNext.disabled = true;

    // Renderizar según el tipo de dinámica
    dom.examQuestionCard.innerHTML = '';

    if (qData.type === 'tf') {
      // 1. Dinámica Verdadero o Falso
      dom.examQuestionCard.innerHTML = `
        <span class="exam-type-pill">Verdadero o Falso</span>
        <h3 class="exam-question-statement">${formatCodeInText(qData.statement)}</h3>
        <div class="tf-buttons-row">
          <button type="button" class="tf-btn" id="exam-tf-true">Verdadero</button>
          <button type="button" class="tf-btn" id="exam-tf-false">Falso</button>
        </div>
        <div class="question-explanation-box" id="exam-explanation-box" style="display: none;"></div>
      `;

      const btnT = dom.examQuestionCard.querySelector('#exam-tf-true');
      const btnF = dom.examQuestionCard.querySelector('#exam-tf-false');
      const exp = dom.examQuestionCard.querySelector('#exam-explanation-box');

      const handleExamTf = (val) => {
        btnT.disabled = true;
        btnF.disabled = true;
        const isRight = (val === qData.answer);

        if (isRight) {
          sound.correct();
          currentExamScore++;
          (val ? btnT : btnF).classList.add('selected-correct');
          exp.className = 'question-explanation-box is-correct';
          exp.innerHTML = `<strong>¡Bien!</strong> ${formatCodeInText(qData.explanation)}`;
        } else {
          sound.wrong();
          (val ? btnT : btnF).classList.add('selected-wrong');
          (qData.answer ? btnT : btnF).classList.add('correct-revealed');
          exp.className = 'question-explanation-box is-wrong';
          exp.innerHTML = `<strong>Era ${qData.answer ? 'Verdadero' : 'Falso'}.</strong> ${formatCodeInText(qData.explanation)}`;
        }
        exp.style.display = 'block';
        dom.btnExamNext.disabled = false;
      };

      btnT.addEventListener('click', () => handleExamTf(true));
      btnF.addEventListener('click', () => handleExamTf(false));

    } else if (qData.type === 'mc') {
      // 2. Dinámica de Opción Múltiple
      let optionsHtml = '';
      qData.options.forEach((opt, idx) => {
        optionsHtml += `<button type="button" class="mc-option-btn" data-index="${idx}" id="exam-mc-${idx}">${formatCodeInText(opt)}</button>`;
      });

      dom.examQuestionCard.innerHTML = `
        <span class="exam-type-pill">Opción múltiple</span>
        <h3 class="exam-question-statement">${formatCodeInText(qData.statement)}</h3>
        <div class="mc-options-grid">
          ${optionsHtml}
        </div>
        <div class="question-explanation-box" id="exam-explanation-box" style="display: none;"></div>
      `;

      const btns = dom.examQuestionCard.querySelectorAll('.mc-option-btn');
      const exp = dom.examQuestionCard.querySelector('#exam-explanation-box');

      btns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
          btns.forEach(b => b.disabled = true);
          const isRight = (idx === qData.answerIndex);

          if (isRight) {
            sound.correct();
            currentExamScore++;
            btn.classList.add('selected-correct');
            exp.className = 'question-explanation-box is-correct';
            exp.innerHTML = `<strong>¡Bien!</strong> ${formatCodeInText(qData.explanation)}`;
          } else {
            sound.wrong();
            btn.classList.add('selected-wrong');
            btns[qData.answerIndex].classList.add('correct-revealed');
            exp.className = 'question-explanation-box is-wrong';
            exp.innerHTML = `<strong>Era:</strong> "${formatCodeInText(qData.options[qData.answerIndex])}". ${formatCodeInText(qData.explanation)}`;
          }
          exp.style.display = 'block';
          dom.btnExamNext.disabled = false;
        });
      });

    } else if (qData.type === 'fill') {
      // 3. Dinámica de Completar la Oración
      const formattedStatement = formatCodeInText(qData.statement);
      const sentenceParts = formattedStatement.split('_____');
      let chipsHtml = '';
      qData.options.forEach((word) => {
        chipsHtml += `<button type="button" class="word-chip-btn" data-word="${word}">${formatCodeInText(word)}</button>`;
      });

      dom.examQuestionCard.innerHTML = `
        <span class="exam-type-pill">Completar</span>
        <p class="fill-blank-sentence">
          ${sentenceParts[0]}
          <span class="blank-slot" id="exam-blank-slot">_____</span>
          ${sentenceParts[1] || ''}
        </p>
        <p style="font-size: 0.84rem; color: var(--text-muted); margin-bottom: 0.8rem;">Elige la palabra:</p>
        <div class="fill-word-chips-pool">
          ${chipsHtml}
        </div>
        <div class="question-explanation-box" id="exam-explanation-box" style="display: none;"></div>
      `;

      const blankSlot = dom.examQuestionCard.querySelector('#exam-blank-slot');
      const chips = dom.examQuestionCard.querySelectorAll('.word-chip-btn');
      const exp = dom.examQuestionCard.querySelector('#exam-explanation-box');

      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          chips.forEach(c => c.disabled = true);
          const selectedWord = chip.dataset.word;
          blankSlot.textContent = selectedWord;

          const isRight = (selectedWord === qData.correctWord);
          if (isRight) {
            sound.correct();
            currentExamScore++;
            chip.classList.add('selected-correct');
            blankSlot.style.borderColor = 'var(--color-success)';
            blankSlot.style.color = 'var(--color-success)';
            exp.className = 'question-explanation-box is-correct';
            exp.innerHTML = `<strong>¡Bien!</strong> "${qData.correctWord}". ${formatCodeInText(qData.explanation)}`;
          } else {
            sound.wrong();
            chip.classList.add('selected-wrong');
            blankSlot.style.borderColor = 'var(--color-error)';
            blankSlot.style.color = 'var(--color-error)';
            exp.className = 'question-explanation-box is-wrong';
            exp.innerHTML = `<strong>Era:</strong> "${qData.correctWord}". ${formatCodeInText(qData.explanation)}`;
          }
          exp.style.display = 'block';
          dom.btnExamNext.disabled = false;
        });
      });
    }
  }

  function advanceExam() {
    sound.click();
    const totalQ = COURSE_DATA[currentActiveIsland].exam.questions.length;
    currentExamQuestionIndex++;

    if (currentExamQuestionIndex < totalQ) {
      renderExamQuestion();
    } else {
      finishFinalExam();
    }
  }

  function finishFinalExam() {
    const totalQ = COURSE_DATA[currentActiveIsland].exam.questions.length;
    const passed = currentExamScore >= 4; // Aprueba con al menos 4 de 6

    if (passed) {
      sound.victory();
      appState.passedExams[currentActiveIsland] = true;
      saveState(appState);

      dom.modalSealIcon.innerHTML = '';
      if (dom.modalIllustrationContainer) {
        dom.modalIllustrationContainer.innerHTML = getOceanWavesAnimationHtml();
      }
      dom.modalTitle.textContent = `¡Capitán de ${COURSE_DATA[currentActiveIsland].shortName}!`;
      dom.modalMessage.textContent = 'Examen superado.';
      dom.modalStatsBox.innerHTML = `
        <p><strong>Puntuación:</strong> ${currentExamScore} / ${totalQ}</p>
      `;

      dom.btnModalReturnIsland.textContent = 'Isla';
      dom.btnModalReturnIsland.onclick = () => {
        closeCelebrationModal();
        switchView('island');
      };

      dom.btnModalNextStep.textContent = 'Mapa';
      dom.btnModalNextStep.onclick = () => {
        closeCelebrationModal();
        switchView('home');
      };
    } else {
      sound.wrong();
      dom.modalSealIcon.innerHTML = icon('anchor', 40);
      // Las olas también acompañan cuando hay que reintentar (el barco sigue navegando)
      if (dom.modalIllustrationContainer) {
        dom.modalIllustrationContainer.innerHTML = getOceanWavesAnimationHtml();
      }
      dom.modalTitle.textContent = 'Continúa navegando';
      dom.modalMessage.textContent = `${currentExamScore} / ${totalQ} correctas. Mínimo: 4.`;
      dom.modalStatsBox.innerHTML = `
        <p>Repasa e inténtalo de nuevo.</p>
      `;

      dom.btnModalReturnIsland.textContent = 'Isla';
      dom.btnModalReturnIsland.onclick = () => {
        closeCelebrationModal();
        switchView('island');
      };

      dom.btnModalNextStep.textContent = 'Reintentar';
      dom.btnModalNextStep.onclick = () => {
        closeCelebrationModal();
        startFinalExam(currentActiveIsland);
      };
    }

    openCelebrationModal();
  }


  // -------------------------------------------------------------------------
  // ANIMACIONES TEMÁTICAS PIRATAS: LORO PIRATA Y OLAS DEL MAR
  // -------------------------------------------------------------------------
  function getParrotAnimationHtml() {
    return `
      <div class="parrot-celebration-wrapper" id="parrot-celebration">
        <div class="parrot-speech-bubble">¡Lección conquistada!</div>
        <svg class="pirate-parrot-svg" viewBox="0 0 120 120">
          <!-- Perca de madera -->
          <rect x="25" y="100" width="70" height="8" rx="4" fill="#6B4423" stroke="#3D2314" stroke-width="1.5"/>
          
          <!-- Cola de plumas con degradé caribeño -->
          <g class="parrot-tail">
            <path d="M42 85 C35 105, 30 115, 25 120 C32 110, 42 100, 46 90 Z" fill="#07CEF5"/>
            <path d="M45 85 C40 102, 38 112, 32 118 C38 108, 46 98, 49 88 Z" fill="#2ECC71"/>
          </g>

          <!-- Cuerpo carmesí -->
          <ellipse cx="60" cy="72" rx="22" ry="26" fill="#E63946"/>
          <!-- Pecho dorado -->
          <path d="M56 60 Q 72 70 65 92 Q 52 82 56 60 Z" fill="#FFD166"/>

          <!-- Pata de marinero y garra -->
          <line x1="52" y1="95" x2="52" y2="102" stroke="#49321E" stroke-width="3" stroke-linecap="round"/>
          <path d="M68 95 L68 102 M65 102 L71 102" stroke="#E09F3E" stroke-width="2.5" stroke-linecap="round"/>

          <!-- Ala que aletea -->
          <g class="parrot-wing">
            <path d="M42 62 C35 68, 30 82, 42 90 C46 80, 52 70, 48 64 Z" fill="#1D3557"/>
            <path d="M44 65 C38 72, 35 84, 43 88 C46 80, 50 72, 47 66 Z" fill="#07CEF5"/>
            <path d="M46 68 C42 74, 40 82, 45 86 C48 80, 51 74, 48 70 Z" fill="#2ECC71"/>
          </g>

          <!-- Cabeza del loro pirata con tricornio y parche -->
          <g class="parrot-head">
            <circle cx="68" cy="42" r="16" fill="#E63946"/>
            <!-- Pico curvado -->
            <path d="M78 40 Q 94 44 88 54 Q 78 52 76 46 Z" fill="#FFB703" stroke="#B87700" stroke-width="1"/>
            <path d="M76 46 Q 84 49 80 53 Z" fill="#E59B00"/>

            <!-- Parche pirata -->
            <path d="M56 36 Q 66 42 78 40" stroke="#1D1E2C" stroke-width="1.8" fill="none"/>
            <ellipse cx="68" cy="40" rx="4" ry="4.5" fill="#1D1E2C"/>
            <circle cx="68" cy="40" r="1.5" fill="#FFFFFF" opacity="0.7"/>

            <!-- Sombrero pirata de capitán -->
            <path d="M50 32 C55 20, 80 20, 86 32 C78 28, 58 28, 50 32 Z" fill="#111827"/>
            <polygon points="46,32 90,32 68,16" fill="#1F2937"/>
            <circle cx="68" cy="24" r="2.2" fill="#FFFFFF"/>
            <line x1="65" y1="27" x2="71" y2="27" stroke="#FFFFFF" stroke-width="0.8"/>
          </g>
        </svg>
      </div>
    `;
  }

  function getOceanWavesAnimationHtml() {
    return `
      <div class="ocean-waves-celebration" id="ocean-waves-celebration">
        <!-- Barco pirata navegando sobre el oleaje -->
        <div class="floating-ship-wrap">
          <svg viewBox="0 0 60 40" width="56" height="38" class="ship-svg">
            <path d="M5 25 L12 35 L48 35 L55 25 Z" fill="#6B4423" stroke="#3D2314" stroke-width="1.5"/>
            <line x1="30" y1="6" x2="30" y2="25" stroke="#3D2314" stroke-width="2"/>
            <polygon points="30,8 50,16 30,22" fill="#FFFDF8" stroke="#D4A373" stroke-width="1"/>
            <polygon points="30,10 14,18 30,22" fill="#07CEF5" stroke="#05AECF" stroke-width="1"/>
            <polygon points="27,6 30,8 27,10" fill="#E63946"/>
          </svg>
        </div>
        
        <!-- Olas del mar animadas -->
        <svg class="ocean-waves-svg" viewBox="0 24 150 28" preserveAspectRatio="none">
          <defs>
            <path id="gentle-wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g class="parallax-waves">
            <use href="#gentle-wave-path" xlink:href="#gentle-wave-path" x="48" y="0" fill="rgba(7, 206, 245, 0.25)" />
            <use href="#gentle-wave-path" xlink:href="#gentle-wave-path" x="48" y="3" fill="rgba(7, 206, 245, 0.45)" />
            <use href="#gentle-wave-path" xlink:href="#gentle-wave-path" x="48" y="5" fill="rgba(30, 144, 255, 0.65)" />
            <use href="#gentle-wave-path" xlink:href="#gentle-wave-path" x="48" y="7" fill="rgba(7, 206, 245, 0.95)" />
          </g>
        </svg>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // 11. MODAL DE CELEBRACIÓN / TROFEOS
  // -------------------------------------------------------------------------
  function openCelebrationModal() {
    dom.modalCelebration.classList.add('active');
    dom.modalCelebration.setAttribute('aria-hidden', 'false');
  }

  function closeCelebrationModal() {
    dom.modalCelebration.classList.remove('active');
    dom.modalCelebration.setAttribute('aria-hidden', 'true');
    if (dom.modalIllustrationContainer) {
      dom.modalIllustrationContainer.innerHTML = '';
    }
    if (dom.modalSealIcon) {
      dom.modalSealIcon.innerHTML = '';
    }
  }

  // -------------------------------------------------------------------------
  // 12. CONFIGURACIÓN DE EVENT LISTENERS GLOBALES
  // -------------------------------------------------------------------------
  function setupEventListeners() {
    // Alternar tema claro y oscuro (switch del encabezado)
    dom.btnThemeToggle.addEventListener('click', toggleTheme);

    // Silenciar / Activar sonido
    dom.btnSoundToggle.addEventListener('click', () => {
      sound.enabled = !sound.enabled;
      renderSoundIcon();
      if (sound.enabled) sound.click();
    });

    // Engranaje (izquierda): abrir / cerrar panel de reiniciar progreso
    if (dom.btnSettings && dom.settingsPanel) {
      const closeSettings = () => {
        dom.settingsPanel.hidden = true;
        dom.btnSettings.setAttribute('aria-expanded', 'false');
      };

      dom.btnSettings.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.click();
        const willOpen = dom.settingsPanel.hidden;
        dom.settingsPanel.hidden = !willOpen;
        dom.btnSettings.setAttribute('aria-expanded', String(willOpen));
      });

      dom.settingsPanel.addEventListener('click', (e) => e.stopPropagation());
      document.addEventListener('click', closeSettings);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSettings();
      });
    }

    // Botón Home del header (si existe)
    if (dom.btnHomeNav) {
      dom.btnHomeNav.addEventListener('click', () => {
        sound.click();
        switchView('home');
      });
    }

    // Tarjetas de islas en el Home
    ['html', 'css', 'js'].forEach(islandKey => {
      const card = document.getElementById(`card-island-${islandKey}`);
      if (card) {
        card.addEventListener('click', () => {
          sound.click();
          currentActiveIsland = islandKey;
          switchView('island');
        });
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            sound.click();
            currentActiveIsland = islandKey;
            switchView('island');
          }
        });
      }
    });

    // Botón volver de la isla al Home
    dom.btnBackToHome.addEventListener('click', () => {
      sound.click();
      switchView('home');
    });

    // Botón Estudiar: abrir el targetero de fichas
    if (dom.btnOpenGlosario) {
      dom.btnOpenGlosario.addEventListener('click', () => {
        sound.click();
        switchView('glosario');
      });
    }

    // Volver del glosario al Mapa
    if (dom.btnBackGlosario) {
      dom.btnBackGlosario.addEventListener('click', () => {
        sound.click();
        switchView('home');
      });
    }

    // Buscador de fichas
    if (dom.glosarioSearchInput) {
      dom.glosarioSearchInput.addEventListener('input', (e) => {
        renderGlosario(e.target.value);
      });
    }

    // Navegación del slider: botones laterales
    if (dom.btnGlosarioPrev) {
      dom.btnGlosarioPrev.addEventListener('click', () => {
        sound.click();
        goToGlosarioCard(glosarioIndex - 1);
      });
    }

    if (dom.btnGlosarioNext) {
      dom.btnGlosarioNext.addEventListener('click', () => {
        sound.click();
        goToGlosarioCard(glosarioIndex + 1);
      });
    }

    // Navegación del slider: arrastrar con ratón o dedo
    if (dom.glosarioSlider && dom.glosarioTrack) {
      let dragging = false;
      let startX = 0;
      let deltaX = 0;

      dom.glosarioSlider.addEventListener('pointerdown', (e) => {
        if (!glosarioVisibleCards.length) return;
        dragging = true;
        startX = e.clientX;
        deltaX = 0;
        dom.glosarioSlider.classList.add('is-dragging');
        dom.glosarioTrack.style.transition = 'none';
        dom.glosarioSlider.setPointerCapture(e.pointerId);
      });

      dom.glosarioSlider.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        deltaX = e.clientX - startX;
        dom.glosarioTrack.style.transform =
          `translateX(calc(-${glosarioIndex * 100}% + ${deltaX}px))`;
      });

      const endDrag = () => {
        if (!dragging) return;
        dragging = false;
        dom.glosarioSlider.classList.remove('is-dragging');
        dom.glosarioTrack.style.transition = '';

        const threshold = dom.glosarioSlider.clientWidth * 0.18;
        if (deltaX <= -threshold) goToGlosarioCard(glosarioIndex + 1);
        else if (deltaX >= threshold) goToGlosarioCard(glosarioIndex - 1);
        else updateGlosarioSlider();
      };

      dom.glosarioSlider.addEventListener('pointerup', endDrag);
      dom.glosarioSlider.addEventListener('pointercancel', endDrag);
    }

    // Navegación del slider: flechas del teclado
    document.addEventListener('keydown', (e) => {
      if (!dom.viewGlosario || !dom.viewGlosario.classList.contains('active')) return;
      if (document.activeElement === dom.glosarioSearchInput) return;
      if (e.key === 'ArrowRight') goToGlosarioCard(glosarioIndex + 1);
      if (e.key === 'ArrowLeft') goToGlosarioCard(glosarioIndex - 1);
    });

    // Botón salir de la lección (X)
    dom.btnExitLesson.addEventListener('click', () => {
      sound.click();
      switchView('island');
    });

    // Botón terminar lección
    dom.btnFinishLesson.addEventListener('click', finishLesson);

    // Botón iniciar examen final de la isla
    dom.btnStartFinalExam.addEventListener('click', () => {
      sound.click();
      startFinalExam(currentActiveIsland);
    });

    // Botón salir del examen (X)
    dom.btnExitExam.addEventListener('click', () => {
      sound.click();
      switchView('island');
    });

    // Botón siguiente en el examen
    dom.btnExamNext.addEventListener('click', advanceExam);

    // Botón de reiniciar progreso (panel de ajustes)
    if (dom.btnResetData) {
      dom.btnResetData.addEventListener('click', () => {
        if (confirm('¿Reiniciar todo el progreso?')) {
          localStorage.removeItem(STORAGE_KEY);
          appState.completedLessons = { html: [], css: [], js: [] };
          appState.passedExams = { html: false, css: false, js: false };
          saveState(appState);
          renderHomeStats();
          renderIslandView(currentActiveIsland);
          sound.click();
        }
        if (dom.settingsPanel) {
          dom.settingsPanel.hidden = true;
          dom.btnSettings.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  // -------------------------------------------------------------------------
  // 13. INICIALIZACIÓN DE LA APLICACIÓN
  // -------------------------------------------------------------------------
  function init() {
    applyTheme(appState.theme || 'light');
    renderSoundIcon();
    setupEventListeners();
    renderHomeStats();
    switchView('home');
  }

  // Arrancar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
