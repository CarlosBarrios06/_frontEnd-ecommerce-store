import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user-service.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private userSrvc: UserService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.userSrvc.userValue;
    if (user) {
      // check if route is restricted by role
      if (user._a <= 0) {
        // Role not authorised so redirect to home page
        this.router.navigate(['/home']);
        return false;
      }
      if (user._a === 1) {
        // Authorized so return true
        return true;
      }
    }
    // Not logged in so redirect to login page with the return url
    this.router.navigate(['security/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
