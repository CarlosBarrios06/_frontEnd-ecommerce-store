import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { EmitterService } from './shared/services/emitter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ecomerceStore';
  @ViewChild('drawer') public drawer: MatSidenav
  constructor(private emitters: EmitterService){}
  ngOnInit(): void {
    this.emitters.showSidenav.subscribe((res: boolean) => {
      this.drawer.toggle();
    })
  }



}
