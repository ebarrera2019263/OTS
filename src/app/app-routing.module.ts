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




const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent},
  {path:'address', component: AddressComponent},
  {path:'checkout', component: CheckoutComponent},
  { path: 'products', component: ProductsComponent },
  {path: 'secure', component: SecureComponent},
  {path: 'add', component: AddAddressComponent},
  {path: 'spin', component: SpinnerComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
