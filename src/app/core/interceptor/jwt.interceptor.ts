import { Injectable } from '@angular/core';
import {  HttpRequest,  HttpHandler, HttpEvent,  HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user-service.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
public static api = environment.api
  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let event: HttpRequest<any>;
    const data = this.userService.userValue;
    if (data) {
      const json = data;
      const token = json.token;
    
      event = request.clone({
        url: JwtInterceptor.api + request.url,
        setHeaders: {
          // 'token': data,
        },
      });
    }else{
      event = request.clone({
        url: JwtInterceptor.api + request.url,
      })
    }
    
    return next.handle(event);
  }
}