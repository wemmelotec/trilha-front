import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthModel } from '../../../shared/models/authModel';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.api}/token/`;

  constructor(private http: HttpClient, private router: Router) { }

  login(data: AuthModel) {
    return this.http.post(this.apiUrl, data).subscribe(
      {
        next: (response) => {
          localStorage.setItem('access_token', (response as any).access);
          localStorage.setItem('refresh_token', (response as any).refresh);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Login error', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuário e/ou senha inválidos!',
          });
        }
      }
    );
  }

  refreshToken(refresh: string) {
    return this.http.post(`${this.apiUrl}refresh/`, { refresh });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/auth']);
  }

}
