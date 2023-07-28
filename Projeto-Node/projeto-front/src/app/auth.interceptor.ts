import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Verificar se há um token no localStorage
    const token = localStorage.getItem('token');

    // Adicionar o token ao cabeçalho da requisição
    if (token) {
      request = request.clone({
        setHeaders: {
          'x-access-token': token
        }
      });
    }

    // Continuar com a requisição
    return next.handle(request);
  }
}