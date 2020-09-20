import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Product} from '../interfaces';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.dbUrl}/products/all.json`);
  }

  getSearchProducts(name: string): Observable<Product[]> {
    const myHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Product[]>(`${environment.dbUrl}/products/search/` + name + '.json', {
      headers: myHeaders
    });
  }
}
