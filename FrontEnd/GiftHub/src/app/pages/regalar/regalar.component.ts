import { formatPercent } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GiftcardsService } from 'src/app/services/giftcards.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-regalar',
  templateUrl: './regalar.component.html',
  styleUrls: ['./regalar.component.css']
})
export class RegalarComponent implements OnInit {
  forma:FormGroup;
  cards:any=[];
  users:any=[];
  codecard:string;
  iduser2:string;
  

  constructor(public service:GiftcardsService) { }

  ngOnInit(): void {
    this.forma = new FormGroup({
      giftCards: new FormControl('',Validators.required),
      user: new FormControl('',Validators.required)
    });

    this.obtenerGiftCards();
    this.obtenerUsuarios();
  }

  obtenerGiftCards(){
 
    this.service.getMyGiftCards(localStorage.getItem('id')).subscribe(
      (resp:any)=>{
        this.cards=resp.inventario;

      });
      
  }

  obtenerUsuarios(){
    let aux=0;
    let user=0;
    this.service.getAllUsers().subscribe((resp:any)=>{
      this.users = resp.usuarios;
      
      this.users.forEach(element => {

        if(element.id_usuario === Number(localStorage.getItem('id') )){
          user=aux;
        }
        aux++;

      });
      this.users.splice(user,1);
   
    });
  }

  codigoCard(card){
    console.log(card);

  }

  regalar(){
    let auxgiftcard = this.forma.value.giftCards;
    let auxuser = this.forma.value.user;
    this.cards.forEach(element => {
      let auxelement =element.id_registro + ' - ' +element.name + ' - $' + element.total;
      if(auxelement === auxgiftcard){
        this.codecard=element.codigo_tarjeta;
      }
      
    });

    this.users.forEach(element => {
      let auxelement2 =element.id_usuario + ' - ' +element.username;
      if(auxelement2 === auxuser){
        this.iduser2=element.id_usuario;
      }

    });

    let give={
      'propietario_id':localStorage.getItem('id'),
      'nuevo_propietario_id': this.iduser2,
      'codigo_tarjeta': this.codecard

    }
    

    this.service.giveCard(give).subscribe(resp=>{
      Swal.fire('Success','Gift Card Enviada','success');
      this.obtenerGiftCards();
    },err=>{
      console.log(err);
    });
    
  }

}
