import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], searchTerm: string): Product[] {
    if (!products || !searchTerm) {
      return products;
    }

    searchTerm = searchTerm.toLowerCase();

    const filteredProducts = products.filter(product =>
      product.post_title.toLowerCase() === searchTerm
    );

    console.log('Filtered products:', filteredProducts);

    return filteredProducts;
  }
}
