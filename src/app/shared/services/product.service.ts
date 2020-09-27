import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Product} from '../interfaces';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})
export class ProductService {
  constructor(
    private http: HttpClient,
    private auth: AuthService) {
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.dbUrl}/products/all.json`);
  }

  getSearchProducts(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.dbUrl}/products/search/` + name + '.json',
      {
        headers: this.auth.getHeaderAuth()
      });
  }
}
