import {Component, ComponentFactoryResolver, HostListener, OnInit, ViewChild} from '@angular/core';
import {DateService} from '../shared/services/date.service';
import {DataComponent, Dish, DishProduct, DishTemplate, Product, Ration, RationDish, RationProduct} from '../shared/interfaces';
import {Subscription} from 'rxjs';
import {ProductService} from '../shared/services/product.service';
import {DishService} from '../shared/services/dish.service';
import {RationServices} from '../shared/services/ration.services';
import {DatePipe} from '@angular/common';
import {RefDirective} from '../ref.directive';
import {AddDishComponent} from '../add-dish/add-dish.component';
import {EditDishComponent} from '../edit-dish/edit-dish.component';

@Component({
  selector: 'app-ration',
  templateUrl: './ration.component.html',
  styleUrls: ['./ration.component.scss']
})
export class RationComponent implements OnInit {

  @ViewChild('inputBreakfast') inputBreakfast;
  @ViewChild('inputLunch') inputLunch;
  @ViewChild('inputDinner') inputDinner;
  @ViewChild('inputSnack') inputSnack;
  @ViewChild(RefDirective) refDir: RefDirective;

  modalFactory = this.resolver.resolveComponentFactory(EditDishComponent);

  ration: Ration;
  product: Product;

  isSearchFocus = false;

  pSub: Subscription;
  dSub: Subscription;

  breakfastProducts: RationProduct[] = [];
  breakfastDishes: RationDish[] = [];
  lunchProducts: RationProduct[] = [];
  lunchDishes: RationDish[] = [];
  dinnerProducts: RationProduct[] = [];
  dinnerDishes: RationDish[] = [];
  snackProducts: RationProduct[] = [];
  snackDishes: RationDish[] = [];

  searchComponentBreakfast = '';
  searchComponentLunch = '';
  searchComponentDinner = '';
  searchComponentSnack = '';
  componentSearchProduct: Product[] = [];
  componentSearchDish: DishTemplate[] = [];
  componentsSearchBreakfast: DataComponent[] = [];
  componentsSearchLunch: Product[] | Dish[] = [];
  componentsSearchDinner: Product[] | Dish[] = [];
  componentsSearchSnack: Product[] | Dish[] = [];

  constructor(
    public dateService: DateService,
    public productService: ProductService,
    public dishesService: DishService,
    public rationService: RationServices,
    public datePipe: DatePipe,
    private resolver: ComponentFactoryResolver
  ) {
  }

  @HostListener('click', ['$event'])
  onClick(event): void {

    if (!this.inputBreakfast.nativeElement.contains(event.target)) {
      this.componentsSearchBreakfast.length = 0;
      this.searchComponentBreakfast = '';
    }

    if (!this.inputLunch.nativeElement.contains(event.target)) {
      this.componentsSearchLunch.length = 0;
      this.searchComponentLunch = '';
    }

    if (!this.inputDinner.nativeElement.contains(event.target)) {
      this.componentsSearchDinner.length = 0;
      this.searchComponentDinner = '';
    }

    if (!this.inputSnack.nativeElement.contains(event.target)) {
      this.componentsSearchSnack.length = 0;
      this.searchComponentSnack = '';
    }
  }

  ngOnInit(): void {

    const dateStr = this.datePipe.transform(this.dateService.currentDate(), 'yyyy-MM-dd');

    this.rationService.getRation(dateStr).subscribe((ration: Ration) => {

      this.ration = ration;

      if (this.ration != null) {
        this.ration.ration_product.forEach(value => {
          switch (value.eating) {
            case 'b':
              this.breakfastProducts.push(value);
              break;
            case 'l':
              this.lunchProducts.push(value);
              break;
            case 'd':
              this.dinnerProducts.push(value);
              break;
            case 's':
              this.snackProducts.push(value);
              break;
          }
        });
        this.ration.ration_dish.forEach(value => {
          switch (value.eating) {
            case 'b':
              this.breakfastDishes.push(value);
              break;
            case 'l':
              this.breakfastDishes.push(value);
              break;
            case 'd':
              this.breakfastDishes.push(value);
              break;
            case 's':
              this.breakfastDishes.push(value);
              break;
          }
        });
      }

      this.breakfastProducts.sort((a, b) => this.sortAlphaBet(a.product, b.product));
      this.lunchProducts.sort((a, b) => this.sortAlphaBet(a.product, b.product));
      this.dinnerProducts.sort((a, b) => this.sortAlphaBet(a.product, b.product));
      this.snackProducts.sort((a, b) => this.sortAlphaBet(a.product, b.product));

    });
  }

