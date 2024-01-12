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
  departamentos: string[] = ['Mixco', 'Villa Nueva' ];
  selectedDepartamento: string = '';
  tiendas: { id: number; nombre: string }[] = [
    { id: 28, nombre: 'San Martín San Cristobal Mixco' },
    { id: 5, nombre: 'San Martín Zona 14' },
    { id: 5, nombre: 'San Martín Majadas' },
    { id: 5, nombre: 'San Martín Plaza Central' },
    { id: 5, nombre: 'San Martín Xela Minerva' },
    { id: 5, nombre: 'San Martín Pradera Xela' },
    { id: 5, nombre: 'San Martín Vista Hermosa' },
    { id: 5, nombre: 'San Martín Antigua Guatemala' },
    { id: 5, nombre: 'San Martín Centro Historico' },
    { id: 5, nombre: 'San Martín Naranjomall' },
    { id: 5, nombre: 'San Martín Zona 4' },
    { id: 5, nombre: 'San Martín Metrocentro Villanueva' },
    { id: 5, nombre: 'San Martín Escala Carretera' },
    { id: 5, nombre: 'San Martín Plaza Madero' },
    { id: 5, nombre: 'San Martín Zona 10' },
    { id: 5, nombre: 'San Martín Cascata' },
    { id: 5, nombre: 'San Martín Amatitlan' }, 
  ];
  selectedTienda: number | null = null;



  paises: string[] = ['Guatemala', 'El Salvador', ];
selectedPais: string = '';





  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  enviarDatos() {
    const apiUrl = 'http://127.0.0.1:8000/api/v1/direcciones';

    
    const dataToSend = {
      ...this.formData,
      id_tienda: this.selectedTienda,
    };

    
    this.http.post(apiUrl, dataToSend).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
      },
      (error) => {
        console.error('Error al enviar los datos:', error);
        console.error('Cuerpo del error:', error.error);
      }
    );

    
    this.router.navigate(['/address']);
  }
}