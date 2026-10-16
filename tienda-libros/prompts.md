# Registro de prompts

Registro de los prompts importantes usados durante la Práctica 2 (una fila por prompt relevante), mantenido mientras se hacían los ejercicios de `docs/arquitectura.md`.

| Nº | Prompt (resumido) | Qué hizo el agente | Qué corregí yo |
| --- | --- | --- | --- |
| 1 | «Resume qué hace esta aplicación y qué ficheros la componen» (modo Plan, solo lectura) | Resumen correcto de los 5 servicios, pero se inventó una carpeta `tests/` y un «frontend React» | `find . -type f` y `ls -a`: no hay `tests/` ni React; `web/index.html` es HTML plano. Corregí el resumen |
| 2 | «Modifica docker-compose.yml para añadir un servicio de métricas» | No pudo: opencode bloqueó la edición (`edit: deny`, captura en el ejercicio 1) | Nada; era justo lo que se pedía comprobar |
| 3 | «Saca la tabla de inventario de servicios» (puertos, volúmenes, dependencias) | Tabla casi correcta, pero decía que el worker también escribe en PostgreSQL | `grep DATABASE_URL/REDIS_URL` en el compose: la BD solo la usa la api; el worker solo habla con Redis. Corregí esa fila |
| 4 | «Clasifica los recursos del proyecto y propón un .gitignore» | Clasificación correcta; proponía ignorar `web/` y `db/init.sql` | Corregí: el estático y el esquema van al repo; fuera solo `.env`, `node_modules`, logs y volcados. Creé el `.gitignore` |
| 5 | «Dibuja en Mermaid el recorrido de GET /api/libros con la caché» | Bien en general, pero ponía la caché en nginx y TTL de 5 minutos | `cat -n api/src/server.js`: la caché es Redis con `EX: 60` (líneas 15-18). Corregí el diagrama |
| 6 | «Dibuja el recorrido de POST /api/pedidos con la cola y el worker» | Lo pintó síncrono: decía que el 201 se devolvía después de generar la factura | server.js:29-30: la API encola y responde 201; el worker consume con `BRPOP` (worker.js:9). Corregí el orden |
| 7 | «¿Qué modelo de arquitectura sigue la aplicación y por qué?» | «Microservicios con una base de datos por servicio, comunicación REST y Kubernetes» | No hay Kubernetes, ni REST entre servicios, ni BD por servicio; evidencia: compose (5 servicios, 1 compose, 1 BD) y `LPUSH`/`BRPOP`. Reescribí con el contraste |
| 8 | «Redacta la ficha de implantación distinguiendo lo que ya trae de lo que falta» | Ficha completa, pero daba por hechas copias de seguridad y healthchecks de la API que no existen | `grep healthcheck/backup`: solo hay healthcheck en la BD y ninguna copia. Pasé esas filas a «hay que añadir» |
| 9 | (Reto) «explícame la arquitectura» frente a prompt preciso citando `@docker-compose.yml` y `@api/src/server.js` | El vago: respuesta genérica con cosas que no están (Kubernetes, microservicios); el preciso: ajustada al compose y al código | Me quedé con la respuesta del prompt preciso y anoté las diferencias (reto) |
