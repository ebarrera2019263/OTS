import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent {

  formData: any = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }


  enviarDatos() {
    console.log('Datos del formulario:', this.formData);
  
    const apiUrl = 'http://127.0.0.1:8000/api/v1/direcciones';
  
    this.http.post(apiUrl, this.formData)
      .subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
        },
        (error) => {
          console.error('Error al enviar los datos:', error);
          // Agregar esta línea para imprimir el cuerpo del error
          console.error('Cuerpo del error:', error.error);
        }
      );
      this.router.navigate(['/address']);
  }

 
  
}


