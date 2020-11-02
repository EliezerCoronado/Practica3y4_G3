import { Component, OnInit } from '@angular/core';
import { GiftcardsService } from 'src/app/services/giftcards.service';

@Component({
  selector: 'app-mycards',
  templateUrl: './mycards.component.html',
  styleUrls: ['./mycards.component.css']
})
export class MycardsComponent implements OnInit {

  constructor(public service:GiftcardsService) { }

  cards:any=[];

  ngOnInit(): void {
    this.miInventario();
  }
  
  miInventario(){
    this.service.getMyGiftCards(localStorage.getItem('id')).subscribe((resp:any)=>{
      this.cards = resp.inventario;
      //console.log(this.cards);

    },err=>{
      console.log(err);
    })
  }



}
