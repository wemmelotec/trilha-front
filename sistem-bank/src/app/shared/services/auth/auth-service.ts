import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AuthModel } from '../../models/authModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.api}/token/`;

  constructor(private http: HttpClient) { }

  login(authModel: AuthModel) {
    return this.http.post(this.apiUrl, authModel);
  }

  refreshToken(refresh: string) {
    return this.http.post(`${this.apiUrl}refresh/`, { refresh });
  }


}
