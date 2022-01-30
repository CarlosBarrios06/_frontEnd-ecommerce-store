import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, search: string) {
    if (value.lenght === 0 || search === "") {
      return value;
    }
    const products = [];
    for (const product of value){
      // if(product.title.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1)
      if(product['name'] === search){
        products.push(product);
      }
    }
    return products;
  }
};
