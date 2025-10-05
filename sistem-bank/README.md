# SistemBank

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.0-rc.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Manual de criação do CRUD
🛠️ Passo a Passo
1. Planejamento
Antes de começar, defina:
Entidade: Qual é o objeto principal do CRUD? (Ex.: Cliente, Conta, Produto)
Campos: Quais propriedades a entidade terá? (Ex.: id, nome, cpf, etc.)
Regras de Negócio: Validações e comportamentos específicos.

2. Criação do Modelo
Local: models
Arquivo: Nomeie o arquivo como nomeDaEntidadeModel.ts.

3. Criação do Serviço
Local: src/app/shared/services/nomeDaEntidade/
Arquivo: Nomeie o arquivo como nomeDaEntidadeService.ts.
Estrutura:
CRUD básico: Métodos para getAll, getById, create, update, delete.

4. Criação dos Componentes
a) Listagem
Local: src/app/pages/nomeDaEntidade/listagem-nomeDaEntidade/
Arquivos:
listagem-nomeDaEntidade.ts
listagem-nomeDaEntidade.html
listagem-nomeDaEntidade.scss
Estrutura:
HTML: Use tabelas para desktop e cards para mobile.
TypeScript:
Importe o serviço.
Carregue os dados no ngOnInit.
Adicione métodos para editar e excluir.
b) Cadastro/Edição
Local: src/app/pages/nomeDaEntidade/cadastro-nomeDaEntidade/
Arquivos:
cadastro-nomeDaEntidade.ts
cadastro-nomeDaEntidade.html
cadastro-nomeDaEntidade.scss
Estrutura:
HTML: Use ReactiveFormsModule para formulários.
TypeScript:
Importe o serviço.
Adicione validações e métodos para salvar e cancelar.

5. Configuração das Rotas
Arquivo: app.routes.ts

