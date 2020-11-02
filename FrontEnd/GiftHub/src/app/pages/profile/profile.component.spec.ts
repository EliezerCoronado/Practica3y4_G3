import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { GiftcardsService } from 'src/app/services/giftcards.service';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      providers: [ GiftcardsService ],
      imports: [FormsModule,ReactiveFormsModule,HttpClientModule,RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se debe crear el componente profile', () => {
    expect(component).toBeTruthy();
  });

  
  it('Debe de llamar al servicio de saveUserInfo', () => {

    const espia = spyOn(component.service,'updateUserInfo').and.callThrough();
    component.saveUserInfo();
    expect(espia).toHaveBeenCalled();
  });


  
  it('Debe retornar falso por que las contrasenias no son iguales', () => {
    const pass = component.formPassword.get('newPass');
    pass.setValue('123');
    const password = component.formPassword.get('confirmPass');
    password.setValue('1234');
    expect(component.saveUserPassword()).toBeFalsy;
  });




  xit('Debe de llamar al servicio de saveUserInfo', () => {
    component.formUserInfo.get('username').setValue('user1');
    component.formUserInfo.get('email').setValue('user1@gmail.com');
    component.formUserInfo.get('nombre').setValue('usuario 1');
    component.formUserInfo.get('apellido').setValue('apellido 1');
    component.formUserInfo.get('dpi').setValue('1000');
    component.formUserInfo.get('fecha_nacimiento').setValue('03/03/2000');
    const pass = component.formPassword.get('newPass');
    pass.setValue('1234');
    const password = component.formPassword.get('confirmPass');
    password.setValue('1234');
    //console.log(component.formUserInfo.value);

    const espia = spyOn(component.service,'updateUserInfo').and.callThrough();
    component.saveUserPassword();
    expect(espia).toHaveBeenCalled();
  });



  xit('Debe de llamar al servicio de saveUserInfo', () => {
    const pass = component.formPassword.get('newPass');
    pass.setValue('1234');
    const password = component.formPassword.get('confirmPass');
    password.setValue('1234');
    const espia = spyOn(component.service,'updateUserPassword').and.callThrough();
    component.saveUserPassword();
    expect(espia).toHaveBeenCalled();
  });


  xit('Debe de llamar al servicio de saveUserInfo', () => {
    const pass = component.formPassword.get('newPass');
    pass.setValue('1234');
    const password = component.formPassword.get('confirmPass');
    password.setValue('1234');
    const espia = spyOn(component.service,'updateUserPassword').and.callThrough();
    expect(component.saveUserPassword()).toBeTrue;
  });






});
