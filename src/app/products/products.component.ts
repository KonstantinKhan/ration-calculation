import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../shared/services/product.service';
import {Product} from '../shared/interfaces';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

}
