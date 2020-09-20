import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  isCollapse = true;

  constructor(
    private router: Router,
    private auth: AuthService
    ) { }

  ngOnInit(): void {
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
