import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { UserService } from 'src/app/core/services/user-service.service';
import { EncryptPassword } from 'src/app/shared/helpers/encryptPassword';
import { SubscriptionsContainer } from 'src/app/shared/helpers/subscriptions-container';
import { User } from 'src/app/shared/Models/user.model';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  form: FormGroup;
  user: User;
  subs = new SubscriptionsContainer();
  constructor(
    private api: ApiService,
    private formB: FormBuilder,
    private userSrvc: UserService,
    private router: Router,
    private notification: ToastrService
  ) {
    this.form = this.formB.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnDestroy(): void {
    this.subs.dispose();
  }

  ngOnInit(): void {}

  getInfo() {
    const info = {
      email: this.form.get('email').value,
      password: EncryptPassword(this.form.get('password').value),
    };
    this.subs.add = this.userSrvc
      .verifyPassword(info.email, info.password)
      .subscribe(
        (res: User) => {
          if (res) {
            this.user = res[0];
            this.form.reset();
            this.notification.success(
              'Your password and email has been verified'
            );
          }
        },
        (error) => {
          this.notification.error('Error', error);
          console.log(error);
        }
      );
  }
}
