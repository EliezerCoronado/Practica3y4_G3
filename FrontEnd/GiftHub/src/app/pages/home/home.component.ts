import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { GiftcardsService } from '../../services/giftcards.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public service:GiftcardsService) { }
  GiftName:string='';
  GiftImg:string='';
  GiftId:string='';
  IdValue:string='';
  GiftValue:number = 0;
  cards:any=[];
  values:any=[];
  value:any=[];
  carrito:any=[];
  detalle:any=[];
  formaCantidad:FormGroup;
  formaValida:boolean = true;
  isAdmin:Boolean = localStorage.getItem('username') === 'admin' ? true : false;

  ngOnInit(): void {
    if(localStorage.getItem('detalle')){
      console.log('no existe');
      this.detalle = JSON.parse(localStorage.getItem('detalle'));
    }
    this.ObtenerTarjetas();
    this.formaCantidad = new FormGroup({
      Cantidad: new FormControl(1, [Validators.required, Validators.pattern("^[0-9]*$")])
    })
  }

  ObtenerTarjetas(){
    this.service.getCards().subscribe(resp=>{
      this.cards=resp;
      this.ObtenerValores();
    },err=>{
      // console.log(err);
    })
  }

  ObtenerValores(){
    this.service.getValue().subscribe(resp=>{
      this.values=resp;
      this.actualizarCatalogo();
    },err=>{
      // console.log(err);
    })
  }

  actualizarCatalogo(){
    this.service.updateCatalogo({ 'cards':this.cards, 'valores':this.values }).subscribe(resp=>{
      console.log('Actualización exitosa')
      this.ObtenerValues();
    },err=>{
      console.log('Actualización fallida');
    });
  }

  viewCards(active:string){
    if(this.isAdmin){
      return true;
    }
    return active == '1' ? true : false;
  }

  ObtenerCatalogo(){
    this.service.getCatalogo().subscribe((resp:any)=>{
      this.cards = resp.tarjetas;
      console.log(this.cards);
    });
  }

  ObtenerValues(){
    this.service.getValueCatalogo().subscribe((resp:any)=>{
      this.value=resp.valores;
       console.log(this.value)
       this.ObtenerCatalogo();
      //console.log(this.value[1-1].total);
    },err=>{
      // console.log(err);
    })
  }

  defaultCantidad(valor,nombre, cardId,valueId,cardImg){
    this.IdValue=valueId;
    this.GiftId = cardId;
    this.GiftName = nombre;
    this.GiftValue = valor;
    this.GiftImg = cardImg;
    this.formaValida = true;
    this.formaCantidad.value.Cantidad = 1;
    return (<HTMLInputElement>document.getElementById("Cantidad")).value = '1';
  }

  vistaCantidad(){
    if(  this.formaCantidad.value.Cantidad !== undefined && 
      this.formaCantidad.value.Cantidad > 0){
        this.formaValida = true;
        return  true;
    }else{
      this.formaValida = false;
      return false;
 }

  }

  cantidad(){

    let date =  new Date();
    let id_card = date.getDate()+''+(date.getMonth()+1)+''+date.getFullYear()+''+
                  date.getHours()+''+date.getMinutes()+''+date.getSeconds()+''+date.getMilliseconds();

    console.log(id_card);

    if(  this.formaCantidad.value.Cantidad !== undefined && 
         this.formaCantidad.value.Cantidad > 0){
           this.formaValida = true;
        return  true;
    }else{
        this.formaValida = false;
        return false;
    }

  }

  registrarFactura(){

  }


  agregarCarrito(){

    if(this.formaValida === false){
      return false;
    }

    let giftcard:any ={
      'card_id':this.GiftId,
      'value_id':this.IdValue,
      'cantidad':this.formaCantidad.value.Cantidad,
      'nombre': this.GiftName,
      'img':this.GiftImg,
      'valor':this.value[Number(this.IdValue)-1].total
    }

    let update=false;
    this.detalle.forEach(element => {      
      if(element.card_id === giftcard.card_id && element.value_id === giftcard.value_id){
        element.cantidad = element.cantidad + giftcard.cantidad;
        update=true;
      }


    });

    
    if(!update){
      this.detalle.push(giftcard);
    }
    console.log(giftcard);
    console.log(this.detalle);

    document.getElementById('modal').click();
    localStorage.setItem('detalle',JSON.stringify(this.detalle));
    Swal.fire('Success','GiftCards agregados', 'success');


  }



}
