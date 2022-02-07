import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user-service.service';
import { Product } from 'src/app/shared/Models/product.interface';
import { Comment } from 'src/app/shared/Models/coment.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubscriptionsContainer } from 'src/app/shared/helpers/subscriptions-container';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 8000, noPause: true, showIndicators: true } }
  ]
})

export class ProductImagesComponent implements OnInit, OnDestroy {
  product: Product
  id: string;
  discount: any;
  productPrice: number;
  comments: Comment[] = [];
  female: string;
  male: string;
  form: FormGroup;
  p: number;
  admin: boolean;
  subs = new SubscriptionsContainer();
  
  

  constructor(private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private notification: ToastrService,
    private fb: FormBuilder,
    private userSrvc: UserService,
    private spinner: NgxSpinnerService,
  ) {
    this.form = this.fb.group({
      comment: ['', Validators.required],
      genre: ['', Validators.required],
      name: ['', Validators.required],
      productId: ['']
    })
  }
  ngOnDestroy(): void {
    this.subs.dispose();
  }

  ngOnInit(): void {
    //get product to edition
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = param.get('id')
    });
    
    if (this.id) {
      this.getProduct(this.id);
    };
    //load comments
    this.getComment();

    //authorization to delete comments
    const user = this.userSrvc.userValue;
    if (user) {     
      if (user._a <= 0) {        
        this.admin = false;
      }
      if (user._a === 1) {        
        this.admin = true;
      }
    }
    //spinner
    this.spinner.show();
    
  }

  getProduct(id: string) {
    this.subs.add = this.api.sendGet('get-product/' + id).subscribe((res: any) => {      
      this.product = res;
      let DISCOUNT = (res.discount / res.price);      
      this.discount = DISCOUNT;
      this.productPrice = res.price - res.discount;

    },
      err => {
        alert(err)
      });
  };

  comment() {
    const comment: Comment = {
      comment: this.form.get('comment')?.value,
      genre: this.form.get('genre')?.value,
      name: this.form.get('name')?.value,
      productId: this.id
    };

    this.subs.add = this.api.sendPost('post-comment/', comment).subscribe(res => {
      this.form.reset()
      this.notification.success('Comment loaded successfully')
      this.getComment();
    }, error => {
      this.notification.error('Error','Comment no loaded')
    }
    )
    
  };

  getComment() {
    this.subs.add = this.api.sendGet('get-comment-by-product-id/' + this.id).subscribe((res: any) => {
      if(res){
        let order = res.data.sort((a,b) =>(a.createdAt > b.createdAt)? -1 : 1);
        this.spinner.hide();
        this.comments = order       
      }else{
        this.comments = res.data;   
        this.spinner.hide();    
      }
      this.comments = res.data; 
    }, error => {
      this.notification.error('Comment no Loaded', error)
    })
  };

  deleteComent(id) {
    if (this.admin) {
      this.subs.add = this.api.sendDelete('delete-comment/' + id).subscribe(res => {
        this.notification.success('Comment Deleted Successfully')
        this.getComment();
      }, error => {
        this.notification.error('error', error);
        console.log(error);
      })
    }
  };

}

