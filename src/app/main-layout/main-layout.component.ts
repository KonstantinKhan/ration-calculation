import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {DateService} from '../shared/services/date.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  isCollapse = true;
  dateStr: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private dateService: DateService,
    private datePipe: DatePipe
    ) { }

  ngOnInit(): void {
    this.dateStr = this.datePipe.transform(this.dateService.currentDate(), 'yyyy-MM-dd');
  }

  setWidth(): boolean {
    return this.isCollapse = !this.isCollapse;
  }

  logout(event: Event): void {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['login-page']);
  }
}
