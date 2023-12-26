import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Pipe({
  name: 'categoryFilter',
})
export class CategoryFilterPipe implements PipeTransform {
  transform(products: Product[], selectedCategory: string): Product[] {
    if (!products || !selectedCategory) {
      return products;
    }

    return products.filter(
      (product) =>
        product.categories.toLowerCase().includes(selectedCategory.toLowerCase()) &&
        product.available === 1
    );
  }
}
