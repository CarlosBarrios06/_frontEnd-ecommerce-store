import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  sendPost(endPoint: string, json: any):Observable<any>{
    return this.http.post(endPoint, json)
  }

  sendGet(endPoint: string):Observable<any>{
    return this.http.get<any>(endPoint)
  }

  sendPut(endPoint: string, json: any):Observable<any>{
    return this.http.put<any>(endPoint, json)
  }
  sendDelete(endPoint: string):Observable<any>{
    return this.http.delete<any>(endPoint)
  }


  // deleteProduct(id: any){
  //   return this.http.delete<any>(`${this.api}delete-product/`+id)
  // }

}
