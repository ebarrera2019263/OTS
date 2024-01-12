import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptor } from './shared/auth.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddressComponent } from './components/address/address.component';
import { FooterComponent } from './components/footer/footer.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryFilterPipe } from './category-filter.pipe';
import { SearchPipe } from './search.pipe';
import { CategoryClickFilterPipe } from './category-click-filter.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { SecureComponent } from './components/secure/secure.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CartCheckoutComponent } from './components/cart-checkout/cart-checkout.component';
import { OrderCompleteComponent } from './components/order-complete/order-complete.component';
import { FilterPipe } from './filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { ProductsCategoriesComponent } from './component/products-categories/products-categories.component';








@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    AddressComponent,
    FooterComponent,
    CheckoutComponent,
    ProductsComponent,
    CartComponent,
    CategoryFilterPipe,
    SearchPipe,
    CategoryClickFilterPipe,
    PaginationComponent,
    SecureComponent,
    NotificationComponent,
    AddAddressComponent,
    SpinnerComponent,
    CartCheckoutComponent,
    OrderCompleteComponent,
    FilterPipe,
    HeaderMenuComponent,
    ProductsCategoriesComponent,
    
  
    
    
   
   

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NgxPaginationModule
   
    
    
    
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
