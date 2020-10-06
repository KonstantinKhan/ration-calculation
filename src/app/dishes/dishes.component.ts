import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {DishService} from '../shared/services/dish.service';
import {Dish} from '../shared/interfaces';
import {AddDishComponent} from '../add-dish/add-dish.component';
import {RefDirective} from '../ref.directive';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {

  dishes: Dish[];

  @ViewChild(RefDirective) refDir: RefDirective;

  constructor(
    private dishService: DishService,
    private resolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit(): void {
    this.dishService.getAllDishes().subscribe((dishes: Dish[]) => {
      this.dishes = dishes;
    });
  }

  showNewDish(): void {
    const modalFactory = this.resolver.resolveComponentFactory(AddDishComponent);
    this.refDir.containerRef.clear();
    const component = this.refDir.containerRef.createComponent(modalFactory);

    component.instance.title = 'Новое блюдо';
    component.instance.closeEmitter.subscribe(() => {
      this.refDir.containerRef.clear();
    });
  }
}
