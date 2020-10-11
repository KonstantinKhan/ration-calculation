import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {Dish, DishProduct, Product} from '../shared/interfaces';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss']
})
export class AddDishComponent implements OnInit {

  @ViewChild('addDishForm') addDishForm;
  @ViewChild('searchResult') searchResult;

  @Input() title;
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
    dishProduct: []
  };

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
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
    this.dish.dishProduct.push({
      dishProductId: null,
      product,
      eating: null,
      weight: 0
    });
    this.searchComponent = '';
  }

  serWeightComponent(dishProduct: DishProduct, $event): void {
    const weightComponent = $event.target.value;
    dishProduct.weight = weightComponent;
    this.updateDish();
  }

  updateDish(): void {
    type FuncSum = (value: DishProduct) => void;
    const setWeight: FuncSum = (value): void => {
      this.dish.weightRaw += +value.weight;
      this.dish.calories += +value.weight * value.product.calories / 100;
      this.dish.proteins += +value.weight * value.product.proteins / 100;
      this.dish.fats += +value.weight * value.product.fats / 100;
      this.dish.carbohydrates += +value.weight * value.product.carbohydrates / 100;
    };
    this.dish.weightRaw = 0;
    this.dish.calories = 0;
    this.dish.proteins = 0;
    this.dish.fats = 0;
    this.dish.carbohydrates = 0;
    this.dish.dishProduct.forEach(setWeight);
  }
}
