import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUsersList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addUser(newUser: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newUser);
  }

  editUser(userId: number, updatedUser: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put<any>(url, updatedUser);
  }

  deleteUser(codigo: number): Observable<any> {
    const url = `${this.apiUrl}/${codigo}`;
    return this.http.delete<any>(url);
  }
}