  focusout(): void {
    if (!this.isSearchFocus) {
      this.componentsSearchBreakfast.length = 0;
      this.componentsSearchLunch.length = 0;
      this.componentsSearchDinner.length = 0;
      this.componentsSearchSnack.length = 0;
      this.searchComponentLunch = '';
      this.searchComponentDinner = '';
      this.searchComponentSnack = '';
      this.searchComponentBreakfast = '';
    }
  }

  sortAlphaBet(a: Product | Dish, b: Product | Dish): number {
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  }

  searchProducts(eating: string): void {
    switch (eating) {
      case 'b':
        if (this.searchComponentBreakfast.trim()) {
          this.pSub = this.productService.getSearchProducts(this.searchComponentBreakfast)
            .subscribe((products: Product[]) => {
              this.componentSearchProduct = products;
            });
          this.dSub = this.dishesService.getSearchDish(this.searchComponentBreakfast)
            .subscribe((dishes: DishTemplate[]) => {
              this.componentSearchDish = dishes;
            });
        } else {
          this.componentSearchProduct.length = 0;
          this.componentSearchDish.length = 0;
        }
        break;
      // case 'l':
      //   if (this.searchComponentLunch.trim()) {
      //     this.pSub = this.productService.getSearchProducts(this.searchComponentLunch, 4).subscribe((data: Product[]) => {
      //       this.componentsSearchLunch = data;
      //     });
      //     /*this.dSub = this.dishesService.getSearchDish(this.searchComponent).subscribe((data: Dish[]) => {
      //       this.components = this.components.concat(data);
      //     });*/
      //   } else {
      //     this.componentsSearchLunch.length = 0;
      //   }
      //   break;
      // case 'd':
      //   if (this.searchComponentDinner.trim()) {
      //     this.pSub = this.productService.getSearchProducts(this.searchComponentDinner, 4).subscribe((data: Product[]) => {
      //       this.componentsSearchDinner = data;
      //     });
      //     /*this.dSub = this.dishesService.getSearchDish(this.searchComponent).subscribe((data: Dish[]) => {
      //       this.components = this.components.concat(data);
      //     });*/
      //   } else {
      //     this.componentsSearchDinner.length = 0;
      //   }
      //   break;
      // case 's':
      //   if (this.searchComponentSnack.trim()) {
      //     this.pSub = this.productService.getSearchProducts(this.searchComponentSnack, 4).subscribe((data: Product[]) => {
      //       this.componentsSearchSnack = data;
      //     });
      //     /*this.dSub = this.dishesService.getSearchDish(this.searchComponent).subscribe((data: Dish[]) => {
      //       this.components = this.components.concat(data);
      //     });*/
      //   } else {
      //     this.componentsSearchSnack.length = 0;
      //   }
      //   break;
    }
  }

  addProduct(product: Product, e: string): void {
    const rationProduct: RationProduct = {rationProductId: 0, product, weight: 0, eating: e};
    this.rationService.addProduct(this.dateService.dateToStringFormat(this.dateService.currentDate()), rationProduct)
      .subscribe((ration) => {
        this.update(ration);
      });
    this.breakfastProducts.sort((a, b) => this.sortAlphaBet(a.product, b.product));
    this.lunchProducts.sort((a, b) => this.sortAlphaBet(a.product, b.product));
    this.dinnerProducts.sort((a, b) => this.sortAlphaBet(a.product, b.product));
    this.snackProducts.sort((a, b) => this.sortAlphaBet(a.product, b.product));

    switch (e) {
      case 'b':
        this.componentSearchProduct.length = 0;
        this.componentSearchDish.length = 0;
        this.searchComponentBreakfast = '';
        break;
      case 'l':
        this.componentsSearchLunch.length = 0;
        this.searchComponentLunch = '';
        break;
      case 'd':
        this.componentsSearchDinner.length = 0;
        this.searchComponentDinner = '';
        break;
      case 's':
        this.componentsSearchSnack.length = 0;
        this.searchComponentSnack = '';
        break;
    }
  }

