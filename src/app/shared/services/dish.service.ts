import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Dish} from '../interfaces';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class DishService {

  constructor(private http: HttpClient) {
  }

  getSearchDish(name: string): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${environment.dbUrl}/dishes/search/` + name + '.json');
  }

  getAllDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${environment.dbUrl}/dishes/all.json`);
  }
}
