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
  showImage: boolean = true;

  constructor(private apiService: ApiService,  private router: Router) {}


  onSubmit() {
    this.isLoading = true;
    this.apiService.getPhoneInfo(this.phoneNumber).subscribe(
      (data) => {
        this.responseData = data;
        this.isLoading = false;
        this.showImage = false;

        // Pass the id_tienda value to the service method
        this.apiService.getProductsByTiendaId(data.body[0].id_tienda);
      },
      (error) => {
        console.error('Error al llamar a la API:', error);
        this.isLoading = false;
      }
    );
  }
  addToClient(selectedClient: Address) {
    this.apiService.addClient(selectedClient);
    console.log('Nuevo cliente seleccionado:', selectedClient);
    // Pass the id_tienda to the service
    this.apiService.setTiendaId(selectedClient.id_tienda);
    this.router.navigate(['/products']);
  }




createClient(){

  this.router.navigate(['/add']);
}
// ...






  }



























