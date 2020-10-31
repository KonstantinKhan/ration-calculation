import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ration, RationDish, RationProduct} from '../interfaces';
import {environment} from '../../../environments/environment';
import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})
export class RationServices {

  constructor(
    private http: HttpClient,
    private auth: AuthService) {
  }

  getRation(date: string): Observable<Ration> {
    return this.http.get<Ration>(`${environment.dbUrl}/ration/` + date + '.json',
      {
        headers: this.auth.getHeaderAuth()
      });
  }

  addProduct(date: string, rationProduct: RationProduct): Observable<Ration> {
    return this.http.post<Ration>(`${environment.dbUrl}/add_product/ration/` + date + `.json`, rationProduct, {
      headers: this.auth.getHeaderAuth()
    });
  }

  addDish(date: string, rationDish: RationDish): Observable<Ration> {
    return this.http.post<Ration>(`${environment.dbUrl}/add_dish/ration/` + date + `.json`, rationDish, {
      headers: this.auth.getHeaderAuth()
    });
  }

  updateRationByProduct(date: string, rationProduct: RationProduct): Observable<Ration> {
    return this.http.patch<Ration>(`${environment.dbUrl}/update/ration_product/` + date + `.json`, rationProduct,
      {headers: this.auth.getHeaderAuth()});
  }

  updateRationByDish(date: string, rationDish: RationDish): Observable<Ration> {
    return this.http.patch<Ration>(`${environment.dbUrl}/update/ration_dish/` + date + `.json`, rationDish,
      {headers: this.auth.getHeaderAuth()});
  }

  deleteProduct(date: string, id: number): Observable<Ration> {
    return this.http.patch<Ration>(`${environment.dbUrl}/delete_product/ration/` + date + `.json`,
      id, {headers: this.auth.getHeaderAuth()});
  }

  deleteDish(date: string, id: number): Observable<Ration> {
    return this.http.patch<Ration>(`${environment.dbUrl}/delete_dish/ration/` + date + `.json`,
      id, {headers: this.auth.getHeaderAuth()});
  }

  clearRation(date: string): Observable<Ration> {
    return this.http.patch<Ration>(`${environment.dbUrl}/clear_ration/` + date + `.json`, null);
  }
}
