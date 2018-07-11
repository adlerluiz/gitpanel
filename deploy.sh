#!/bin/bash

echo "============= Deploy Iniciado ============="
echo
echo "============= Git Pull ============="
git pull origin master

echo
echo "Feito"

echo "============= Angular Build Prod ============="
ng build --prod --base-href ./

echo
echo "Feito"

echo "============= Copiando .htaccess para /dist ============="
cp oauth.php dist/gitpanel/oauth.php

echo
echo "Feito"

echo "============= Deploy Finalizado ============="
