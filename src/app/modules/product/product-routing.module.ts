import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreationComponent } from './product-creation/product-creation.component';
import { ProductImagesComponent } from './product-images/product-images.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'product-list', component: ProductListComponent },
    { path: 'product-creation', component: ProductCreationComponent },
    { path: 'product-creation/:id', component: ProductCreationComponent },
    { path: 'show-product/:id', component: ProductImagesComponent},
    
    
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
