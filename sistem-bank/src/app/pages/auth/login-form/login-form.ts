import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm {

  // Inicializa para evitar "Cannot read properties of undefined"
  loginData: { email: string; password: string } = { email: '', password: '' };
  errorMessage: string = '';

  onLogin() {
    // exemplo simples de validação mock
    if (this.loginData.email === 'admin@sistembank.com' && this.loginData.password === '123456') {
      this.errorMessage = '';
      // redirecionamento / estado de login aqui
    } else {
      this.errorMessage = 'Email ou senha incorretos.';
    }
  }
}
