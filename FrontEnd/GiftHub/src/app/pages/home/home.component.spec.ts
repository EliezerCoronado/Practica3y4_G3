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

  it('Comprueba si el admin no esta logueado', () => {
    component.isAdmin = false;
    let resp = component.viewCards('1');
    expect(resp).toBeTrue;
  });

  it('Comprueba si el admin2 esta logueado', () => {
    component.isAdmin=true;
    let resp = component.isAdmin;
    expect(resp).toBeTrue;
  });
  
  it('Comprueba si el admin no esta logueado', () => {
    component.isAdmin=false;
    let resp = component.viewCards('2');
    expect(resp).toBeFalse;
  });


  it('Debe de llamar al servicio de Obtener Valores', () => {

    const espia = spyOn(component.service,'getValue').and.callThrough();
    component.ObtenerValores();
    expect(espia).toHaveBeenCalled();
  });


  it('Debe de llamar al servicio de Obtener Catalogos', () => {

    const espia = spyOn(component.service,'getCatalogo').and.callThrough();
    component.ObtenerCatalogo();
    expect(espia).toHaveBeenCalled();
  });

  
  it('Debe de llamar al servicio de Actualizar Catalogo', () => {

    const espia = spyOn(component.service,'updateCatalogo').and.callThrough();
    component.actualizarCatalogo();
    expect(espia).toHaveBeenCalled();
  });

  it('Delbe de llamar al servicio de obtener Values', () => {

    const espia = spyOn(component.service,'getValueCatalogo').and.callThrough();
    component.ObtenerValues();
    expect(espia).toHaveBeenCalled();
  });


  it('Debe retornar true si la cantidad es mayor a 0', () => {
    const cantidad = component.formaCantidad.get('Cantidad');
    cantidad.setValue(1);
    component.formaValida=true;
    
    let comp = component.vistaCantidad();

    expect(comp).toBe(true);
  });

  it('Debe retornar false si la cantidad es  0', () => {
    const cantidad = component.formaCantidad.get('Cantidad');
    cantidad.setValue(0);
    component.formaValida=false;
    
    let comp = component.vistaCantidad();

    expect(comp).toBe(false);
  });



  it('Debe retornar false si el fomulario no es valido', () => {
    component.formaValida=false;
    
    let comp = component.agregarCarrito();

    expect(comp).toBe(false);
  });










  

  





});
