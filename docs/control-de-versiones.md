# Control de versiones

Cómo se ha usado Git en este proyecto: instalación y configuración, flujo de
trabajo, convención de mensajes y revisión del trabajo de un agente antes de
confirmarlo.

## Instalación y configuración usada

- **Git 2.53.0** (comprobar con `git --version`).

- Identidad configurada de forma global:

  ```bash
  git config --global user.name "RD"
  git config --global user.email "rd@example.com"
  ```

- El repositorio se creó con la rama principal `main`:

  ```bash
  git init -b main
  ```

- **No hay remoto configurado** (`git remote -v` no devuelve nada): todo el
  trabajo es local y las subidas al remoto están prohibidas tanto por
  `AGENTS.md` como por `opencode.json` (`git push` → `deny`).

## Flujo de trabajo

1. Un cambio = un tema = un commit. Nunca se mezclan en el mismo commit la
   documentación, las pruebas y la corrección de un fallo.
2. Antes de cada commit se revisa el diff (`git diff` para lo no preparado,
   `git diff --staged` para lo que se va a confirmar) y se ejecutan las
   pruebas (`npm test`) y/o los comandos documentados en el `README.md`.
3. Los mensajes se escriben en español siguiendo la convención de abajo.
4. Todo el trabajo se hace sobre `main`; el proyecto es pequeño y el historial
   lineal se lee mejor.
5. Para deshacer: `git restore <fichero>` descarta cambios sin confirmar;
   `git log --oneline` y `git show <commit>` permiten volver atrás con
   seguridad.
6. Las subidas al remoto (`git push`) están bloqueadas por configuración.

## Convención de mensajes

- En español, en imperativo y con prefijo según el tipo de cambio:
  - **«Añade …»** para contenido nuevo (documentación, pruebas, configuración).
  - **«Corrige …»** para arreglos.
- Excepción: el commit inicial conserva el nombre fijado por el enunciado de
  la práctica: **«Proyecto de partida»**.
- Ejemplos reales del historial:
  - `Añade documentación JSDoc a las funciones de src/tareas.js`
  - `Añade prueba de completar() con node:test`
  - `Corrige completar() para localizar la tarea por su id`

## Cómo revisar lo que hace un agente antes de confirmarlo

1. `git status` y `git diff`: ver exactamente qué ficheros toca y qué cambia.
2. `git diff --staged`: revisión final de lo que se va a confirmar.
3. Ejecutar la verificación real: `npm test` y los comandos del `README.md`.
   La evidencia es la salida de los comandos, no la respuesta del agente.
4. Comprobar que el mensaje de commit describe de verdad el cambio.
5. Apoyarse en los permisos de `opencode.json`: las órdenes del sistema piden
   permiso, `git push` y `rm` están denegados y la escritura solo se permite
   en `src/`, `test/` y `docs/` (más los ficheros de documentación de la
   raíz).
6. Consultar el historial: `git log --oneline --graph` y `git show <commit>`.

## Historial en el momento de escribir este documento

```bash
$ git log --oneline --graph
* 01b26aa Añade la sección de pruebas al README
* 1d51aea Corrige completar() para localizar la tarea por su id
* 852f7f8 Añade prueba de completar() con node:test
* 478b9c2 Corrige el README tras ejecutar todos los ejemplos
* 69a0ca5 Añade README con la documentación del proyecto (borrador)
* 47c1361 Añade documentación JSDoc a las funciones de src/tareas.js
* 0cb78f7 Añade fichero de bloqueo generado por npm
* c45bbf3 Añade configuración de permisos de OpenCode
* 80a9b5d Añade AGENTS.md con las normas del proyecto
* d1cb56e Añade versión de npm fijada con corepack
* 2839e46 Proyecto de partida
```
