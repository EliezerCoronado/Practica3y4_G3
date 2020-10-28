import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GiftcardsService } from '../../services/giftcards.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public service:GiftcardsService) { }
  GiftName:string='';
  GiftValue:number = 0;
  cards:any=[];
  value:any=[];
  formaCantidad:FormGroup;
  formaValida:boolean = true;

  ngOnInit(): void {
    this.ObtenerCatalogo()
    this.ObtenerValues();
    this.formaCantidad = new FormGroup({
      Cantidad: new FormControl(1, [Validators.required, Validators.pattern("^[0-9]*$")])
    })
  }

  ObtenerTarjetas(){
    this.service.getCards().subscribe(resp=>{
      this.cards=resp;
       console.log(this.cards);
    },err=>{
      // console.log(err);
    })
  }


  ObtenerCatalogo(){
    this.service.getCatalogo().subscribe((resp:any)=>{
      this.cards = resp.tarjetas;
      console.log(this.cards);
    });
  }

  ObtenerValues(){
    this.service.getValue().subscribe((resp:any)=>{
      this.value=resp;
      // console.log(this.value)
      //console.log(this.value[1-1].total);
    },err=>{
      // console.log(err);
    })
  }

  defaultCantidad(valor,nombre){
    this.GiftName = nombre;
    this.GiftValue = valor;
    return (<HTMLInputElement>document.getElementById("Cantidad")).value = '1';


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

}
