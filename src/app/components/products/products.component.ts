import { Component, Input, OnInit } from '@angular/core';
import { ParamMap } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HeaderComponent } from '../header/header.component';

import { ActivatedRoute } from '@angular/router';

import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  searchTerm: string = '';

  selectedCategory: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 8;

  datosCombinados: any[] = [];
 

  

  constructor(private productService: ApiService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data.body; 
      console.log(data);// Asigna el array de productos
    });
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
    return this.productService.addProduct(product);
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



  
  

 


  
  
  


  
  
  





 
  




 
}
  
  

  
  






