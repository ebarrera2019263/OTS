import { Component ,  OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  subtotal: number = 0;
  showDialog = false;



// En tu servicio (por ejemplo, ApiService)
private currentProductId: string = '';

// Resto del código...


  myClient$  = this.ApiService.myClient$
  myCart$ = this.ApiService.myCart$

  constructor(private ApiService : ApiService,
     private router: Router,
     private toastr: ToastrService, private sharedService: SharedService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.params['productId'];

  }



  mostrarDialog() {
    this.showDialog = true;
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


  // En tu servicio (por ejemplo, ApiService)

setCurrentProductId(productId: string): void {
  this.currentProductId = productId;
}

getCurrentProductId(): string {
  return this.currentProductId;
}

// En tu componente de productos al seleccionar un producto
seleccionarProducto(productId: string): void {
  this.ApiService.setCurrentProductId(productId);
}


 // checkout.component.ts
 checkout() {
  // Obtener el ID del producto actual
  const currentProductId = this.sharedService.currentProductId;

  // Obtener las opciones seleccionadas del servicio compartido
  const selectedOptions = this.sharedService.selectedOptions;

  // Verificar si hay opciones seleccionadas antes de llamar a sendOrderData
  if (currentProductId && selectedOptions && selectedOptions.length > 0) {
    // Llamar a la función sendOrderData y pasar las opciones seleccionadas y el ID del producto actual
    this.ApiService.sendOrderData(currentProductId, selectedOptions);
  } else {
    // Puedes manejar el caso en que no hay opciones seleccionadas, por ejemplo, mostrando un mensaje al usuario.
    console.error('No hay opciones seleccionadas o ID de producto actual.');
  }

  this.showDialog = true;
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
