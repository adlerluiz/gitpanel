import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../providers/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private authService: AuthService, private router: Router ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if ( this.authService.isLogged() ) { return true; }

    // Navigate to the login page with extras
    this.router.navigate( ['/login'] );
    return false;
  }

}
