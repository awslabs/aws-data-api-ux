import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';
import { SecurityService } from '../app-services/security.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  constructor(
    private securityService: SecurityService,
    private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const identity = this.securityService.getIdentity();
    if (identity && identity.token) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + identity.token) });
    }

    return next.handle(req).pipe(
      map(data => {
        return data;
      }),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.securityService.logout();
            this.router.navigate(['/login']);
          }
        }

        return throwError(err);
      })
    );
  }
}
