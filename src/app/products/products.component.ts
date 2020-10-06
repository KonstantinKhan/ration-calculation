import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {Product} from '../shared/interfaces';
import {AddProductComponent} from '../add-product/add-product.component';
import {RefDirective} from '../ref.directive';
import {CommonService} from '../shared/services/common.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  @ViewChild(RefDirective) refDir: RefDirective;

  constructor(
    private productService: ProductService,
    private resolver: ComponentFactoryResolver,
    private commonService: CommonService
  ) {
    this.commonService.invokeEvent.subscribe( value => {
      // if (value === 'someVal') {
      //   console.log('Вызов метода')
        this.ngOnInit();
      // }
    });
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  showNewProduct(): void {
    const modalFactory = this.resolver.resolveComponentFactory(AddProductComponent);
    this.refDir.containerRef.clear();
    const component = this.refDir.containerRef.createComponent(modalFactory);

    component.instance.title = 'Новый продукт';
    component.instance.closeEmitter.subscribe(() => {
      this.refDir.containerRef.clear();
    });
  }
}
