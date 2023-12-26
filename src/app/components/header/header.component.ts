import { Component } from '@angular/core';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  viewCart: boolean=false;


  onToggleCart(){
    this.viewCart=!this.viewCart;
  }

}
