import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/components/navbar/navbar";
import { LoginTemplate } from "./pages/auth/login-template/login-template";
import { CadastroCliente } from "./pages/cliente/cadastro-cliente/cadastro-cliente";
import { ListagemCliente } from "./pages/cliente/listagem-cliente/listagem-cliente";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginTemplate, CadastroCliente, ListagemCliente],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  public title = 'sistem-bank';

  count = signal(0);

  increment() {
    this.count.update((value) => value + 1);
  }
}
