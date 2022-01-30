import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


public loged: boolean = true;
  constructor() { 
    
  }

  login(){
    if(this.loged){
      return true
    }else{
      console.log('no estas autorizado')
      return false;
    }
    
  }
  
}
