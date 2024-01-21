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
  selectedProducts: any[] = [];

  stock: ProductStock[] = [];
  body: Body  [] = [];

  constructor(private apiservice: ApiService,  private router: Router, private route: ActivatedRoute) { }

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
        this.productPrice = this.Price[0].price;

        // Inicializa this.checkboxState según la cantidad de presentaciones y productos
        this.checkboxState = Array.from({ length: this.Presentations.length }, () =>
        Array(this.productData.length).fill(false)
      );



      this.products = data;
      console.log('Datos de productos obtenidos:', this.products);

      });
    });
  }







guardarYMostrar(): void {



  // Filtra las opciones seleccionadas
  const selectedOptions: any[] = [];
  const productName = this.productData;


  console.log('Datos de los Checkboxes seleccionados:');
  console.log(selectedOptions);
  this.router.navigate(['/cart']);// Definir productName fuera del bucle interno

  // Agregar el productName solo si hay opciones seleccionadas
  if (this.checkboxState.some(row => row.some(checked => checked))) {
    selectedOptions.push({
      optionName: 'Opciones ', // Puedes ajustar el nombre según tus necesidades
      productName: productName
    });
  }
  for (let j = 0; j < this.checkboxState.length; j++) {
    const selectedProduct = this.Presentations[j].name;

    for (let i = 0; i < this.checkboxState[j].length; i++) {
      if (this.checkboxState[j][i]) {
        // Agregar cada opción seleccionada al array
        selectedOptions.push({
          productName: selectedProduct,
          optionName: this.Presentations[j].presentation[i].name
        });
      }
    }
  }

  // Guarda las opciones seleccionadas en el carrito


  // Muestra las opciones seleccionadas, los nombres de los productos y otros datos relevantes
  console.log('Datos de los Checkboxes seleccionados:');
  console.log(selectedOptions);



 // this.router.navigate(['/cart']);
  // Resto del código...
}





}
