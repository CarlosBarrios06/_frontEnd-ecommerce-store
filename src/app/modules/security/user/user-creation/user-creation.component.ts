import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { SubscriptionsContainer } from 'src/app/shared/helpers/subscriptions-container';
import { EncryptPassword } from 'src/app/shared/helpers/encryptPassword';
import { UserService } from 'src/app/core/services/user-service.service';
import { User } from 'src/app/shared/Models/user.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss'],
})
export class UserCreationComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  id: string;
  title: string = 'Create User';
  subs = new SubscriptionsContainer();
  user: User;
  admin:User;

  constructor(
    private api: ApiService,
    private router: Router,
    private notification: ToastrService,
    private uf: FormBuilder,
    private route: ActivatedRoute,
    private userSrvc: UserService
  ) {
    //Users Form
    this.userForm = this.uf.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', [Validators.required]],
    });

    this.id = this.route.snapshot.paramMap.get('id')!;
     const user = localStorage.getItem('user');
   
    if (user) {
      const USER = JSON.parse(localStorage.getItem('user')); 
      this.admin = USER;
      // if is loged and want to modify his/her user data and access by his/her id
      if (this.id === USER.id){
        return
      }else{
        // if he/she is loged and want to modify without using an id to enter or using another employee id
        this.router.navigate(['/']);
      }
      
    };
  }
  ngOnDestroy(): void {
    this.subs.dispose();
  }

  ngOnInit(): void {
    this.isEdit();
  }

  addUser() { 
    
      //to edit and add normal register
      if (this.userForm.get('password')?.value === this.userForm.get('repeatPassword')?.value) {
        const USER: User = {
          name: this.userForm.get('name')?.value,
          email: this.userForm.get('email')?.value,
          password: EncryptPassword(this.userForm.get('password')?.value),
        };
        this.user = USER;
      }

    if (this.id !== null) {
      //edit User data
      this.subs.add = this.api.sendPut(`update-user/${this.id}`, this.user).subscribe(
        (res: any) => {
          if (Object.keys(res).length > 0) {
            const userSession = {
              id: res[0].id,
              name: res[0].name,
              email: res[0].email,             
              createdAt: new Date(res[0].createdAt),
              _a: res[0].role === 'Admin' ? 1 : 0,
            };
  
            this.userSrvc.setUser(userSession);
            this.notification.success('Your profile has been updated successfully');
            this.user = this.userSrvc.userValue;
            this.userForm.reset();
            this.userSrvc.logOut()
              this.router.navigate(['security/login']);
            
          }
        },
        (error) => {
          this.notification.error('Error', 'User no Updated', error);
            console.log('algo salio mal');
        },
        
      );
    } else {
      //normal register
      this.user.role = 'User';
      this.subs.add = this.userSrvc.register(this.user).subscribe(
        (res) => {
          this.notification.success(
            'Registro satisfactorio',
            'usuario añadido con exito!!!'
          );
          this.userForm.reset();
          this.router.navigate(['security/login']);
        },
        (error) => {
          console.log('algo salio mal', error);
        }
      );
    }
  }

  isEdit() {
    if (this.id !== null) {
      this.title = 'Edit User';
      this.subs.add = this.api.sendGet(`get-user/${this.id}`).subscribe(
        (res: any) => {
          this.userForm.setValue({
            name: res.name,
            email: res.email,
            password: res.password,
            repeatPassword: 0,
          });
        },
        (error) => {
          this.notification.error('error', error);
          console.log(error);
        }
      );
     
    }
  }
}
