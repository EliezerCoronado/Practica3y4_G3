import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports:[RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crear el componente header', () => {
    expect(component).toBeTruthy();
  });

  it('Debe navegar al /login', () => {
    const routerstub: Router = TestBed.get(Router);
    spyOn(routerstub, 'navigate');
    component.salir();
    expect(routerstub.navigate).toHaveBeenCalledWith(["/login"]);
  });

});
