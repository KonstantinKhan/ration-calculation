import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Dish, DishProduct, Product, Ration, RationDish} from '../shared/interfaces';
import {ProductService} from '../shared/services/product.service';
import {DishService} from '../shared/services/dish.service';
import {RationServices} from '../shared/services/ration.services';

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.scss']
})
export class EditDishComponent implements OnInit {

  @ViewChild('editDishForm') addDishForm;
  @ViewChild('searchResult') searchResult;

  @Input() title;
  @Input() d: Dish;
  @Input() rationDish: RationDish;
  @Input() date: string;
  @Input() ration: Ration;
  @Output() closeEmitter = new EventEmitter<void>();

  searchComponent = '';
  searchResults: Product[] = [];

  dish: Dish;

  constructor(
    private productService: ProductService,
    private dishService: DishService,
    private rationService: RationServices
  ) {
  }

  ngOnInit(): void {
    if (this.d != null) {
      this.dish = JSON.parse(JSON.stringify(this.d));
    } else {
      this.dish = {
        dishId: null,
        name: null,
        calories: 0,
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
        weightRaw: 0,
        weightCooked: 0,
        eating: 'b',
        dish_product: []
      };
    }
  }

  @HostListener('click', ['$event'])
  onClick(event): void {
    // if (!this.addDishForm.nativeElement.contains(event.target) &&
    //   this.searchResults.length === 0) {
    //   this.closeEmitter.emit();
    // }
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
    this.rationDish.dish = this.dish;
    this.dishService.saveDish(this.date, this.rationDish).subscribe(() => {
      this.closeEmitter.emit();
    });
  }

  saveName($event): void {
    this.dish.name = $event.target.value;
  }

  // Метод для удаления продукта из блюда
  deleteProduct(dishProduct: DishProduct): void {
    const index = this.dish.dish_product.indexOf(dishProduct, 0);
    if (index > -1) {
      this.dish.dish_product.splice(index, 1);
    }
    this.updateDish();
  }

  // Метод для замены продукта в блюде
  replaceProduct(): void {

  }

  // Метод для закрытия окна окна работы с блюдом
  close(): void {
    this.closeEmitter.emit();
  }

  updateWeightByDish(rationDish: RationDish): void {
    console.log(rationDish);
    this.rationService.updateRationByDish(this.date, rationDish)
      .subscribe(value => {
        this.ration = value;
      });
  }
}
