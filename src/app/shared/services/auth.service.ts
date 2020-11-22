import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthResponse, User} from '../interfaces';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('expires'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('token');
  }

  // Метод для регистрации пользователя.
  registration(user: User): Observable<any> {
    return this.http.post(`${environment.dbUrl}/registration.json`, user);
  }

  // Метод для входа пользователя.
  login(user: User): Observable<any> {
    console.log('login');
    return this.http.post(`${environment.dbUrl}/auth.json`, user)
      .pipe(
        tap(this.setToken)
      );
  }

  logout(): void {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: AuthResponse | null): void {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('token', response.idToken);
      localStorage.setItem('expires', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  getHeaderAuth(): HttpHeaders {
    const myHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return myHeaders;
  }

  // Метод для проверки авторизации пользователя.
  isAuth(): boolean {
    const currentDate = new Date();
    const expiresDate = new Date(localStorage.getItem('expires'));
    if ((currentDate.getTime() - expiresDate.getTime()) > 0) {
      return false;
    } else {
      return true;
    }
  }
}
