import { Component, OnInit } from '@angular/core';
import { EmitterService } from 'src/app/shared/services/emitter.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  isCollapse = false;
  session: boolean = false;
  ADMIN: any;
  loged: boolean;
  USER: any;
  constructor(
    private emitters: EmitterService,
    private router: Router,
    private userSrvc: UserService,
  ) {

    this.userSrvc.user.subscribe((x) => {
      this.USER = x;
    })


  }

  ngOnInit(): void {

  }

  toggleState() { // manejador del evento
    let foo = this.isCollapse;
    this.isCollapse = foo === false ? true : false;
  };

  toggleSidenav() {
    this.emitters.showSidenav.emit(true);
  };

  logout() {
    localStorage.removeItem('user');
    this.userSrvc.setUser(null)
    this.router.navigate(['/'])
  };


}
