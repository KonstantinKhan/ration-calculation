import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ration, RationProduct} from '../interfaces';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class RationServices {

  constructor(private http: HttpClient) {
  }

  getRation(date: string): Observable<Ration> {
    const myHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Ration>(`${environment.dbUrl}/ration/` + date + '.json', {
      headers: myHeaders
    });
  }

  addProduct(date: string, rationProduct: RationProduct): Observable<Ration> {
    return this.http.post<Ration>(`${environment.dbUrl}/add_product/ration/` + date + `.json`, rationProduct);
  }

  updateRation(date: string, rationProduct: RationProduct): Observable<Ration> {
    return this.http.patch<Ration>(`${environment.dbUrl}/update/ration/` + date + `.json`, rationProduct);
  }

  deleteProduct(date: string, id: number): Observable<Ration> {
    return this.http.patch<Ration>(`${environment.dbUrl}/delete_product/ration/` + date + `.json`, id);
  }

  clearRation(date: string): Observable<Ration> {
    return this.http.patch<Ration>(`${environment.dbUrl}/clear_ration/` + date + `.json`, null);
  }
}
