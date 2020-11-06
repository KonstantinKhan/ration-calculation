import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {DishService} from '../shared/services/dish.service';
import {Dish, DishTemplate} from '../shared/interfaces';
import {AddDishComponent} from '../add-dish/add-dish.component';
import {RefDirective} from '../ref.directive';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {

  dishes: DishTemplate[];

  modalFactory = this.resolver.resolveComponentFactory(AddDishComponent);

  @ViewChild(RefDirective) refDir: RefDirective;

  constructor(
    private dishService: DishService,
    private resolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit(): void {
    this.dishService.getAllDishes().subscribe((dishes: DishTemplate[]) => {
      this.dishes = dishes;
    });
  }

  showNewDish(): void {
    const component = this.refDir.containerRef.createComponent(this.modalFactory);

    component.instance.closeEmitter.subscribe(() => {
      this.refDir.containerRef.clear();
    });
  }

  showEditDish(dish: DishTemplate): void {

    const component = this.refDir.containerRef.createComponent(this.modalFactory);

    component.instance.title = dish.name;
    component.instance.d = dish;

    component.instance.closeEmitter.subscribe(() => {
      this.refDir.containerRef.clear();
    });
  }
}
