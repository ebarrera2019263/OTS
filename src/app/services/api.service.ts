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
    const combinedData = { cliente: clientData, productos: this.myList1 };
    console.log(combinedData);
    
  }

  // Método para agregar datos de producto
  addProduct(productData: any) {
    this.myList1.push(productData);
    this.myCart.next(this.myList1);

    // Combina datos de cliente y producto en un solo objeto JSON
    const combinedData = { cliente: this.myList[0], productos: this.myList1 };
    console.log(combinedData);
  }


  postData(data: any): Observable<any> {
    const url = `${this.apiPHP}/tu-ruta-endpoint-laravel`;
    return this.http.post(url, data);
  }


}


