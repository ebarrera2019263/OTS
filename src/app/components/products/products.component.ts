import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HeaderComponent } from '../header/header.component';

import { ActivatedRoute } from '@angular/router';

import { Product } from 'src/app/models/product.model';
import { NgToastComponent } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/notification.service';
import { flyInOut } from 'src/app/animations/fly-in-out.animation';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [flyInOut],

})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  public page = 0;
  filteredProducts: Product[] = [];


  searchTerm: string = '';

  search: string = '';

  selectedCategory: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 8;
  showTooltip = false;
  isNotificationVisible: boolean = false;
  datosCombinados: any[] = [];




  constructor(private http: HttpClient, private productService: ApiService,
    private notificationService: NotificationService,
     private toastr: ToastrService, private router: Router,
    private route: ActivatedRoute,private httpClient: HttpClient ) {}

    ngOnInit(): void {
      // Subscribe to the getProducts method with the dynamically set tiendaId
      this.productService.getProducts().subscribe((data: any) => {
        this.products = data.body;
        this.showNotification();

        // Opcional: Puedes cerrar la notificación automáticamente después de 5000 ms (5 segundos)
        timer(5000).pipe(take(1)).subscribe(() => {
          this.closeNotification();
        });
      });
    }


  showNotification(): void {
    this.isNotificationVisible = true;
  }

  closeNotification(): void {
    this.isNotificationVisible = false;
  }





  nextPage() {
    this.page += 8;
  }

  prevPage() {
    if(this.page > 0) {
      this.page -= 8;
    }
  }

  onSearchProducts(search: string){
    this.search = search;

  }







  updateFilteredProducts(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredProducts = this.getFilteredProducts().slice(start, end);
  }


  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateFilteredProducts();
  }

  getTotalPages(): number {
    return Math.ceil(this.getFilteredProducts().length / this.itemsPerPage);
  }




  filterByCategory(category: string) {
    this.selectedCategory = category.toLowerCase();
    console.log(category);
  }

  clearCategoryFilter() {
    this.selectedCategory = '';
  }





  addToCart(product: Product) {
    this.productService.addProduct(product);

    setTimeout(() => {
      this.toastr.success( 'correctamente','Productos añadidos al carrito ', {
        timeOut: 2000, // Tiempo en milisegundos
        closeButton: true // Habilita el botón de cierre
      });
    }, 1000);

    // Asigna el array de productos
  }






  onSearch() {
    // Puedes realizar acciones adicionales si es necesario al enviar el formulario de búsqueda

    console.log('Search term:', this.searchTerm);
  }




  getFilteredProducts(): Product[] {
    const searchTermLower = this.searchTerm.toLowerCase();
    const selectedCategoryLower = this.selectedCategory.trim().toLowerCase();

    const filteredProducts = this.products.filter(product =>
      (product.post_title.toLowerCase().includes(searchTermLower) ||
      product.sku.toLowerCase().includes(searchTermLower)) &&
      (selectedCategoryLower === '' || product.categories.split(',').map(cat => cat.trim().toLowerCase()).includes(selectedCategoryLower)) &&
      product.available === 1
    );

    return filteredProducts;
  }



  viewDetail(product: any) {
    const tiendaId = product.tiendaId;
    const productId = product.id;

    // Navigate to the detail product component while sending the tiendaId and productId to the API service
    this.router.navigate(['/products/detail', tiendaId, productId]);
  }


 // products.component.ts

 onClickProduct(idTienda: string, productId: string): void {
  console.log('Hacer algo con idTienda y productId:', idTienda, productId);

  // Redirige al componente de detalle con los parámetros en la URL
  this.router.navigate(['/detail', idTienda, productId]);
}










































}











