import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { Product } from '../models/product.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user-service.service';

export class Coment {
  coment: string;
  genre: string;
  name: string;
  productId: string;
  createdAt?: number;
  id?: string;
};

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 8000, noPause: true, showIndicators: true } }
  ]
})

export class ProductImagesComponent implements OnInit {
  product: Product
  id: any;
  discount: any;
  productPrice: any;
  comentaries: Coment[] = [];
  female: string;
  male: string;
  form: FormGroup;
  p: number;
  admin: any;

  constructor(private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private notification: ToastrService,
    private fb: FormBuilder,
    private userSrvc: UserService,
  ) {
    this.form = this.fb.group({
      coment: ['', Validators.required],
      genre: ['', Validators.required],
      name: ['', Validators.required],
      productId: ['']
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = param.get('id')
    });

    if (this.id) {
      this.getProduct(this.id);
    };

    this.getComent();

    this.userSrvc.user.subscribe((x) => {  
      if(x[0].password === '1234'){
        this.admin = x;
      }
    });

  }




  getProduct(id: string) {
    this.api.sendGet('get-product/' + id).subscribe((res: any) => {      
      this.product = res;
      let DISCOUNT = (res.discount / res.price);      
      this.discount = DISCOUNT;
      this.productPrice = res.price - res.discount;

    },
      err => {
        alert(err)
      });
  };

  coment() {
    const coment: Coment = {
      coment: this.form.get('coment')?.value,
      genre: this.form.get('genre')?.value,
      name: this.form.get('name')?.value,
      productId: this.id
    };

    this.api.sendPost('post-coment/', coment).subscribe(res => {
      this.form.reset()
      this.notification.success('Coment loaded succefully')
    }, error => {
      this.notification.error('Error','Coment no loaded')
    }
    )
    this.getComent();


  };

  getComent() {
    this.api.sendGet('get-coment-by-product-id/' + this.id).subscribe((res: any) => {

      this.comentaries = res.data
      
    }, error => {
      this.notification.error('Coment no Loaded', error)
    })
  };

  deleteComent(id) {
    if (this.admin) {
      this.api.sendDelete('delete-coment/' + id).subscribe(res => {
        this.notification.success('Coment Deleted Succefully')
        this.getComent();
      }, error => {
        this.notification.error('error', error);
        console.log(error);
      })
    }
  };

}

