import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ration, RationProduct} from '../interfaces';
import {environment} from '../../../environments/environment';
import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})
export class RationServices {

  constructor(
    private http: HttpClient,
    private auth: AuthService) {
  }

  getRation(date: string): Observable<Ration> {
    return this.http.get<Ration>(`${environment.dbUrl}/ration/` + date + '.json', {
      headers: this.auth.getHeaderAuth()
    });
  }

  addProduct(date: string, rationProduct: RationProduct): Observable<Ration> {
    return this.http.post<Ration>(`${environment.dbUrl}/add_product/ration/` + date + `.json`, rationProduct, {
      headers: this.auth.getHeaderAuth()
    });
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
