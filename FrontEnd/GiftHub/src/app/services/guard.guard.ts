import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { GiftcardsService } from './giftcards.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private router: Router,
              private service: GiftcardsService,

              ){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      console.log('paso por el guard');
      if(this.service.estaLogueado()){
        return true;
      }else{
        this.router.navigateByUrl('/login');
        return false;
      }
  }
  
}
