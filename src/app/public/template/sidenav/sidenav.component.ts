import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Product } from 'src/app/modules/product/models/product.model';

export class Category {
  name: string;
};
export class Brand {
  brand: string;
};

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})


export class SidenavComponent implements OnInit {
  
categories: Category[] = [];
id: any

  constructor(private api: ApiService, private route: ActivatedRoute ) { 
    
  }

  ngOnInit(): void {
    
    this.getItems();
  }

getItems(){
  this.api.sendGet('get-categories').subscribe((res:any) => {
    this.categories = res.data;
  }, error => {
    console.log('algo salio mal', error)
  })
}

}
