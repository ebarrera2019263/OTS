import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  phoneNumber: string = '';  // Inicializando con un valor por defecto
  responseData: any;
  products: Address[] = [];

  constructor(private apiService: ApiService,  private router: Router,) {}

  


  onSubmit() {
    this.apiService.getPhoneInfo(this.phoneNumber).subscribe(
      (data) => {
        this.responseData = data;
      },
      (error) => {
        console.error('Error al llamar a la API:', error);
      }
    );
  }

  addToClient(product: Address) {
    this.router.navigate(['/products']);
    return this.apiService.addClient(product);
    
  }



  }


 


  

  







  


  
  
  

  




