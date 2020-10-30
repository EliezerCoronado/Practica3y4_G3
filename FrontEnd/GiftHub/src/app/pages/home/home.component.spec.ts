import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { GiftcardsService } from 'src/app/services/giftcards.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [ GiftcardsService ],
      imports: [FormsModule,ReactiveFormsModule,HttpClientModule,RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente home', () => {
    expect(component).toBeTruthy();
  });

  it('Debe retornar true por que la cantidad es mayor o igual a 1 ', () => {
    component.formaCantidad.get('Cantidad').setValue('1');
    const resp = component.cantidad();
    expect(resp).toBeTruthy();
  });

  it('Debe retornar false por que la cantidad es mayor o igual a 0 ', () => {
    component.formaCantidad.get('Cantidad').setValue('0');
    const resp = component.cantidad();
    expect(resp).toBeFalsy();
  });


  it('Debe de retornar un numero mayor a 0', () => {
    component.formaCantidad.get('Cantidad');
    const resp = component.defaultCantidad('10','Google Play', '1','1','image');
    expect(resp).toBeGreaterThan(0);
  });
  
  



});
