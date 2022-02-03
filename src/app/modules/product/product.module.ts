import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductCreationComponent } from './product-creation/product-creation.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductImagesComponent } from './product-images/product-images.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProductCreationComponent,
    ProductListComponent,
    ProductImagesComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,   
    SharedModule, 
  ]
})
export class ProductModule { }
