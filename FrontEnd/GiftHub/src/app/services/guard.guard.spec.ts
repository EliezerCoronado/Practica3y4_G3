import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GuardGuard } from './guard.guard';

describe('GuardGuard', () => {
  let guard: GuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,RouterTestingModule.withRoutes([])]
    });
    guard = TestBed.inject(GuardGuard);
  });

  it('Debe crear el servicio guard', () => {
    expect(guard).toBeTruthy();
  });



  it('Debe de llamar al servicio de login', () => {
    
    const espia = spyOn(guard.service,'estaLogueado').and.callThrough();
    guard.canActivate();
    expect(espia).toHaveBeenCalled();
  });



});
