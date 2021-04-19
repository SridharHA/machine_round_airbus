import {Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { SharedServiceService } from '../shared-service.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private loaderService: SharedServiceService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        this.loaderService.loaderEmitter.next(true);
        return next.handle(req).pipe(finalize(() => {
            this.loaderService.loaderEmitter.next(false);
        }));
    }
  

}
