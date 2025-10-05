Configuração inicial do ambiente local:
- Baixar e instalar o NodeJS
- - Verificar se o Node foi instalado (node -v)
- Instalar o angular CLI (npm install -g @angular/cli)
- - Verificar a o angular cli foi instalado (ng version)

Criar um novo projeto:
- ng new nome_do_projeto
- utilizei o Sass - SCSS pelo compatilibildade com o CSS - https://sass-lang.com/
- Instalar o angular material para padronização de templates
- - ng add @angular/material
- Instalar o Sweetalert2 para exibir modais de alerta
- - npm install sweetalert2
- Instalar o bootstrap para ter responsividade
- - npm install bootstrap jquery@3.3.1 popper.js@1.14.3 --save
- - vá no angular.json e configure o styles e os scripts
"styles": [
"node_modules/bootstrap/dist/css/bootstrap.css",
"@angular/material/prebuilt-themes/azure-blue.css",
"src/styles.scss"
],
"scripts": [
"node_modules/jquery/dist/jquery.js",
"node_modules/popper.js/dist/umd/popper.js",
"node_modules/bootstrap/dist/js/bootstrap.js"
],
- - Vá em style.scss e import o bootstrap.
@import "~bootstrap/dist/css/bootstrap.css";
