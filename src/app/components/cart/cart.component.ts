import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  myCart$ = this.productService.myCart$;
  subtotal: number = 0;
  myList: any[] = []; // Ajusta el tipo según la estructura real de tus datos
  myList1: any[] = [];
  

  constructor(public productService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.calculateSubtotal();
  }

  irComponent() {
    this.router.navigate(['/checkout']);
   
  }

  returnCart() {
    this.router.navigate(['/products']);
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


  checkout() {
    
    this.productService.sendOrderData();
  }

  




}

  
  




