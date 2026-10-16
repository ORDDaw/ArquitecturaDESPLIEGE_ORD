#!/usr/bin/env python3
"""Convierte un fichero Markdown en un HTML completo con estilos.

Uso:
    python3 md-a-html.py ENTRADA.md SALIDA.html

Requiere el paquete `markdown-it-py` (proporciona el comando `markdown-it`).
"""

import sys
from pathlib import Path

from markdown_it import MarkdownIt

PLANTILLA = """<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{titulo}</title>
<style>
  body {
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
    line-height: 1.55;
    max-width: 48rem;
    margin: 2rem auto;
    padding: 0 1rem;
    color: #1f2328;
  }
  h1, h2, h3 { line-height: 1.25; }
  code, pre {
    font-family: ui-monospace, "Cascadia Mono", "DejaVu Sans Mono", monospace;
    background: #f6f8fa;
    border-radius: 6px;
  }
  code { padding: 0.1rem 0.3rem; font-size: 0.9em; }
  pre { padding: 0.8rem; overflow-x: auto; }
  pre code { padding: 0; background: none; }
  table { border-collapse: collapse; margin: 1rem 0; }
  th, td { border: 1px solid #d0d7de; padding: 0.4rem 0.7rem; }
  th { background: #f6f8fa; }
  blockquote {
    margin-left: 0;
    padding-left: 1rem;
    border-left: 4px solid #d0d7de;
    color: #57606a;
  }
</style>
</head>
<body>
{cuerpo}
</body>
</html>
"""


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__, file=sys.stderr)
        return 1

    entrada = Path(sys.argv[1])
    salida = Path(sys.argv[2])

    texto = entrada.read_text(encoding="utf-8")
    cuerpo = MarkdownIt("js-default").render(texto)

    html = (
        PLANTILLA
        .replace("{titulo}", entrada.stem)
        .replace("{cuerpo}", cuerpo)
    )
    salida.write_text(html, encoding="utf-8")
    print(f"Generado {salida}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
