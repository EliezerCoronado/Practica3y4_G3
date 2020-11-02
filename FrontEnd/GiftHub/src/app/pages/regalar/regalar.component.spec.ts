import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { GiftcardsService } from 'src/app/services/giftcards.service';

import { RegalarComponent } from './regalar.component';

describe('RegalarComponent', () => {
  let component: RegalarComponent;
  let fixture: ComponentFixture<RegalarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegalarComponent ],
      providers: [ GiftcardsService ],
      imports: [FormsModule,ReactiveFormsModule,HttpClientModule,RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegalarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente de Regalar', () => {
    expect(component).toBeTruthy();
  });

  it('Llama a metodo obtener Usuario', () => {

  
    expect(component.codigoCard('123456')).toHaveBeenCalled;
  });


  
  it('Recibe un codigo de una card', () => {
  
    expect(component.codigoCard('123456')).toHaveBeenCalled;
  });

  it('debe simular regalar', () => {
    component.users=[{
      'Apellidos': "apellido1",
      'Nombres': "user1",
      'correo': "ismorales1991@gmail.com",
      'dpi': "010101010",
      'fecha_nacimiento': "1991-03-03T06:00:00.000Z",
      'id_usuario': 1,
      'password': "$2a$10$mkEPUa5y.xFjvagUlKApqu6iaKPyIfNM2S6L0U9flSgIsGPrMU15G",
      'username': "admin"}]
    component.cards =[{
      'Usuario_id_usuario': 2,
      'active': 1,
      'availability_card_id': 3,
      'availability_value_id': 1,
      'chargeRate': 0.1,
      'codigo_tarjeta': "211202014814986",
      'id': 1,
      'id_registro': 3,
      'image': "https://mojolika.com/wp-content/uploads/2019/04/196.png",
      'name': "Steam",
      'total': 10
    }]

    const gift = component.forma.get('giftCards');
    gift.setValue('3 - Steam - $10');
    const user = component.forma.get('user');
    user.setValue('1 - admin');
  
    const espia = spyOn(component.service,'giveCard').and.callThrough();
    component.regalar();
    expect(espia).toHaveBeenCalled();

  });


  


});
