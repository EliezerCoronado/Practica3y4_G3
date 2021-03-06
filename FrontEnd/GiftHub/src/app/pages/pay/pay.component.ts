import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GiftcardsService } from 'src/app/services/giftcards.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  

  forma:FormGroup;
  detalle:any = []
  Total:number = 0;
  Tasa:number = 0;
  tarjeta=true;
  codigo=true;
  detalleFactura:any=[];
  monedasDePago:any=[{'name':'Quetzales', 'value': 1, 'value2':'Q', 'value3':true},{'name':'Dólares', 'value': 1, 'value2':'$','value3':false}];
  tasaActual:number = 1;
  mascaraTarjeta:string='';

  constructor(public service: GiftcardsService) { }

  ngOnInit(): void {
    if(localStorage.getItem('detalle')){
      this.detalle = JSON.parse(localStorage.getItem('detalle'));
      //console.log(this.detalle);
      this.calcularTotalDollar();
    }
    this.obtenerCambio();

    this.forma = new FormGroup({
      noTarjeta: new FormControl('',Validators.required),
      nameCard: new FormControl('',Validators.required),
      expirationDate: new FormControl('',Validators.required),
      verifierCode:  new FormControl('',Validators.required),
      moneda:  new FormControl(this.monedasDePago[0].name,Validators.required)
    });
  }

  obtenerInfoMoneda(){
    for (const item of this.monedasDePago) {
      if(this.forma.value.moneda === item.name){
        return item;
      }
    }
  }

  calcularTotalDollar(){
    this.Total=0;
    if(this.detalle.length > 0){
      this.detalle.forEach(element => {
      this.Total=this.Total+element.valor*element.cantidad;  
      });
    }
    else{
      this.Total=0;
    }
  }

  obtenerCambio(){
    this.service.getTasa().subscribe((resp:any)=>{
      this.Tasa = resp[0].total;
      this.monedasDePago[0].value = this.Tasa;
    })
  }

  eliminar(i){
    this.detalle.pop(i);
    localStorage.setItem('detalle',JSON.stringify(this.detalle));
    this.calcularTotalDollar();
   
  }

  registrarTarjetaCredito(){
    
    if(this.forma.value.noTarjeta.toString().length === 16){
      this.tarjeta = true;
    }
    else{
      return this.tarjeta = false;
    }
    
    if(this.forma.value.verifierCode.toString().length === 3){
      this.codigo = true;
    }
    else{
      return this.codigo=false;
    }

    
    this.generarFactura(this.forma.value.noTarjeta.toString());

  
  }
  generarcodigo(){
    let date2:Date = new Date();
    return date2.getDate()+''+(date2.getMonth()+1)+''+date2.getFullYear()+''+
                            date2.getHours()+''+date2.getMinutes()+''+date2.getSeconds()+''+date2.getMilliseconds();
  }

  generarFactura(no_Tarjeta){
    if(this.detalle.length===0){
      Swal.fire('Error','No hay GiftCards por comprar','error');
      return false;
    }

    this.mascaraTarjeta = 'XXXX'+no_Tarjeta[4]+no_Tarjeta[5]+no_Tarjeta[6]+no_Tarjeta[7]
                            +no_Tarjeta[8]+no_Tarjeta[9]+no_Tarjeta[10]+no_Tarjeta[11]+'XXXX';

    let date: Date = new Date();
    this.detalle.forEach(element => {
      let auxDetalle:any ={
        'card_id':element.card_id,
        'value_id':element.value_id,
        'cantidad':element.cantidad,
      }
      this.detalleFactura.push(auxDetalle);
    });

    let factura:any={
      'fecha':date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear(),
      'tipo_cambio': this.obtenerInfoMoneda().value,
      'status': '1',
      'id_usuario': localStorage.getItem('id'),
      'num_tarjeta':this.mascaraTarjeta,
      'detalle':this.detalleFactura
    }


    
    this.service.factura(factura).subscribe(resp=>{
      console.log(resp);
      Swal.fire('Success','Transaccion Realizada','success');
    });

    this.detalleFactura.forEach(element => {
      for (let index = 0; index < element.cantidad; index++) {
        let GiftCard:any = {
          'codigo_tarjeta': this.generarcodigo(),
          'id_usuario': Number(localStorage.getItem('id')),
          'card_id':element.card_id,
          'value_id':element.value_id
        }

        this.service.createMyGiftCards(GiftCard).subscribe(resp=>{
          console.log(resp);
        })
        
      }

      
    });

    this.detalleFactura=[];
    this.detalle=[];
    localStorage.removeItem('detalle');
    this.Total=0;

  }






}
