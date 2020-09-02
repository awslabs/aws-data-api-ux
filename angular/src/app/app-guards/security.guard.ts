import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SecurityService } from '../app-services/security.service';

@Injectable()
export class SecurityGuard implements CanActivate {

  constructor(
    private router: Router,
    private securityService: SecurityService
  ) { }

  canActivate() {
    const identity = this.securityService.getIdentity();
    if (identity && identity.token) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    // this.router.navigate(['/login']);
    // return false;

    return true;
  }
}
