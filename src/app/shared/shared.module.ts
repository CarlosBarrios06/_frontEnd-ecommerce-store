import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select/';
import{MatToolbarModule} from '@angular/material/toolbar';
import{MatPaginatorModule} from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule } from 'ngx-spinner';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    RouterModule,
    MatButtonModule,
    NgxSpinnerModule,
  ],
  exports: [
    ReactiveFormsModule,    
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
    RouterModule,
    MatButtonModule,
    NgxSpinnerModule,
  ]
})
export class SharedModule { }
