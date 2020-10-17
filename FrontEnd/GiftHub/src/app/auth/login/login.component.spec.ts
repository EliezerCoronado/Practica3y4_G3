import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[FormsModule,ReactiveFormsModule,HttpClientModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente Login', () => {
    expect(component).toBeTruthy();
  });

  it('Debe retornar true si es el admin que se loguea', () => {
    const userName = component.forma.get('userName');
    userName.setValue('admin');
    const password = component.forma.get('password');
    password.setValue('admin');
    let comp = component.ingresar();

    expect(comp).toBe(true);
  });


  it('Debe retornar false por que es un formulario invalido', () => {
    const userName = component.forma.get('userName');
    userName.setValue('');
    const password = component.forma.get('password');
    password.setValue('');
    let comp = component.ingresar();
    expect(comp).toBe(false);
  });


  it('Debe retornar false por que es un formulario invalido', () => {
    const userName = component.forma.get('userName');
    userName.setValue('');
    const password = component.forma.get('password');
    password.setValue('');
    let comp = component.ingresar();
    expect(comp).toBe(false);
  });


  it('Debe de llamar al servicio de login', () => {
    const userName = component.forma.get('userName');
    userName.setValue('user');
    const password = component.forma.get('password');
    password.setValue('1234');
    const espia = spyOn(component.service,'login').and.callThrough();
    component.ingresar();
    expect(espia).toHaveBeenCalled();
  });


  it('Debe de retornar false, login erroneo', () => {
    const userName = component.forma.get('userName');
    userName.setValue('usuario');
    const password = component.forma.get('password');
    password.setValue('1234');
    let resp = component.ingresar();
    expect(resp).toBeUndefined;
  });

  it('Debe de retornar true, login correcto', () => {
    const userName = component.forma.get('userName');
    userName.setValue('user2');
    const password = component.forma.get('password');
    password.setValue('1234');
    let resp = component.ingresar();
    expect(resp).toBeUndefined;
  });
  
  


});
