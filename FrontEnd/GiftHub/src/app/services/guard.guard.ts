import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { GiftcardsService } from './giftcards.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(public router: Router,
              public service: GiftcardsService,

              ){

  }
  canActivate() {
      if(this.service.estaLogueado()){
        return true;
      }else{
        this.router.navigateByUrl('/login');
        return false;
      }
  }
  
}
