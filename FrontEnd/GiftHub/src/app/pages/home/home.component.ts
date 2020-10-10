import { Component, OnInit } from '@angular/core';
import { GiftcardsService } from '../../services/giftcards.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public service:GiftcardsService) { }
  cards:any=[];
  value:any=[];

  ngOnInit(): void {
    this.ObtenerTarjetas();
    this.ObtenerValues();
  }

  ObtenerTarjetas(){
    this.service.getCards().subscribe(resp=>{
      this.cards=resp;
      console.log(this.cards);
    },err=>{
      console.log(err);
    })
  }

  ObtenerValues(){
    this.service.getValue().subscribe(resp=>{
      this.value=resp;
      console.log(this.value[1-1].total);
    },err=>{
      console.log(err);
    })
  }

  prueba(){
    console.log('prueba')
  }

}
