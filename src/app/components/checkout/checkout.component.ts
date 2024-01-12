import { Component ,  OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  subtotal: number = 0;


  
 
  myClient$  = this.ApiService.myClient$
  myCart$ = this.ApiService.myCart$

  constructor(private ApiService : ApiService, 
     private router: Router,
     private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  get mostrarBotonCheckout(): boolean {
    return !this.ApiService.checkoutClicked;
  }


  realizarCheckout() {
    // Lógica para realizar el checkout
    // ...

    // Después de realizar el checkout, puedes establecer checkoutClicked en true
    this.ApiService.checkoutClicked = true;
  }


  get mostrarComentario(): boolean {
    return this.ApiService.mostrarComentario;
  }

  addToCart(product: Product) {
     this.ApiService.addProduct(product);
     
    
  }


  returnCart(){
    this.router.navigate(['/products']);
  }


  checkout() {
    this.ApiService.sendOrderData();
    this.router.navigate(['/order']);
  }


  calculateSubtotal() {
    this.myCart$.subscribe((products: Product[]) => {
      this.subtotal = products.reduce((total, product) => total + product.price * product.cantidad, 0);
    });
  }



  decrementQuantity(product: Product) {
    if (product.cantidad > 0) {
      product.cantidad--;
      this.ApiService.updateCart();
      this.calculateSubtotal();
    }
  }

  incrementQuantity(product: Product) {
    product.cantidad++;
    this.ApiService.updateCart();
    this.calculateSubtotal();
  }

}
