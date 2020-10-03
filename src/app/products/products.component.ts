import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {Product} from '../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AddProductComponent} from '../add-product/add-product.component';
import {RefDirective} from '../ref.directive';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  isCreate = false;
  form: FormGroup;

  @ViewChild(RefDirective) refDir: RefDirective;

  constructor(
    private productService: ProductService,
    private resolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe((products: Product[]) => {
      this.products = products;
    });
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(1)]),
      calories: new FormControl(null, [
        Validators.required,
        Validators.minLength(1)]),
      proteins: new FormControl(null, [
        Validators.required,
        Validators.minLength(1)]),
      fats: new FormControl(null, [
        Validators.required,
        Validators.minLength(1)]),
      carbohydrates: new FormControl(null, [
        Validators.required,
        Validators.minLength(1)])
    });
  }

  showNewProduct(): void {
    this.isCreate = true;
    const modalFactory = this.resolver.resolveComponentFactory(AddProductComponent);
    this.refDir.containerRef.clear();
    const component = this.refDir.containerRef.createComponent(modalFactory);

    component.instance.title = 'Dynamic title';
    component.instance.close.subscribe(() => {
      this.refDir.containerRef.clear();
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    const product: Product = {
      productId: null,
      name: this.form.value.name,
      calories: this.form.value.calories,
      proteins: this.form.value.proteins,
      fats: this.form.value.fats,
      carbohydrates: this.form.value.carbohydrates,
      verified: false,
      userId: null
    };
    console.log(product);
    this.productService.addProduct(product).subscribe();
  }
}
