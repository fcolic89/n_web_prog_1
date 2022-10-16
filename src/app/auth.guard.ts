import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  token: string | undefined | null = '';

  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.token = localStorage.getItem("token")?.toString();

    if(this.token == null || this.token == ''){
      alert("You must enter a token before accessing the rest of the functions!");
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
