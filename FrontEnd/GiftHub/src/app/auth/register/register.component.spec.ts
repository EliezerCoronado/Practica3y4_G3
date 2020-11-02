import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GiftcardsService } from 'src/app/services/giftcards.service';

import { RegisterComponent } from './register.component';



class MockRegister{
  
  forma:FormGroup;
  constructor(){
    this.forma = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null,Validators.required),
      userName: new FormControl(null, Validators.required),
      dpi: new FormControl(null,Validators.required),
      colegiado: new FormControl(null, Validators.required),
      genero: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required)
    });
  }

  registrarUsuario(forma){
    if(forma.valid){
      return true
    }else{
      return false
    }
  }


}



describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockRegistro: MockRegister;

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
    mockRegistro = new MockRegister;
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

  it('Crear Usuario, Debe retornar false por que es un formulario invalido', () => {
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



  it('Debe crear un medico, mock',()=>{
    let forma = new FormGroup({
    user: new FormControl('user1', Validators.required),
    userName: new FormControl('Usuario 1',Validators.required),
    password: new FormControl('123', Validators.required),
    password2: new FormControl('123',Validators.required),
    email: new FormControl('user1@gmail.com', Validators.required),
    lastname: new FormControl('Apellido 1', Validators.required),
    dpi: new FormControl('1000', Validators.required),
    edad: new FormControl('03/03/1991', Validators.required)
  });
  const resp = mockRegistro.registrarUsuario(forma);
  expect(resp).toBeTruthy;
});

it('Debe crear un medico, mock',()=>{
  let forma = new FormGroup({});
const resp = mockRegistro.registrarUsuario(forma);
expect(resp).toBeTruthy;
});

  


  it('Debe de redireccionar a home', () => {
    
    const routerstub: Router = TestBed.get(Router);
    spyOn(routerstub, 'navigate');
    component.ingresar();
    expect(routerstub.navigate).toHaveBeenCalledWith(["/login"]);
  });


});
