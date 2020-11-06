import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {Dish, DishProduct, DishTemplate, DishTemplateProduct, Product} from '../shared/interfaces';
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
  @Input() d: DishTemplate;
  @Output() closeEmitter = new EventEmitter<void>();

  searchComponent = '';
  searchResults: Product[] = [];

  dish: DishTemplate;

  constructor(
    private productService: ProductService,
    private dishService: DishService
  ) {
  }

  ngOnInit(): void {
    if (this.d != null) {
      this.dish = JSON.parse(JSON.stringify(this.d));
    } else {
      this.dish = {
        dishTemplateId: null,
        name: null,
        calories: 0,
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
        weightRaw: 0,
        weightCooked: 0,
        verified: false,
        dishTemplate_product: []
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
    this.dish.dishTemplate_product.push({
      dishTemplateProductId: null,
      product,
      weight: 0
    });
    this.searchComponent = '';
  }

  setWeightComponent(dishProduct: DishTemplateProduct, $event): void {
    const weightComponent = $event.target.value;
    dishProduct.weight = weightComponent;
    this.updateDish();
  }

  updateDish(): void {
    let allCalories = 0;
    let allProteins = 0;
    let allFats = 0;
    let allCarbohydrates = 0;
    type FuncSum = (value: DishTemplateProduct) => void;
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

    this.dish.dishTemplate_product.forEach(setWeight);
  }

  saveDish(): void {
    console.log(this.dish);
    this.dishService.saveDishTemplate(this.dish).subscribe();
  }

  saveName($event): void {
    this.dish.name = $event.target.value;
  }

  // Метод для удаления продукта из блюда
  deleteProduct(dishProduct: DishTemplateProduct): void {
    const index = this.dish.dishTemplate_product.indexOf(dishProduct, 0);
    if (index > -1) {
      this.dish.dishTemplate_product.splice(index, 1);
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
}
