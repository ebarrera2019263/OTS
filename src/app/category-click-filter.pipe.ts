import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryClickFilter',
})
export class CategoryClickFilterPipe implements PipeTransform {
  transform(products: any[], selectedCategory: string): any[] {
    if (!products || !selectedCategory) {
      return products;
    }

    return products.filter(
      (product) =>
        product.categories.toLowerCase() === selectedCategory.toLowerCase() &&
        product.available === 1
    );
  }
}
