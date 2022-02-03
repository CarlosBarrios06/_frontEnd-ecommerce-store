import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { Product } from '../../../shared/Models/product.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubscriptionsContainer } from 'src/app/shared/helpers/subscriptions-container';
import { Img } from 'src/app/shared/Models/img.interface';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.scss']
})
export class ProductCreationComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  products: Product[] = [];
  id: string;
  title: string = 'Create Product';
  categories = [];
  imgs: Img[] = [];
  subs = new SubscriptionsContainer();

  constructor(private pf: FormBuilder, 
    private router: Router,
    private notification: ToastrService,
    private route: ActivatedRoute,
    private api: ApiService,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    ) {
    this.productForm = this.pf.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.max(40000)]],
      discount: ['', Validators.min(0)],
      details: ['', Validators.required],
      imgfront: ['', Validators.required],
      imgback: ['', Validators.required],
      imgright: ['', Validators.required],
      imgleft: [''],
    })
    this.id = this.route.snapshot.paramMap.get('id')!
    
  }
  ngOnDestroy(): void {
    this.subs.dispose();
  }

  ngOnInit(): void {
    this.isEdit();
    this.getCategory()
  }
  //base 64 extracter
  extract64Base = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result
        });
      };
    } catch (e) {
      return null;
    }
  })
  //conveter of image to string
  loadImage(event: any) {
    let files = event.target.files[0]
    this.extract64Base(files).then((img: Img) => {
      // this.preview = img.base;
      const file: Img = {
        base: img.base
      }
      this.imgs.push(file);
    }); 
  }


  addProduct() {
    const PRODUCT: Product = {
      name: this.productForm.get('name')?.value,
      brand: this.productForm.get('brand')?.value,
      category: this.productForm.get('category')?.value,
      price: this.productForm.get('price')?.value,
      discount: this.productForm.get('discount')?.value,
      details: this.productForm.get('details')?.value,
      imgfront: this.productForm.get('imgfront')?.value,
      imgback: this.productForm.get('imgback')?.value,
      imgright: this.productForm.get('imgright')?.value,
      imgleft: this.productForm.get('imgleft')?.value,

    };
    //add image string to the object
    PRODUCT.imgfront = this.imgs[0].base;
    PRODUCT.imgback = this.imgs[1].base;
    PRODUCT.imgright = this.imgs[2].base;
    PRODUCT.imgleft = this.imgs[3].base

    if (this.id !== null) {
      this.subs.add = this.api.sendPut(`update-product/${this.id}`, PRODUCT).subscribe(data => {
        this.spinner.show();
        if(data){
          this.spinner.hide();
        }
        this.notification.success("El producto ha sido editado con exito", "producto actualizado")
        this.router.navigate(['/'])
      }, error => {
        console.log('algo salio mal')
        this.productForm.reset();
      })
    } else {
      this.products.push(PRODUCT);
      this.subs.add = this.api.sendPost('create-product', PRODUCT).subscribe((res) => {
        this.spinner.show();
        if(res){
          this.spinner.hide();
        }
        this.productForm.reset();
        this.notification.success('Registro satisfactorio', 'producto añadido con exito!!!')
        this.router.navigate(['/product/product-list'])
      }, error => {
        console.log('algo salio mal')
        this.productForm.reset();
      })
    };
  };

  //Edit Mode
  isEdit() {

    if (this.id !== null) {
      this.title = 'Editar Producto';
      console.log(this.id)
      console.log(this.products)
     this.subs.add = this.api.sendGet(`get-product/${this.id}`).subscribe((res: Product) => {
        this.spinner.show();
        if(res){
          this.spinner.hide();
        }
        this.productForm.setValue({
          name: res.name,
          brand: res.brand,
          category: res.category,
          price: res.price,
          discount: res.discount,
          details: res.details,
          imgfront: res.imgfront,
          imgback: res.imgback,
          imgright: res.imgright,
          imgleft: res.imgleft,
        })
      })
    }
  };
  //get category from API
  getCategory() {
    this.subs.add = this.api.sendGet('get-categories').subscribe(res => {
      this.spinner.show();
      if(res){
        this.spinner.hide();
      }
      this.categories = res.data;
    }, error => {
      this.notification.error('algo ha salido mal')
    });
  }

}
