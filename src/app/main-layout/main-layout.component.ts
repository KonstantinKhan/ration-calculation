import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  isCollapse = true;

  constructor() { }

  ngOnInit(): void {
  }

  setWidth(): boolean {
    return this.isCollapse = !this.isCollapse;
  }

}
