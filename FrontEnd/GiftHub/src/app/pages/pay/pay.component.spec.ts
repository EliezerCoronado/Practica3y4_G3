import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { GiftcardsService } from 'src/app/services/giftcards.service';

import { PayComponent } from './pay.component';

describe('PayComponent', () => {
  let component: PayComponent;
  let fixture: ComponentFixture<PayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayComponent ],
      providers: [ GiftcardsService ],
      imports: [FormsModule,ReactiveFormsModule,HttpClientModule,RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se debe crear el componente pay', () => {
    expect(component).toBeTruthy();
  });

  it('Debe retornar un Total de 10', () => {
    
    component.detalle = JSON.parse(
      '[{"card_id":2,"value_id":1,"cantidad":1,"nombre":"PlayStation","img":"1","valor":10}]');
    component.calcularTotalDollar();
    expect(component.Total).toBe(10);
  });

  it('Debe retornar un Total de 20', () => {
    
    component.detalle = JSON.parse(
      '[{"card_id":2,"value_id":1,"cantidad":2,"nombre":"PlayStation","img":"1","valor":10}]');
    component.calcularTotalDollar();
    expect(component.Total).toBe(20);
  });

  it('Debe retornar un Total de 0', () => { 
    component.detalle ='';
    component.calcularTotalDollar();
    expect(component.Total).toBe(0);
  });


  it('Debe eliminar un elemento de detalle quedando uno', () => { 
    component.detalle =JSON.parse('[{"card_id":2,"value_id":1,"cantidad":1,"nombre":"PlayStation","img":"a","valor":10},{"card_id":2,"value_id":2,"cantidad":1,"nombre":"PlayStation","img":"b","valor":25}]');
    component.eliminar(1);
    let comp = component.detalle.length;
    expect(comp).toBe(1);
  });



  it('Debe validar que la tarjeta sea de 16 digitos', () => { 
    component.forma.get('noTarjeta').setValue('1122334455667788');
    component.registrarTarjetaCredito();
    expect(component.tarjeta).toBe(true);
    
  });

  it('Debe retonrar falso por que la tarjeta no es de 16 digitos', () => { 
    component.forma.get('noTarjeta').setValue('112233');
    let comp = component.registrarTarjetaCredito();
    expect(comp).toBe(false);
  });

  it('Debe retonrar true por que el codigo es  de 3 digitos', () => { 
    component.forma.get('noTarjeta').setValue('1122334455667788');
    component.forma.get('verifierCode').setValue('123');
    component.registrarTarjetaCredito();
    expect(component.codigo).toBe(true);
  });


  it('Debe retonrar falso por que el codigo es mas 3 digitos', () => { 
    component.forma.get('noTarjeta').setValue('1122334455667788');
    component.forma.get('verifierCode').setValue('1234');
    let comp = component.registrarTarjetaCredito();
    expect(comp).toBe(false);
  });


  it('Debe retornar la tarjeta con la mascara', () => { 
    const tarjeta =('1122334455667788');
    component.detalle =JSON.parse('[{"card_id":2,"value_id":1,"cantidad":1,"nombre":"PlayStation","img":"a","valor":10},{"card_id":2,"value_id":2,"cantidad":1,"nombre":"PlayStation","img":"b","valor":25}]');
    component.generarFactura(tarjeta);
    expect(component.mascaraTarjeta).toBe('XXXX33445566XXXX');
   
  });




  it('Debe de llamar service factura para genera una compra', () => {
    const tarjeta =('1122334455667788');
    component.detalle =JSON.parse('[{"card_id":2,"value_id":1,"cantidad":1,"nombre":"PlayStation","img":"a","valor":10},{"card_id":2,"value_id":2,"cantidad":1,"nombre":"PlayStation","img":"b","valor":25}]');
    const espia = spyOn(component.service,'factura').and.callThrough();
    component.generarFactura(tarjeta);
    expect(espia).toHaveBeenCalled();
  });




  it('No se llamo al  service factura, debe regresa false compra fallida', () => {
    const tarjeta =('112233445566');
    component.detalle =JSON.parse('[{"card_id":2,"value_id":1,"cantidad":1,"nombre":"PlayStation","img":"a","valor":10},{"card_id":2,"value_id":2,"cantidad":1,"nombre":"PlayStation","img":"b","valor":25}]');
    const espia = spyOn(component.service,'factura').and.callThrough();
    component.generarFactura(tarjeta);
    let resp = expect(espia).toHaveBeenCalled();
    expect(resp).toBeFalse;
  });


  it('Debe generar el codigo de la tarjeta', () => {
    expect(component.generarcodigo()).toBeGreaterThan(8);
  });



  it('Debe de llamar service de obtencion de tasa', () => {
    const espia = spyOn(component.service,'getTasa').and.callThrough();
    component.obtenerCambio();
    expect(espia).toHaveBeenCalled();
  });




  

});
