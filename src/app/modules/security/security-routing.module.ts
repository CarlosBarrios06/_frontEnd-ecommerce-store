import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { UserCreationComponent } from './user/user-creation/user-creation.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AdminGuard } from 'src/app/shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'login', component: LoginComponent, },
      { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
      { path: 'user-creation', component: UserCreationComponent },
      { path: 'user-creation/:id', component: UserCreationComponent, canActivate: [AuthGuard], },
      { path: 'user-list', component: UserListComponent, canActivate: [AdminGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
