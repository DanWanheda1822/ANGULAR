import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private login = "http://localhost:4142/api/v1/users/login";
  private createUser = "http://localhost:4142/api/v1/users/register";

  constructor(private http: HttpClient) { }


  signIn(username: string, password: string): Observable<Response> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post<Response>(this.login, null, { params });
  }
}
