import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


class MockUsuarioService{
  authenticted = false  
  login(user:string,password:string){
      if(user ==='user1' && password ==='123'){
        return this.authenticted ===true;       
      }else{
        return this.authenticted === false;
      }
    
  }

}



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuth: MockUsuarioService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[FormsModule,ReactiveFormsModule,HttpClientModule, RouterTestingModule.withRoutes([])],
      providers:[MockUsuarioService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockAuth = new MockUsuarioService;
    
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



  it('Debe de llamar al servicio de login', () => {
    const userName = component.forma.get('userName');
    userName.setValue('user1');
    const password = component.forma.get('password');
    password.setValue('123');
    const espia = spyOn(component.service,'login').and.callThrough();
    component.ingresar();
    expect(espia).toHaveBeenCalled();
  });


  it('Debe de llamar al servicio de loginnnn', () => {
    const userName = component.forma.get('userName');
    userName.setValue('user1');
    const password = component.forma.get('password');
    password.setValue('123');
    const espia = spyOn(component.service,'login').and.callThrough();
    component.ingresar();
    expect(espia).toHaveBeenCalled();
  });


  it('login correcto, usando mocks',()=>{
    let resp = mockAuth.login('user1','123');
    expect(resp).toBeTrue;
  });

  it('login incorrecto, usando mocks',()=>{
    let resp = mockAuth.login('user10','12345');
    expect(resp).toBeFalsy;
  });
  

  
  it('Debe de retornar false, login erroneo', () => {
    const userName = component.forma.get('userName');
    userName.setValue('usuario');
    const password = component.forma.get('password');
    password.setValue('123');
    let resp = component.ingresar();

    expect(resp).toBe(undefined);
  });



  it('Debe de retornar true, login correcto', () => {
    const userName = component.forma.get('userName');
    userName.setValue('user1');
    const password = component.forma.get('password');
    password.setValue('123');
    let resp = component.ingresar();

    expect(resp).toBe(undefined);
  });





  


});
