import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {DateService} from '../shared/services/date.service';
import {Dish, Product, Ration, RationProduct} from '../shared/interfaces';
import {Subscription} from 'rxjs';
import {ProductService} from '../shared/services/product.service';
import {DishService} from '../shared/services/dish.service';
import {RationServices} from '../shared/services/ration.services';
import {DatePipe} from '@angular/common';

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

  ration: Ration;
  product: Product;

  isSearchFocus = false;

  pSub: Subscription;
  dSub: Subscription;

  breakfastComposition: RationProduct[] = [];
  lunchComposition: RationProduct[] = [];
  dinnerComposition: RationProduct[] = [];
  snackComposition: RationProduct[] = [];

  searchComponentBreakfast = '';
  searchComponentLunch = '';
  searchComponentDinner = '';
  searchComponentSnack = '';
  componentsSearchBreakfast: Product[] | Dish[] = [];
  componentsSearchLunch: Product[] | Dish[] = [];
  componentsSearchDinner: Product[] | Dish[] = [];
  componentsSearchSnack: Product[] | Dish[] = [];

  constructor(
    public dateService: DateService,
    public productService: ProductService,
    public dishesService: DishService,
    public rationService: RationServices,
    public datePipe: DatePipe) {
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
              this.breakfastComposition.push(value);
              break;
            case 'l':
              this.lunchComposition.push(value);
              break;
            case 'd':
              this.dinnerComposition.push(value);
              break;
            case 's':
              this.snackComposition.push(value);
              break;
          }
        });
      }

      this.breakfastComposition.sort((a, b) => this.sortAlphaBet(a.product, b.product));
      this.lunchComposition.sort((a, b) => this.sortAlphaBet(a.product, b.product));
      this.dinnerComposition.sort((a, b) => this.sortAlphaBet(a.product, b.product));
      this.snackComposition.sort((a, b) => this.sortAlphaBet(a.product, b.product));

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
              this.componentsSearchBreakfast = products;
            });
          /*this.dSub = this.dishesService.getSearchDish(this.searchComponent).subscribe((data: Dish[]) => {
            this.components = this.components.concat(data);
          });*/
        } else {
          this.componentsSearchBreakfast.length = 0;
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

  addComponent(component: Product, e: string): void {
    const rationProduct: RationProduct = {rationProductId: 0, product: component, weight: 0, eating: e};
    this.rationService.addProduct(this.dateService.dateToStringFormat(this.dateService.currentDate()), rationProduct)
      .subscribe((ration) => {
        this.update(ration);
      });
    this.breakfastComposition.sort((a, b) => this.sortAlphaBet(a.product, b.product));
    this.lunchComposition.sort((a, b) => this.sortAlphaBet(a.product, b.product));
    this.dinnerComposition.sort((a, b) => this.sortAlphaBet(a.product, b.product));
    this.snackComposition.sort((a, b) => this.sortAlphaBet(a.product, b.product));

    switch (e) {
      case 'b':
        this.componentsSearchBreakfast.length = 0;
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

  updateWeight(rationProduct: RationProduct, e: any): void {
    rationProduct.weight = e.target.value;
    this.rationService.updateRation(this.dateService.dateToStringFormat(new Date(this.ration.date)), rationProduct).subscribe(value => {
      this.ration = value;
    });
  }

  deleteProduct(id: number): void {
    this.rationService.deleteProduct(this.dateService.dateToStringFormat(new Date(this.ration.date)), id).subscribe(value => {
      this.update(value);
    });
  }

  update(ration: Ration): void {
    this.ration = ration;
    this.breakfastComposition.length = 0;
    this.lunchComposition.length = 0;
    this.dinnerComposition.length = 0;
    this.snackComposition.length = 0;
    this.ration.ration_product.forEach(v => {
      switch (v.eating) {
        case 'b':
          this.breakfastComposition.push(v);
          break;
        case 'l':
          this.lunchComposition.push(v);
          break;
        case 'd':
          this.dinnerComposition.push(v);
          break;
        case 's':
          this.snackComposition.push(v);
          break;
      }
    });
  }

  clearRation(): void {
    this.rationService.clearRation(this.dateService.dateToStringFormat(new Date(this.ration.date))).subscribe(ration => {
      this.update(ration);
    });
  }
}
