import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GiftcardsService } from 'src/app/services/giftcards.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [ GiftcardsService ],
      imports: [FormsModule,ReactiveFormsModule,HttpClientModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente registro', () => {
    expect(component).toBeTruthy();
  });


  it('Debe retornar false por que las contrasenias son diferentes', () => {
    const userName = component.forma.get('password');
    userName.setValue('1234');
    const password = component.forma.get('password2');
    password.setValue('123');
    let comp = component.registrar();
    expect(comp).toBe(false);
  });

  it('Debe retornar false por que es un formulario invalido', () => {
    let comp = component.registrar();
    expect(comp).toBe(false);
  });



  it('Debe de llamar al servicio de crearUsuario', () => {
    
    component.forma.get('user').setValue('user2');
    component.forma.get('userName').setValue('user2');
    component.forma.get('password').setValue('1234');
    component.forma.get('password2').setValue('1234');
    component.forma.get('email').setValue('user2@gmail.com');
    component.forma.get('lastName').setValue('apellido');
    component.forma.get('dpi').setValue('512345678910');
    component.forma.get('edad').setValue('03/03/1991');
    const espia = spyOn(component.service,'crearUsuario').and.callThrough();
    component.registrar();
    expect(espia).toHaveBeenCalled();
  });

  


  it('Debe de redireccionar a home', () => {
    
    const routerstub: Router = TestBed.get(Router);
    spyOn(routerstub, 'navigate');
    component.ingresar();
    expect(routerstub.navigate).toHaveBeenCalledWith(["/login"]);
  });


});
