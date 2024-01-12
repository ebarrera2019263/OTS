import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { NgToastComponent } from 'ng-angular-popup';
import { HeaderMenuComponent } from '../header-menu/header-menu.component'; 

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  phoneNumber: string = '';  // Inicializando con un valor por defecto
  responseData: any;
  products: Address[] = [];
  isLoading: boolean = false;

  constructor(private apiService: ApiService,  private router: Router) {}

  

  onSubmit() {
    this.isLoading = true; // Activar carga
    this.apiService.getPhoneInfo(this.phoneNumber).subscribe(
      (data) => {
        this.responseData = data;
        this.isLoading = false; // Desactivar carga al recibir los datos
      },
      (error) => {
        console.error('Error al llamar a la API:', error);
        this.isLoading = false; // Desactivar carga en caso de error
      }
    );
  }
  
// Tu componente donde seleccionas un nuevo cliente
// ...

addToClient(selectedClient: Address) {
  this.apiService.addClient(selectedClient);
  console.log('Nuevo cliente seleccionado:', selectedClient);
  // Lógica adicional según sea necesario
  this.router.navigate(['/products']);
}


createClient(){
  
  this.router.navigate(['/add']);
}
// ...

  
  



  }


 


  

  







  


  
  
  

  




