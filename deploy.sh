#!/bin/sh

rsync -avz -e -nrv --exclude="/api/www/config/database.php" --exclude="/api/www/config/config.php" "ssh" ~/build/ transeun@transeunte.org:/public_html/itdp.mx/emus/