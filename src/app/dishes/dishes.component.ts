import {Component, OnInit} from '@angular/core';
import {DishService} from '../shared/services/dish.service';
import {Dish} from '../shared/interfaces';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {

  dishes: Dish[];

  constructor(
    private dishService: DishService
  ) {
  }

  ngOnInit(): void {
    this.dishService.getAllDishes().subscribe((dishes: Dish[]) => {
      this.dishes = dishes;
    });
  }

}
