import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/modules/product/models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 private api = `${environment.api}`

  constructor(private http: HttpClient) { }

  loadData():Observable <Category>{
    return this.http.get<Category>(`${this.api}get-categories`);
  }

  postCategory(data: Category){
    return this.http.post<any>(`${this.api}create-category`, data)
    
  }
}
