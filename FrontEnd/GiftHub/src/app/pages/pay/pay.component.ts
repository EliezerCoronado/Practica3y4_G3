import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GiftcardsService } from 'src/app/services/giftcards.service';

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

  constructor(public service: GiftcardsService) { }

  ngOnInit(): void {
    if(localStorage.getItem('detalle')){
      this.detalle = JSON.parse(localStorage.getItem('detalle'));
      console.log(this.detalle);
      this.calcularTotalDollar();
      this.obtenerCambio();
    }

    this.forma = new FormGroup({
      noTarjeta: new FormControl('',Validators.required),
      nameCard: new FormControl('',Validators.required),
      expirationDate: new FormControl('',Validators.required),
      verifierCode:  new FormControl('',Validators.required)
    });

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
      console.log(this.Tasa);
    })
  }

  eliminar(i){
    this.detalle.pop(i);
    localStorage.setItem('detalle',JSON.stringify(this.detalle));
    this.calcularTotalDollar();
   
  }

  registrarTarjetaCredito(){
    this.generarFactura();
    
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

    

  }

  generarFactura(){

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
      'tipo_cambio': this.Tasa,
      'status': '1',
      'id_usuario': localStorage.getItem('id'),
      'detalle':this.detalleFactura
    }

    console.log(factura);

    this.service.factura(factura).subscribe(resp=>{
      console.log(resp);
    },err=>{console.log(err)});

    this.detalleFactura.forEach(element => {
      console.log(element);
      for (let index = 0; index < element.cantidad; index++) {
        console.log('wut');
        let date2:Date = new Date();
        let GiftCard:any = {
          'codigo_tarjeta': date2.getDate()+''+(date2.getMonth()+1)+''+date2.getFullYear()+''+
                            date2.getHours()+''+date2.getMinutes()+''+date2.getSeconds()+''+date2.getMilliseconds(),
          'id_usuario':localStorage.getItem('id'),
          'card_id':element.card_id,
          'value_id':element.value_id
        }

        this.service.createMyGiftCards(GiftCard).subscribe(resp=>{
          console.log(resp);
        },err =>{
          console.log(err);
        })
        
      }

      
    });


  }




}
