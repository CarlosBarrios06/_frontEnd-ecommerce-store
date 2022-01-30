import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { LoginModel } from './models/login.model';
import { UserService } from 'src/app/shared/services/user-service.service';
import { EmitterService } from 'src/app/shared/services/emitter.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: any = []
  loginForm: FormGroup;

  constructor(private lf: FormBuilder, 
    private api: ApiService, 
    private router: Router, 
    private notification: ToastrService,
    private userSrvc: UserService,
    private emitter: EmitterService) {
    const user = localStorage.getItem('user')
    if(user){
      this.router.navigate(['/'])
    }

  }

  ngOnInit(): void {
    this.loginForm = this.lf.group({
     
      email: ['', Validators.required],
      password: ['', Validators.required],
      
    })
    
  }

  searchUser() {
    if(this.loginForm.invalid){
      return;
    }
    const USER: LoginModel = {
      
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      
    };
      console.log(USER);
      this.api.sendPost('login/',USER).subscribe((res:any) => {
        console.log(res);
        this.emitter.getIdentification.emit(res[0].password);
        if(Object.keys(res[0]).length > 0 ){
          this.loginForm.reset();
          localStorage.setItem('user',JSON.stringify(res))
          this.userSrvc.setUser(res);
          this.notification.success("Wellcome "+ res[0].name)
        }else{
          this.notification.error("Password or Email invalid")
        console.log('algo salio mal')
        
        } 
        this.router.navigate(['/'])
      }, error => {
        this.notification.error("Password or Email invalid")
        console.log('algo salio mal')
        
        
      })



  }

};
