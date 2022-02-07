import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './public/template/header/header.component';
import { FooterComponent } from './public/template/footer/footer.component';
import { NavbarComponent } from './public/template/navbar/navbar.component';
import { NotFoundComponent } from './public/errors/not-found/not-found.component';
import { HomeComponent } from './public/general/home/home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SidenavComponent } from './public/template/sidenav/sidenav.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { JwtInterceptor } from './core/interceptor/jwt.interceptor';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { SharedModule } from './shared/shared.module';
import { SortPipe } from './shared/pipes/sort.pipe';







@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    NotFoundComponent,
    HomeComponent,
    SidenavComponent,
    FilterPipe,
    SortPipe,
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot({timeOut: 4000, preventDuplicates: true}),
    ModalModule.forRoot(),
    BsDropdownModule,
    SharedModule,
    

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
