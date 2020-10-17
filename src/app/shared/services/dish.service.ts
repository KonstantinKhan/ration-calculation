import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Dish} from '../interfaces';
import {environment} from '../../../environments/environment';
import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})
export class DishService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  getSearchDish(name: string): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${environment.dbUrl}/dishes/search/` + name + '.json');
  }

  getAllDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${environment.dbUrl}/dishes/all.json`, {headers: this.auth.getHeaderAuth()});
  }

  saveDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(`${environment.dbUrl}/dish/save.json`, dish, {
      headers: this.auth.getHeaderAuth()
    });
  }
}
