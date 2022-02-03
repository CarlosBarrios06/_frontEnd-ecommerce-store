import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserCreationComponent } from './user/user-creation/user-creation.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    ChangePasswordComponent,    
    UserCreationComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule, 
    SecurityRoutingModule,
    SharedModule,
  ]
})
export class SecurityModule { }
