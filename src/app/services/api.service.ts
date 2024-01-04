// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { Address } from '../models/address.model';
import { Product } from '../models/product.model';
import { Router, RouterLink } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl2 = 'http://127.0.0.1:8000/api/v1';
  private apiUrl1 = 'http://127.0.0.1:8000/api/v1/products/1';
  private apiPHP = 'http://127.0.0.1:8000/api/v1';
  private postUrl = 'https://webtrack.sanmartinbakery.com/api/store-pedido';


  private myList:Address[]=[];
  private combinedData: any;
  private orderData: any = {};
  

  private myClient = new BehaviorSubject<Address[]>([]);
  myClient$ = this.myClient.asObservable();

  private myList1:Product[]=[];

  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();

    



  constructor(private http: HttpClient,private router: Router) {}
  

  getPhoneInfo(phoneNumber: string): Observable<any> {
    const url = `${this.apiUrl2}/phone/${phoneNumber}`;
    return this.http.get(url);
  }


  

 


  getProductsByBlogId(url: string): Observable<any> {
    return this.http.get(url);
  }


 



  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl1);
  }

 

 
  addClient(clientData: any) {
    this.myList.push(clientData);
    

    
    
    
  }


  

  // Método para agregar datos de producto
  addProduct(product: any) {
    // Verificar si hay datos del cliente
    if (this.myList.length === 0) {
      console.error('No hay datos del cliente. Agrega información del cliente antes de agregar productos.');
      return;
    }
  
    // Verificar si hay productos en la lista
    if (this.myList1.length === 0) {
      // Si no hay productos, asignar cantidad y agregar el primer producto
      product.cantidad = 1;
      this.myList1.push(product);
    } else {
      // Si ya hay productos en la lista, buscar el producto por ID
      const productMod = this.myList1.find((element) => element.id === product.id);
  
      if (productMod) {
        // Si el producto ya está en la lista, incrementar la cantidad
        productMod.cantidad += 1;
      } else {
        // Si el producto no está en la lista, asignar cantidad y agregarlo
        product.cantidad = 1;
        this.myList1.push(product);
      }
    }
  
    // Actualizar el carrito
    this.myCart.next(this.myList1);
  
    console.log('Producto agregado al carrito:', product);
  }
  
  


  sendOrderData() {
    if (this.myList.length === 0 || this.myList1.length === 0) {
      console.error('No hay datos del cliente o del producto. Agrega esta información antes de enviar el pedido.');
      return;
    }
  
    // Prepara data del cliente
    const client = this.myList[0];
  
    // Prepara detalles del producto
    const detalle = this.myList1.map(product => ({
      producto: {
        nombre: product.post_title,
        sku: product.sku
        
      },
      detalle_producto: "Detalle del producto",
      cantidad: product.cantidad,
      precio: product.price
    }));
  
    // Crea objeto para el pedido
    const postData = {
      pedido: "SM-0000",
      fecha_pedido: new Date().toISOString().split('T')[0],
      cliente: {
        nombre: client.Nombre,
        correo: client.email,
        telefono: client.Numero,
        direccion: client.Direccion
      },
      tienda_id: 1,
      metodo_pago_id: 1,
      auth: "authorization_code",
      monto_total: detalle.reduce((sum, item) => sum + (item.cantidad * item.precio), 0),
      observaciones: "Observaciones del pedido",
      detalle: detalle
    };
  
    // Hacer solicitud HTTP POST
    this.http.post(this.postUrl, postData).subscribe(
      response => console.log('Pedido enviado:', response),
      error => console.error('Ocurrió un error al enviar el pedido:', error)
    );
  }
  





  
  
decrementQuantity(product: Product) {
  if (product.cantidad > 0) {
    product.cantidad--;
    this.updateCart();
  }
}

incrementQuantity(product: Product) {
  product.cantidad++;
  this.updateCart();
}

updateCart() {
  this.myCart.next(this.myList1);
}



  


}


