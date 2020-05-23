import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate, CanLoad {

  canLoad(): Observable<boolean> | Promise<boolean> | boolean  {
    return  false;
  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean  {
    return false;
  }
}
