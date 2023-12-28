// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Address } from '../models/address.model';
import { Product } from '../models/product.model';
import { Router, RouterLink } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1';
  private apiUrl1 = 'http://127.0.0.1:8000/api/v1/products/zona10';
  private apiPHP = 'http://127.0.0.1:8000/api/v1';

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
    const url = `${this.apiUrl}/phone/${phoneNumber}`;
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
    this.myClient.next(this.myList);

    // Combina datos de cliente y producto en un solo objeto JSON
    
    
  }
  

  // Método para agregar datos de producto
  addProduct(product: Product) {
    if (this.myList.length === 0) {
      console.error('No hay datos del cliente. Agrega información del cliente antes de agregar productos.');
      return;
    }
  
    if (this.myList1.length === 0) {
      product.cantidad = 1;
      this.myList1.push(product);
    } else {
      const productMod = this.myList1.find((element) => element.id === product.id);
  
      if (productMod) {
        productMod.cantidad += 1;
      } else {
        product.cantidad = 1;
        this.myList1.push(product);
      }
    }
  
    // Combina datos de cliente y producto en un solo objeto JSON
    this.orderData = {
      cliente: this.myList[0],
      productos: this.myList1.map((p: Product) => {
        return {
          producto: {
            nombre: p.post_title,
            sku: p.sku,
          },
          detalle_producto: 'Detalle del producto', // Puedes personalizar esto
          cantidad: p.cantidad,
          precio: p.price,

        };
      }),
    };
    console.log(this.orderData);
  
    // Emito la lista después de agregar o modificar el producto
    this.myCart.next(this.myList1);
  }
  

  submitOrder() {
    const pedidoData = {
      pedido: 'SM-0000',
      fecha_pedido: '2023-12-12',
      tienda_id: 1,
      metodo_pago_id: 1,
      auth: 'authorization_code',
      monto_total: 55.00, // Debes calcular el monto total
      observaciones: 'Observaciones del pedido',
      detalle: this.orderData.productos,
    };

    // Combinar datos de pedido con información del cliente
    const dataToSend = {
      ...pedidoData,
      cliente: {
        nombre: this.orderData.cliente.Nombre,
        correo: this.orderData.cliente.email,
        telefono: this.orderData.cliente.Numero,
        direccion: this.orderData.cliente.Direccion,
      },
    };

    // Enviar la solicitud POST al API
    this.http.post('https://webtrack.sanmartinbakery.com/api/store-pedido', dataToSend).subscribe(
      (response) => {
        console.log('Pedido enviado con éxito:', response);
        // Puedes realizar otras acciones después de enviar el pedido
      },
      (error) => {
        console.error('Error al enviar el pedido:', error);
        // Manejar errores aquí
      }
      
    );
    console.log('Datos del cliente:', dataToSend);
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


