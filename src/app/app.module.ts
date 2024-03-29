import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {DatePipe, registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {RationComponent} from './ration/ration.component';
import {DishesComponent} from './dishes/dishes.component';
import {ProductsComponent} from './products/products.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginPageComponent} from './login-page/login-page.component';
import {AddProductComponent} from './add-product/add-product.component';
import {RefDirective} from './ref.directive';
import {AddDishComponent} from './add-dish/add-dish.component';
import {EditDishComponent} from './edit-dish/edit-dish.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    RationComponent,
    DishesComponent,
    ProductsComponent,
    LoginPageComponent,
    AddProductComponent,
    RefDirective,
    AddDishComponent,
    EditDishComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru'},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
