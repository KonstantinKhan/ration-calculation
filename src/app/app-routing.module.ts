import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RationComponent} from './ration/ration.component';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {DishesComponent} from './dishes/dishes.component';
import {ProductsComponent} from './products/products.component';
import {LoginPageComponent} from './login-page/login-page.component';


const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: RationComponent},
      {path: 'ration/:id', component: RationComponent},
      {path: 'dishes', component: DishesComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'login-page', component: LoginPageComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
