import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; //

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/login';
  
  constructor(private http: HttpClient) { }
  
  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, senha }).pipe(
      tap((response) => {
        // Armazenar o token no localStorage após a autenticação bem-sucedida
        localStorage.setItem('token', response.token);
      })
    );
  }

 /*  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, senha });
  } */

  /* login(usuario: string, senha: string): boolean {
    if (usuario === 'admin' && senha === '1234') {
      localStorage.setItem('autenticado', 'sim');
      return true;
    }
    else {
      return false;
    }
  } */

  logoff(): void {
    localStorage.clear();
  }

  estaAutenticado(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    else {
      return false;
    }
  }
}
