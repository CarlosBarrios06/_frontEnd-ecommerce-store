import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { ProductCreationComponent } from './product-creation/product-creation.component';
import { ProductImagesComponent } from './product-images/product-images.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard] },
    { path: 'product-creation', component: ProductCreationComponent, canActivate: [AuthGuard]},
    { path: 'product-creation/:id', component: ProductCreationComponent, canActivate: [AuthGuard] },
    { path: 'show-product/:id', component: ProductImagesComponent},
    
    
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
