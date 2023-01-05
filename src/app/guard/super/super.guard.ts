import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { EncapService } from 'src/app/service/encap/encap.service';

@Injectable({
  providedIn: 'root'
})
export class SuperGuard implements CanActivate {
  constructor(private es: EncapService){}
  user = false
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.es.decrypt(localStorage.getItem('usr_role_id')) != 'SA'){
      this.user = false
    }
    else{
      this.user = true
    }
    return this.user
  }
 
}
