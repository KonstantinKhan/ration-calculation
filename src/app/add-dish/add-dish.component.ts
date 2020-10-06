import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss']
})
export class AddDishComponent implements OnInit {

  @ViewChild('addDishForm') addDishForm;

  @Input() title;
  @Output() closeEmitter = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  @HostListener('click', ['$event'])
  onClick(event): void {
    if (!this.addDishForm.nativeElement.contains(event.target)) {
      this.closeEmitter.emit();
    }
  }

}
