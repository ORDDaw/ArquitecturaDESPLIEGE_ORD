# AGENTS.md

Guía para agentes de IA que trabajen en este repositorio.

## Descripción del proyecto

`gestor-tareas` es una aplicación de consola escrita en JavaScript
(CommonJS) para gestionar tareas. No tiene dependencias externas y guarda
los datos en `datos/tareas.json`.

## Estructura

- `src/cli.js`: interfaz de línea de comandos; interpreta `process.argv`
  y despacha las órdenes `anadir`, `completar`, `eliminar`, `listar` y `resumen`.
- `src/tareas.js`: lógica de negocio y persistencia sobre el fichero JSON.
- `datos/tareas.json`: almacén de datos (array de tareas).

(No hay más carpetas: el proyecto todavía no incluye pruebas.)

## Comandos

- Ejecutar la aplicación: `node src/cli.js <orden>` o `npm start -- <orden>`.
- Ejecutar las pruebas: `npm test` (runner integrado `node:test`). Cuando se
  añadan, las pruebas vivirán en `test/`.

## Normas del proyecto

1. La documentación y los mensajes de commit se escriben en español.
2. Documentar con JSDoc todas las funciones de `src/`.
3. Mensajes de commit con el formato «Añade…» o «Corrige…».
4. Prohibido subir cambios al repositorio remoto (`git push`).
