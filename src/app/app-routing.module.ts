import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AddressComponent } from './components/address/address.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductsComponent } from './components/products/products.component';
import { SecureComponent } from './components/secure/secure.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CartCheckoutComponent } from './components/cart-checkout/cart-checkout.component';
import { OrderCompleteComponent } from './components/order-complete/order-complete.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { ProductsCategoriesComponent } from './component/products-categories/products-categories.component';
import { DetailProductsComponent } from './components/detail-products/detail-products.component';




const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent},
  {path:'address', component: AddressComponent},
  {path:'checkout', component: CheckoutComponent},
  { path: 'products', component: ProductsComponent },
  {path: 'secure', component: SecureComponent},
  {path: 'add', component: AddAddressComponent},
  {path: 'spin', component: SpinnerComponent},
  {path: 'cartcheckout', component: CartCheckoutComponent},
  {path: 'order', component: OrderCompleteComponent},
  {path: 'headermenu', component: HeaderMenuComponent},
  {path: 'categories', component: ProductsCategoriesComponent},
  { path: 'detail/:id_tienda/:id', component: DetailProductsComponent },






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
