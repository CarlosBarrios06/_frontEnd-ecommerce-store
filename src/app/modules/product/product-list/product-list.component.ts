import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { SubscriptionsContainer } from 'src/app/shared/helpers/subscriptions-container';
import { Product } from '../../../shared/Models/product.interface';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  p: number = 1;
  loading: boolean = false;
  subs = new SubscriptionsContainer();

  constructor(
    private api: ApiService,
    private notification: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  
  ngOnDestroy(): void {
    this.subs.dispose();
  }

  ngOnInit(): void {
    this.loadData();
    this.spinner.show();
  }

  deleteProduct(id: any) {
    this.subs.add = this.api.sendDelete('delete-product/' + id).subscribe(
      (res) => {
        this.notification.success('product deleted successfully');
        this.api.sendGet('get-products');
        this.loadData();
      },
      (error) => {
        this.notification.error('error to delete product');
      }
    );
    this.api.sendDelete('delete-coments/' + id).subscribe((res) => {});
  }

  loadData() {
    this.subs.add = this.api.sendGet('get-products').subscribe(
      (res: any) => {
        if (res) {
          this.spinner.hide();
        }
        this.products = res.data;
      },
      (error) => {
        console.log('algo salio mal', error);
      }
    );
  }
}
