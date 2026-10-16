#!/usr/bin/env bash
# Convierte README.md a HTML (docs/README.html) y a PDF (docs/README.pdf).
#
# Uso (desde la raíz del proyecto):
#     bash docs/convertir-readme.sh
#
# Herramientas usadas:
#   - markdown-it-py  -> Markdown a HTML (docs/md-a-html.py)
#   - LibreOffice     -> HTML a PDF (soffice --headless)

set -euo pipefail

RAIZ="$(cd "$(dirname "$0")/.." && pwd)"

python3 "$RAIZ/docs/md-a-html.py" "$RAIZ/README.md" "$RAIZ/docs/README.html"
soffice --headless --convert-to pdf --outdir "$RAIZ/docs" "$RAIZ/docs/README.html"
echo "Conversión completada: docs/README.html y docs/README.pdf"
