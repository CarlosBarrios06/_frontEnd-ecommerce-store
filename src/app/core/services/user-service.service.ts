import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/Models/user.model';
import { DecryptPassword} from 'src/app/shared/helpers/encryptPassword'; 
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  private adminSubject: BehaviorSubject<any>;
  public adminRegister: Observable<any>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();   
    
    // For reset register form
    this.adminSubject = new BehaviorSubject<any>(false);
    this.adminRegister = this.adminSubject.asObservable(); 
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
setAdminRegister(value: boolean) {
  this.adminSubject.next(value);
}
 // Sign In
 login(email: string, password?: string) {
  return this.http.post<any>('login/', { email, password }).pipe(
    map((user) => {
      if (Object.keys(user).length > 0) {
        // If normal login (password)
        if (password) {
          let veriyPass = DecryptPassword(user[0].password, password);
          if (veriyPass) {
            let userSession: User = {
              id: user[0].id,
              name: user[0].name,
              email: user[0].email,
              createdAt: new Date(user[0].createdAt),
              _a: user[0].role === 'Admin' ? 1 : 0,
              
            };

            localStorage.setItem('user', JSON.stringify(userSession));
            this.userSubject.next(userSession);
            return user;
          }
        } 
      } else {
        return false;
      }
    })
  );
}

// Register
register(userData: User) {
  return this.http.post<any>('create-user', userData).pipe(
    map((user) => {
      if (Object.keys(user).length > 0) {
        let userSession: User = {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: new Date(user.createdAt),         
          _a: user.role === 'Admin' ? 1 : 0,
          
        };

        // localStorage.setItem('user', JSON.stringify(userSession));
        // this.userSubject.next(userSession);
        return user;
      } else {
        return false;
      }
    })
  );
}

verifyPassword(email: string, password?: string) {
  return this.http.post<any>('verify-password/', { email, password }).pipe(
    map((user) => {
      if (Object.keys(user).length > 0) {
        // If normal login (password)
        if (password) {
          let veriyPass = DecryptPassword(user[0].password, password);
          if (veriyPass) {
           
            return user;
          }
        } 
      } else {
        return false;
      }
    })
  );
}

}
