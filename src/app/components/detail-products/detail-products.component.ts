import { SharedService } from 'src/app/shared.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetProducts } from 'src/app/models/products.model';
import { ProductStock } from 'src/app/models/stock.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detail-products',
  templateUrl: './detail-products.component.html',
  styleUrls: ['./detail-products.component.css']
})
export class DetailProductsComponent {

  checkboxState: boolean[][] = [];
  idTienda!: string;

  products: GetProducts[] = [];
  selectedOptions: any[] = [];
  selectedProducts: any[] = [];

  stock: ProductStock[] = [];
  body: Body  [] = [];

  constructor(private SharedService: SharedService,private apiservice: ApiService,  private router: Router, private route: ActivatedRoute) { }

  public productData: any;
  public productDataImg: any;
  public Presentations: any;
  public Price: any;
  public productPrice: any;

  public presentationname:any;

  productId: string = '';







  ngOnInit(): void {
    // Recupera los parámetros de la URL
    this.route.params.subscribe((params) => {
      this.idTienda = params['idTienda'];
      this.productId = params['productId'];

      // Llama al servicio para obtener los detalles del producto
      this.apiservice.getDetailProducts(this.idTienda, this.productId).subscribe((data) => {
        // Hacer lo que necesites con los detalles del producto en este componente
        console.log('ID de Tienda:', this.idTienda);
        console.log('ID de Producto:', this.productId);
        console.log(data);
        this.productData = data.body.contents.name_es;

        this.productDataImg = data.body.images;
        this.Presentations = data.body.presentations;
        this.presentationname = this.Presentations[0].name;

        this.Price = data.body.prices;
        this.productPrice = this.Price[0].pirce;

        // Inicializa this.checkboxState según la cantidad de presentaciones y productos
        this.checkboxState = Array.from({ length: this.Presentations.length }, () =>
        Array(this.productData.length).fill(false)
      );



      this.products = data;
      console.log('Datos de productos obtenidos:', this.products);

      });
    });
  }







// detail-products.component.ts
guardarYMostrar(): void {
  // Limpiar el array antes de agregar nuevas selecciones
  this.selectedOptions = [];

  for (let j = 0; j < this.checkboxState.length; j++) {
    const selectedProduct = this.Presentations[j].name;

    for (let i = 0; i < this.checkboxState[j].length; i++) {
      if (this.checkboxState[j][i]) {
        // Agregar cada opción seleccionada al array
        this.selectedOptions.push({
          productName: selectedProduct,
          optionName: this.Presentations[j].presentation[i].name
        });
      }
    }
  }

  // Agregar las opciones seleccionadas al servicio compartido
  this.SharedService.selectedOptions = this.selectedOptions;

  // Navegar a la página del carrito
  this.router.navigate(['/products']);
}










}
