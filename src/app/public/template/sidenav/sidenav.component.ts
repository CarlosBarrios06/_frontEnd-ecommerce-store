import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { SubscriptionsContainer } from 'src/app/shared/helpers/subscriptions-container';
import { Category } from 'src/app/shared/Models/category.interface';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})


export class SidenavComponent implements OnInit, OnDestroy {  
categories: Category[] = [];
id: string;
subs = new SubscriptionsContainer();

  constructor(private api: ApiService, private route: ActivatedRoute ) { 
    
  }
  ngOnDestroy(): void {
    this.subs.dispose();
  }

  ngOnInit(): void {
    
    this.getItems();
  }

getItems(){
 this.subs.add = this.api.sendGet('get-categories').subscribe((res:any) => {
    this.categories = res.data;
  }, error => {
    console.log('algo salio mal', error)
  })
}

}
