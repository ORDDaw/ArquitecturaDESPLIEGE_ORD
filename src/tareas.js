/**
 * @file Gestión de tareas: lectura y escritura del almacén JSON y
 * operaciones básicas (crear, completar, eliminar, listar y resumir).
 */

const fs = require('fs');
const path = require('path');

/**
 * Ruta absoluta del fichero JSON donde se persisten las tareas.
 * @constant {string}
 */
const FICHERO = path.join(__dirname, '..', 'datos', 'tareas.json');

/**
 * Lee todas las tareas almacenadas.
 *
 * Si el fichero todavía no existe, devuelve un array vacío.
 *
 * @returns {Array<{id: number, texto: string, prioridad: number, hecha: boolean}>}
 *   Lista completa de tareas tal y como están guardadas.
 * @throws {SyntaxError} Si el fichero existe pero su contenido no es JSON válido.
 * @example
 * const tareas = leer();
 * console.log(`Hay ${tareas.length} tareas`);
 */
function leer() {
  if (!fs.existsSync(FICHERO)) return [];
  return JSON.parse(fs.readFileSync(FICHERO, 'utf8'));
}

/**
 * Guarda la lista completa de tareas, sustituyendo el contenido anterior.
 *
 * Crea la carpeta del fichero si no existiera.
 *
 * @param {Array<{id: number, texto: string, prioridad: number, hecha: boolean}>} tareas
 *   Lista completa de tareas que se quiere persistir.
 * @returns {void}
 * @throws {Error} Si no se puede escribir el fichero (por ejemplo, por permisos).
 * @example
 * guardar([{ id: 1, texto: 'Comprar pan', prioridad: 2, hecha: false }]);
 */
function guardar(tareas) {
  fs.mkdirSync(path.dirname(FICHERO), { recursive: true });
  fs.writeFileSync(FICHERO, JSON.stringify(tareas, null, 2));
}

/**
 * Añade una tarea nueva con un identificador consecutivo.
 *
 * El identificador asignado es el mayor de los existentes más uno
 * (la primera tarea recibe el id 1).
 *
 * @param {string} texto Descripción de la tarea.
 * @param {number} [prioridad=2] Prioridad de la tarea; 1 es la más alta.
 * @returns {number} Identificador asignado a la tarea creada.
 * @throws {Error} Si no se puede escribir el fichero de datos.
 * @example
 * const id = anadir('Escribir el README');
 * console.log(id); // 4
 */
function anadir(texto, prioridad = 2) {
  const tareas = leer();
  const id = tareas.length ? Math.max(...tareas.map((t) => t.id)) + 1 : 1;
  tareas.push({ id, texto, prioridad, hecha: false });
  guardar(tareas);
  return id;
}

/**
 * Marca como hecha la tarea indicada.
 *
 * @param {number} id Identificador de la tarea que se quiere completar.
 * @returns {{id: number, texto: string, prioridad: number, hecha: boolean}}
 *   La tarea actualizada.
 * @throws {Error} Si no existe ninguna tarea con el id indicado.
 * @example
 * completar(1); // la tarea con id 1 pasa a estar hecha
 */
function completar(id) {
  const tareas = leer();
  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) throw new Error(`No existe ninguna tarea con el id ${id}`);
  tarea.hecha = true;
  guardar(tareas);
  return tarea;
}

/**
 * Elimina la tarea indicada.
 *
 * @param {number} id Identificador de la tarea que se quiere borrar.
 * @returns {number} Número de tareas que quedan tras el borrado.
 * @throws {Error} Si no se puede escribir el fichero de datos.
 * @example
 * const quedan = eliminar(2);
 * console.log(quedan); // 2
 */
function eliminar(id) {
  const tareas = leer().filter((t) => t.id !== id);
  guardar(tareas);
  return tareas.length;
}

/**
 * Devuelve las tareas pendientes ordenadas por prioridad.
 *
 * La tarea con prioridad 1 aparece primero.
 *
 * @returns {Array<{id: number, texto: string, prioridad: number, hecha: boolean}>}
 *   Tareas con `hecha === false`, de menor a mayor prioridad.
 * @throws {SyntaxError} Si el fichero de datos no es JSON válido.
 * @example
 * pendientes().forEach((t) => console.log(t.texto));
 */
function pendientes() {
  return leer()
    .filter((t) => !t.hecha)
    .sort((a, b) => a.prioridad - b.prioridad);
}

/**
 * Calcula un resumen del estado de las tareas.
 *
 * @returns {{total: number, hechas: number, pendientes: number}}
 *   Objeto con el número total de tareas, las ya completadas y las pendientes.
 * @throws {SyntaxError} Si el fichero de datos no es JSON válido.
 * @example
 * resumen(); // { total: 3, hechas: 0, pendientes: 3 }
 */
function resumen() {
  const tareas = leer();
  const hechas = tareas.filter((t) => t.hecha).length;
  return { total: tareas.length, hechas, pendientes: tareas.length - hechas };
}

module.exports = { anadir, completar, eliminar, pendientes, resumen, leer };
