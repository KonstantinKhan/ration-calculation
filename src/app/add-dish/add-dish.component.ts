import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {Dish, DishProduct, Product} from '../shared/interfaces';
import {DishService} from '../shared/services/dish.service';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss']
})
export class AddDishComponent implements OnInit {

  @ViewChild('addDishForm') addDishForm;
  @ViewChild('searchResult') searchResult;

  @Input() title;
  @Input() d: Dish;
  @Output() closeEmitter = new EventEmitter<void>();

  searchComponent = '';
  searchResults: Product[] = [];

  dish: Dish = {
    dishId: null,
    name: null,
    calories: 0,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    eating: null,
    weightRaw: 0,
    weightCooked: 0,
    verified: false,
    dish_product: []
  };

  constructor(
    private productService: ProductService,
    private dishService: DishService
  ) {
  }

  ngOnInit(): void {
    if (this.d != null) {
      this.dish = this.d;
    }
  }

  @HostListener('click', ['$event'])
  onClick(event): void {
    if (!this.addDishForm.nativeElement.contains(event.target) &&
      this.searchResults.length === 0) {
      this.closeEmitter.emit();
    }
  }

  search(): void {
    this.productService.getSearchProducts(this.searchComponent).subscribe((products: Product[]) => {
      this.searchResults = products;
    });
  }

  addProduct(product: Product): void {
    this.dish.dish_product.push({
      dishProductId: null,
      product,
      weight: 0
    });
    this.searchComponent = '';
  }

  setWeightComponent(dishProduct: DishProduct, $event): void {
    const weightComponent = $event.target.value;
    dishProduct.weight = weightComponent;
    this.updateDish();
  }

  updateDish(): void {
    let allCalories = 0;
    let allProteins = 0;
    let allFats = 0;
    let allCarbohydrates = 0;
    type FuncSum = (value: DishProduct) => void;
    const setWeight: FuncSum = (value): void => {
      this.dish.weightRaw += +value.weight;
      allCalories += +value.weight * value.product.calories / 100;
      allProteins += +value.weight * value.product.proteins / 100;
      allFats += +value.weight * value.product.fats / 100;
      allCarbohydrates += +value.weight * value.product.carbohydrates / 100;
      this.dish.calories = allCalories / this.dish.weightRaw * 100;
      this.dish.proteins = allProteins / this.dish.weightRaw * 100;
      this.dish.fats = allFats / this.dish.weightRaw * 100;
      this.dish.carbohydrates = allCarbohydrates / this.dish.weightRaw * 100;
    };
    this.dish.weightRaw = 0;
    this.dish.calories = 0;
    this.dish.proteins = 0;
    this.dish.fats = 0;
    this.dish.carbohydrates = 0;

    this.dish.dish_product.forEach(setWeight);
  }

  saveDish(): void {
    console.log(this.dish.dishId);
    this.dishService.saveDish(this.dish).subscribe();
  }

  saveName($event): void {
    this.dish.name = $event.target.value;
  }
}
