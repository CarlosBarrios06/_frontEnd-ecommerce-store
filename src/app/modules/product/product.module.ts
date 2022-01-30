import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductCreationComponent } from './product-creation/product-creation.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductImagesComponent } from './product-images/product-images.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule, MatSelectionList} from '@angular/material/list'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select/';
import{MatToolbarModule} from '@angular/material/toolbar';
import{MatPaginatorModule} from '@angular/material/paginator';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';



@NgModule({
  declarations: [
    ProductCreationComponent,
    ProductListComponent,
    ProductImagesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    HttpClientModule,
    MatIconModule,
    NgxPaginationModule,
    FormsModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    CarouselModule,
    TabsModule,
    
  ]
})
export class ProductModule { }
