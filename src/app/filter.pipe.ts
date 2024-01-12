import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './models/product.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: Product[], page: number = 0, search: string = ''): Product[] {

    if (search.length === 0) 
      return products.slice(page, page + 8);

    const filteredProducts = products.filter(prod => 
      prod.post_title.toLowerCase().includes(search.toLowerCase()) || 
      prod.sku.toLowerCase().includes(search.toLowerCase())
    );

    return filteredProducts;
  }

}
