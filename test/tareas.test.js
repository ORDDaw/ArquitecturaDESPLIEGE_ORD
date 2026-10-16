/**
 * @file Pruebas de `src/tareas.js` con el runner integrado de Node
 * (`node:test`). Se ejecutan con `npm test`.
 */

const { test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const tareas = require('../src/tareas');

const FICHERO = path.join(__dirname, '..', 'datos', 'tareas.json');

// Copia de seguridad del fichero de datos para restaurarlo tras cada prueba.
let copia;

beforeEach(() => {
  copia = fs.readFileSync(FICHERO, 'utf8');
});

afterEach(() => {
  fs.writeFileSync(FICHERO, copia);
});

test('completar(1) marca como hecha la tarea con id 1 (y solo esa)', () => {
  tareas.completar(1);

  const despues = tareas.leer();
  const tarea1 = despues.find((t) => t.id === 1);
  const tarea2 = despues.find((t) => t.id === 2);
  const tarea3 = despues.find((t) => t.id === 3);

  assert.equal(tarea1.hecha, true, 'la tarea con id 1 debería estar hecha');
  assert.equal(tarea2.hecha, false, 'la tarea con id 2 no debería tocarse');
  assert.equal(tarea3.hecha, false, 'la tarea con id 3 no debería tocarse');
});
