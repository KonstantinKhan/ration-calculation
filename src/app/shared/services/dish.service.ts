import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Dish, DishTemplate, Ration, RationDish} from '../interfaces';
import {environment} from '../../../environments/environment';
import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})
export class DishService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  getSearchDish(name: string): Observable<DishTemplate[]> {
    return this.http.get<DishTemplate[]>(`${environment.dbUrl}/dish_template/search/` + name + '.json',
      {headers: this.auth.getHeaderAuth()});
  }

  getAllDishes(): Observable<DishTemplate[]> {
    // return this.http.get<Dish[]>(`${environment.dbUrl}/dishes/all.json`, {headers: this.auth.getHeaderAuth()});
    return this.http.get<DishTemplate[]>(`${environment.dbUrl}/dish_template/all.json`, {headers: this.auth.getHeaderAuth()});
  }

  saveDishTemplate(dish: DishTemplate): Observable<DishTemplate> {
    return this.http.post<DishTemplate>(`${environment.dbUrl}/dish_template/save.json`, dish, {
      headers: this.auth.getHeaderAuth()
    });
  }

  saveDish(date: string, rationDish: RationDish): Observable<Ration> {
    return this.http.patch<Ration>(`${environment.dbUrl}/dish/save/` + date + `.json`, rationDish, {
      headers: this.auth.getHeaderAuth()
    });
  }
}
