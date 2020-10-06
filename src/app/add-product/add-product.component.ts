import {Component, Input, OnInit, Output, EventEmitter, HostListener, ViewChild} from '@angular/core';
import {Product} from '../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../shared/services/product.service';
import {CommonService} from '../shared/services/common.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @ViewChild('addProductForm') addProductForm;

  form: FormGroup;

  @Input() title;
  @Output() close = new EventEmitter<void>();

  constructor(
    private productService: ProductService,
    private commonService: CommonService
  ) {
  }

  ngOnInit(): void {
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
    this.productService.addProduct(product).subscribe(() => {
      this.commonService.callNgInit();
    });
    this.close.emit();
  }

  @HostListener('click', ['$event'])
  onClick(event): void {
    if (!this.addProductForm.nativeElement.contains(event.target)) {
      this.close.emit();
    }
  }
}
