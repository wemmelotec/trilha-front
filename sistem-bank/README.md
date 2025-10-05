# 🌟 **SistemBank**

![Angular](https://img.shields.io/badge/Angular-20.0.0-red?style=for-the-badge&logo=angular) ![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Welcome to **SistemBank**, a modern banking application built with Angular. This project is designed to help developers learn and implement CRUD operations while following best practices.

---

## 🚀 **Getting Started**

### 🛠️ **Development Server**
To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

---

## 📖 **Manual de Criação de um CRUD**

### 🛠️ **Passo a Passo**

#### 1. **Planejamento**
Antes de começar, defina:
- **Entidade:** Qual é o objeto principal do CRUD? (Ex.: Cliente, Conta, Produto)
- **Campos:** Quais propriedades a entidade terá? (Ex.: `id`, `nome`, `cpf`, etc.)
- **Regras de Negócio:** Validações e comportamentos específicos.

#### 2. **Criação do Modelo**
- **Local:** `src/app/shared/models/`
- **Arquivo:** Nomeie o arquivo como `nomeDaEntidadeModel.ts`.
- **Estrutura:**
  ```typescript
  export interface NomeDaEntidadeModel {
    id: number;
    nome: string;
    // ...outros campos
  }
  ```

#### 3. **Criação do Serviço**
- **Local:** `src/app/shared/services/nomeDaEntidade/`
- **Arquivo:** Nomeie o arquivo como `nomeDaEntidadeService.ts`.
- **Estrutura:**
  ```typescript
  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { NomeDaEntidadeModel } from '../../models/nomeDaEntidadeModel';
  import { environment } from '../../../../environments/environment';

  @Injectable({
    providedIn: 'root',
  })
  export class NomeDaEntidadeService {
    private apiUrl = `${environment.api}/nomeDaEntidade`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<NomeDaEntidadeModel[]> {
      return this.http.get<NomeDaEntidadeModel[]>(this.apiUrl);
    }

    getById(id: number): Observable<NomeDaEntidadeModel> {
      return this.http.get<NomeDaEntidadeModel>(`${this.apiUrl}/${id}`);
    }

    create(data: NomeDaEntidadeModel): Observable<NomeDaEntidadeModel> {
      return this.http.post<NomeDaEntidadeModel>(this.apiUrl, data);
    }

    update(id: number, data: NomeDaEntidadeModel): Observable<NomeDaEntidadeModel> {
      return this.http.put<NomeDaEntidadeModel>(`${this.apiUrl}/${id}`, data);
    }

    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  }
  ```

#### 4. **Criação dos Componentes**

##### a) **Listagem**
- **Local:** `src/app/pages/nomeDaEntidade/listagem-nomeDaEntidade/`
- **Arquivos:**
  - `listagem-nomeDaEntidade.ts`
  - `listagem-nomeDaEntidade.html`
  - `listagem-nomeDaEntidade.scss`
- **Estrutura:**
  - **HTML:** Use tabelas para desktop e cards para mobile.
  - **TypeScript:**
    - Importe o serviço.
    - Carregue os dados no `ngOnInit`.
    - Adicione métodos para editar e excluir.

##### b) **Cadastro/Edição**
- **Local:** `src/app/pages/nomeDaEntidade/cadastro-nomeDaEntidade/`
- **Arquivos:**
  - `cadastro-nomeDaEntidade.ts`
  - `cadastro-nomeDaEntidade.html`
  - `cadastro-nomeDaEntidade.scss`
- **Estrutura:**
  - **HTML:** Use `ReactiveFormsModule` para formulários.
  - **TypeScript:**
    - Importe o serviço.
    - Adicione validações e métodos para salvar e cancelar.

#### 5. **Configuração das Rotas**
- **Arquivo:** `src/app/app.routes.ts`
- **Adicione as rotas:**
  ```typescript
  { path: 'nomeDaEntidade', 
    children: [
      { path: '', component: ListagemNomeDaEntidade },
      { path: 'cadastro', component: CadastroNomeDaEntidade },
      { path: 'editar/:id', component: CadastroNomeDaEntidade }
    ]
  }
  ```

#### 6. **Atualização da Navbar**
- **Arquivo:** `src/app/shared/components/navbar/navbar.html`
- **Adicione o link:**
  ```html
  <li class="nav-item">
    <a class="nav-link" routerLink="/nomeDaEntidade" routerLinkActive="active">
      <mat-icon class="me-1">category</mat-icon>Nome da Entidade
    </a>
  </li>
  ```

---

## 🎨 **Estilo e Responsividade**
- **Use SCSS:** Adicione estilos específicos para desktop e mobile.
- **Estrutura recomendada:**
  ```scss
  @media (max-width: 768px) {
    // Estilos para mobile
  }

  @media (min-width: 769px) {
    // Estilos para desktop
  }
  ```

---

## 🧩 **Padrões e Boas Práticas**
- **Nomenclatura:** Use nomes descritivos e consistentes.
- **Componentização:** Reutilize componentes sempre que possível.
- **Responsividade:** Garanta que o layout funcione bem em todos os dispositivos.
- **Feedback ao Usuário:** Sempre informe o status das ações (ex.: sucesso, erro).
- **Documentação:** Atualize o `README.md` com instruções específicas, se necessário.

---

Com este manual, qualquer desenvolvedor poderá criar um CRUD seguindo os padrões do projeto **SistemBank**. 🚀

