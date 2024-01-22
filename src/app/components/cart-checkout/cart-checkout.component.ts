import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.css']
})
export class CartCheckoutComponent implements OnInit {



myCart$ = this.productService.myCart$;
subtotal: number = 0;

constructor(public productService: ApiService, private router: Router) {}

  ngOnInit() {

  }




  returnCart() {
    this.router.navigate(['/products']);
  }


  onCheckoutClick() {
    // Realizar otras acciones relacionadas con el checkout si es necesario

    this.router.navigate(['/checkout']);
  }

  decrementQuantity(product: Product) {
    if (product.cantidad > 0) {
      product.cantidad--;
      this.productService.updateCart();
      this.calculateSubtotal();
    }
  }

  incrementQuantity(product: Product) {
    product.cantidad++;
    this.productService.updateCart();
    this.calculateSubtotal();
  }

  calculateSubtotal() {
    this.myCart$.subscribe((products: Product[]) => {
      this.subtotal = products.reduce((total, product) => total + product.price * product.cantidad, 0);
    });
  }

}
