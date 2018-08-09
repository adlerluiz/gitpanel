import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../providers/auth.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor( private authService: AuthService, private router: Router ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const dupReq = req.clone({
      headers: req.headers.set( 'Authorization', 'Bearer ' + this.authService.getToken() ),
    });

    return next
      .handle( dupReq )
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
          // OK
          }
        }, error => {
          if ( error.status === 401 ) {
            console.log('Sem autorização');
            this.router.navigate( ['/login'] );
          }

        })
      );
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
  ],
})
export class Interceptor {}
