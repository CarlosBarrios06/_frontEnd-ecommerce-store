import { Injectable } from '@angular/core';
import { Product } from 'src/app/modules/product/models/product.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
private api= `${environment.api}`
  constructor(private http: HttpClient) { }

  loadData():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.api}get-products`);
  }

  postProducts(data: any){
    return this.http.post<any>(`${this.api}create-product`, data)
    
  }

  updateProduct(data: Product, id:string ):Observable<any>{
    return this.http.put<any>(`${this.api}update-product/`+id, data)
    
  }

  deleteProduct(id: any){
    return this.http.delete<any>(`${this.api}delete-product/`+id)
  }

getProduct(id: string): Observable<any>{
 return this.http.get(`${this.api}get-product/`+id);
}
getProductByName(name: string): Observable<any>{
  return this.http.get(`${this.api}product-by-name/`+name);
 }
 getProductByCategory(category: string): Observable<any>{
  return this.http.get(`${this.api}get-product-by-category/`+category);
 }

}
