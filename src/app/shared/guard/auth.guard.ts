import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  

  constructor(
    public authService: AuthService,
    public router: Router
  ){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isLoggedIn!==true) {
        window.alert("Please log-in")
        this.router.navigate(['/login'])
      }
    return true;
  }
  // const currentUser = this.authService.currentUserValue;
  //       if (currentUser: { role: any; }) {
  //           // check if route is restricted by role
  //           if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
  //               // role not authorised so redirect to home page
  //               this.router.navigate(['/']);
  //               return false;
  //           }

  //           // authorised so return true
  //           return true;
  //       }

  //       // not logged in so redirect to login page with the return url
  //       this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  //       return false;
    
}