import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
products: Product[] = [];
p: number = 1;
loading: boolean = false;
  constructor(private api: ApiService, private notification: ToastrService) { }

  ngOnInit(): void {   
   this.loadData();
  }


  deleteProduct(id: any) {

    console.log(id)
    this.api.sendDelete('delete-product/'+id)
      .subscribe(res => {
        this.notification.warning("product deleted succefull");
        this.api.sendGet('get-products')
        this.loadData()
      }, error => {
        this.notification.warning('error to delete product')
      })
      this.api.sendDelete('delete-coments/'+id).subscribe(res => {
        console.log(res)
      })
  }

  loadData(){
    this.api.sendGet('get-products').subscribe((res:any) => {
      this.products = res.data;
    }, error => {
      console.log('algo salio mal', error)
    })
  }

}
