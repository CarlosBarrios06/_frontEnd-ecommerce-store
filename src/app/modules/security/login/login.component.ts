import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user-service.service';
import { User } from 'src/app/shared/Models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { EncryptPassword } from 'src/app/shared/helpers/encryptPassword';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  users: User[] = [];
  loginForm: FormGroup;
  loginSubscription: Subscription;

  constructor(
    private lf: FormBuilder,
    private router: Router,
    private notification: ToastrService,
    private userSrvc: UserService,
    private spinner: NgxSpinnerService
  ) {
    const user = localStorage.getItem('user');
    if (user) {
      this.router.navigate(['/']);
    }
  }
  ngOnDestroy(): void {
    this.loginSubscription && this.loginSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loginForm = this.lf.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  searchUser() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loginSubscription = this.userSrvc
      .login(
        this.loginForm.get('email')?.value,
        EncryptPassword(this.loginForm.get('password')?.value)
      )
      .subscribe(
        (res) => {
          console.log(res)
          if (res) {
            this.spinner.hide();
            this.loginForm.reset();
          }
          if (res === false) {
            this.notification.error('Password or Email invalid');
            console.log('algo salio mal');
          } else {
            this.notification.success('Wellcome ' + res[0].name);
            this.router.navigate(['/']);
          }
        },
        (error) => {
          this.notification.error('Login could not be completed');
          console.log('algo salio mal', error);
          this.spinner.hide();
        }
      );
  }
}
