import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @Input() title = 'title';
  @Output() close = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
