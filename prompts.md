# Registro de prompts

Registro de los prompts importantes usados durante la práctica, mantenido a
lo largo de su realización (una fila por prompt relevante).

| Nº | Prompt (resumido) | Qué hizo el agente | Qué corregí yo |
| -- | ----------------- | ------------------ | -------------- |
| 1 | «Explica qué hace este proyecto, qué ficheros lo componen y cómo se ejecuta» (modo Plan) | Resumen correcto: describió los 4 ficheros, las órdenes de la CLI y advirtió del fallo de `completar`. | Nada; comprobé con `ls -R`, `node --version` y ejecutando la CLI que todo lo citado existe de verdad. |
| 2 | «Genera el fichero AGENTS.md del proyecto» (equivalente a `/init`) | Borrador completo con descripción, estructura, comandos y normas. | **Se inventó una carpeta `test/`** que no existía (comprobado con `ls`) y la eliminé del documento. |
| 3 | «Configura opencode.json: pide permiso para las órdenes del sistema, prohíbe `git push` y `rm`, bloquea `.env`, limita la escritura a `src/`, `test/` y `docs/`, e impide compartir la sesión» | Escribió la configuración en formato V2 (`permissions` ordenadas, `share: "disabled"`). Verificado: `git push` y una escritura a `notas.txt` quedaron denegados. | Añadí excepciones explícitas para los ficheros de la raíz que exige la propia práctica (`README.md`, `AGENTS.md`, `prompts.md`, `opencode.json`). |
| 4 | «Documenta con JSDoc las seis funciones de `src/tareas.js` con `@param`, `@returns`, `@throws` y un `@example`» | Añadió JSDoc completo a las seis funciones exportadas (y a `guardar`, interna). | **`resumen()` estaba mal documentada** (decía que devolvía un número y devuelve un objeto): la corregí. También anoté que la descripción de `completar()` no coincidía con el código (id ≠ índice), pendiente para el ejercicio 6. |
| 5 | «Escribe el README del proyecto con todas las secciones pedidas, con un ejemplo por cada orden de la CLI» | README completo y bien estructurado. | Ejecuté **todos** los comandos: **dos salidas mal documentadas** de `anadir` y `eliminar`, y un atajo inexistente (`npm run listar`) que eliminé. La discrepancia de `completar` no era de documentación: era el fallo del código. |
| 6 | «El proyecto tiene un fallo: `node src/cli.js completar 1` no marca la tarea que debería; escribe en `test/` una prueba con `node:test` que lo demuestre» (sin decir la causa) | Prueba con `beforeEach`/`afterEach` que protege los datos reales; `npm test` falló mostrando el `AssertionError`. | Nada; revisé que la prueba comprueba lo que dice y no toca los datos. |
| 7 | «Corrige `src/tareas.js` para que la prueba pase» | Localizó la tarea con `find` por `id` y lanza un error claro si no existe; `npm test` en verde. | Nada; revisé el diff (`@throws` actualizado incluido). |
| 8 | «Prepara los cambios en commits separados (documentación, pruebas y corrección)» | Tres commits en español siguiendo la convención «Añade…/Corrige…». | Revisé `git diff --staged` antes de cada commit. |
| 9 | «Crea `docs/control-de-versiones.md` con la instalación y configuración de Git, el flujo de trabajo, la convención de mensajes y cómo revisar el trabajo de un agente» | Documento completo y verificado con `git log --oneline --graph`. | Nada. |
| 10 | «Convierte el README a HTML y PDF y añade una tabla comparativa de los tres formatos» | Script de conversión reproducible, HTML y PDF generados, tabla añadida al README. | Nada; verifiqué el PDF visualmente (páginas, estilos y tabla). |

## Balance (ejercicio 9)

**¿Cuántas correcciones tuve que hacerle?**
Seis correcciones relevantes: una carpeta `test/` inventada en `AGENTS.md`;
una descripción JSDoc incorrecta (`resumen()`); dos salidas mal documentadas en
el README (`anadir` y `eliminar`); un comando inexistente (`npm run listar`) y
la detección del fallo de `completar()` (esta última no era de documentación,
sino del propio código).

**¿Qué parte me ahorró tiempo de verdad?**
Pasar del folio en blanco a un borrador revisable: `AGENTS.md`, el JSDoc de las
seis funciones, el README completo y la guía de control de versiones salieron
de una vez y solo hubo que validar y corregir detalles. También el trabajo
mecánico: la prueba inicial, los mensajes de commit, el script de conversión
Markdown → HTML → PDF y el informe final.

**¿Qué habría entregado mal si no lo hubiera comprobado?**
Una carpeta que no existe en `AGENTS.md`; una descripción falsa en el JSDoc de
`resumen()`; un README con salidas que no coinciden con la realidad y un atajo
que no funciona; y, lo más importante, habría dado por bueno un `completar()`
que marca la tarea equivocada, porque el código «parecía» correcto hasta
ejecutar la prueba. Sin la verificación (ejecutar, comparar salidas y revisar
diffs) la entrega sería incorrecta aunque lo pareciera.
