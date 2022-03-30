import { Injectable, Type } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {

  public rol: any[];

  constructor(
    private cookie: CookieService,
    private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRole(route);
  }

  //TODO FUNCIONAR PARA OBTENER ROL DE USUARIO LOGUA
  checkRole(route: ActivatedRouteSnapshot): boolean {
    try {

      const token = this.cookie.get('token');
      const tokenInfo = this.getDecodedAccessToken(token);
      const role = tokenInfo.role;

      const scope = role;



      if (route.data.role.includes(scope)) {
        console.log('Authorize');
        return true
      } else {

        this.router.navigate(['/', '**'])
        console.log('No Authorize');
        return false
      }
    } catch (error) {
      return false
    }
  }

  //TODO FUNCION PARA DECODIFICAR JWT
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
