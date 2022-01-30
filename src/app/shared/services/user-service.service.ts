import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  public admin: Observable<any>;

  constructor(private router: Router) {
    this.userSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();    
  }

public get userValue(): any {
  return this.userSubject.value;
};

public setUser(user:any): any {
  if(user){
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  this.userSubject.next(user);
};


}