  addDish(dish: DishTemplate, e: string): void {
    // const rationDish: RationDish = {rationDishId: 0, dish, weight: 0, eating: e};
    // const d: Dish = JSON.parse(JSON.stringify(dish));
    const dishProduct: DishProduct[] = [];
    console.log(dish);
    dish.dishTemplate_product.forEach(value => {
      dishProduct.push({
        dishProductId: 0,
        product: value.product,
        weight: value.weight,
      });
    });
    const d: Dish = {
      dishId: 0,
      eating: e,
      name: dish.name,
      calories: dish.calories,
      proteins: dish.proteins,
      fats: dish.fats,
      carbohydrates: dish.carbohydrates,
      dish_product: dishProduct,
      weightRaw: dish.weightRaw,
      weightCooked: dish.weightCooked
    };
    const rationDish: RationDish = {rationDishId: 0, dish: d, weight: 0, eating: e};
    this.rationService.addDish(this.dateService.dateToStringFormat(this.dateService.currentDate()), rationDish)
      .subscribe((ration: Ration) => {
        this.update(ration);
      });
    this.breakfastProducts.sort((a, b) => this.sortAlphaBet(a.product, b.product));
    this.lunchProducts.sort((a, b) => this.sortAlphaBet(a.product, b.product));
    this.dinnerProducts.sort((a, b) => this.sortAlphaBet(a.product, b.product));
    this.snackProducts.sort((a, b) => this.sortAlphaBet(a.product, b.product));

    switch (e) {
      case 'b':
        this.componentSearchProduct.length = 0;
        this.componentSearchDish.length = 0;
        this.searchComponentBreakfast = '';
        break;
      case 'l':
        this.componentsSearchLunch.length = 0;
        this.searchComponentLunch = '';
        break;
      case 'd':
        this.componentsSearchDinner.length = 0;
        this.searchComponentDinner = '';
        break;
      case 's':
        this.componentsSearchSnack.length = 0;
        this.searchComponentSnack = '';
        break;
    }
  }

  updateWeightByProduct(rationProduct: RationProduct, e: any): void {
    rationProduct.weight = e.target.value;
    this.rationService.updateRationByProduct(this.dateService.dateToStringFormat(new Date(this.ration.date)), rationProduct)
      .subscribe(value => {
        this.ration = value;
      });
  }

  updateWeightByDish(rationDish: RationDish, e: any): void {
    rationDish.weight = e.target.value;
    this.rationService.updateRationByDish(this.dateService.dateToStringFormat(new Date(this.ration.date)), rationDish)
      .subscribe(value => {
        this.ration = value;
      });
  }

  deleteProduct(id: number): void {
    this.rationService.deleteProduct(this.dateService.dateToStringFormat(new Date(this.ration.date)), id)
      .subscribe(value => {
        this.update(value);
      });
  }

  update(ration: Ration): void {
    this.ration = ration;
    this.breakfastProducts.length = 0;
    this.breakfastDishes.length = 0;
    this.lunchProducts.length = 0;
    this.dinnerProducts.length = 0;
    this.snackProducts.length = 0;
    this.ration.ration_product.forEach(v => {
      switch (v.eating) {
        case 'b':
          this.breakfastProducts.push(v);
          break;
        case 'l':
          this.lunchProducts.push(v);
          break;
        case 'd':
          this.dinnerProducts.push(v);
          break;
        case 's':
          this.snackProducts.push(v);
          break;
      }
    });
    this.ration.ration_dish.forEach(v => {
      switch (v.eating) {
        case 'b':
          this.breakfastDishes.push(v);
          break;
        case 'l':
          this.lunchDishes.push(v);
          break;
        case 'd':
          this.dinnerDishes.push(v);
          break;
        case 's':
          this.snackDishes.push(v);
          break;
      }
    });
  }

  clearRation(): void {
    this.rationService.clearRation(this.dateService.dateToStringFormat(new Date(this.ration.date))).subscribe(ration => {
      this.update(ration);
    });
  }

  deleteDish(id: number): void {
    this.rationService.deleteDish(this.dateService.dateToStringFormat(new Date(this.ration.date)), id)
      .subscribe(value => {
        this.update(value);
      });
  }

  editDish(rationDish: RationDish): void {

    const component = this.refDir.containerRef.createComponent(this.modalFactory);

    component.instance.title = rationDish.dish.name;
    component.instance.d = rationDish.dish;
    component.instance.rationDish = rationDish;
    component.instance.date = this.ration.date.toString();
    component.instance.ration = this.ration;

    component.instance.closeEmitter.subscribe(() => {
      this.rationService.getRation(this.ration.date.toString()).subscribe((ration: Ration) => {
        this.ration = ration;
      });
      this.refDir.containerRef.clear();
    });
  }
}
