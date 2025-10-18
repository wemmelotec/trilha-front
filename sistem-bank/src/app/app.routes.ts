import { ListagemConta } from './pages/conta/listagem-conta/listagem-conta';
import { Routes } from '@angular/router';
import { CadastroCliente } from './pages/cliente/cadastro-cliente/cadastro-cliente';
import { ListagemCliente } from './pages/cliente/listagem-cliente/listagem-cliente';
import { LoginTemplate } from './pages/auth/login-template/login-template';
import { CadastroConta } from './pages/conta/cadastro-conta/cadastro-conta';
import { Home } from './pages/home/home';
import { Deposito } from './pages/conta/components/deposito/deposito';
import { SaqueComponent } from './pages/conta/components/saque/saque';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'cliente',
    children: [
      { path: 'cadastro', component: CadastroCliente },
      { path: 'editar/:id', component: CadastroCliente },
      { path: '', component: ListagemCliente },
    ]
  },
  { path: 'conta',
    children: [
      { path: 'cadastro', component: CadastroConta },
      { path: 'editar/:id', component: CadastroConta },
      { path: 'deposito', component: Deposito },
      { path: 'saque', component: SaqueComponent },
      { path: '', component: ListagemConta }
    ]
  },
  { path: 'auth', component: LoginTemplate },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
