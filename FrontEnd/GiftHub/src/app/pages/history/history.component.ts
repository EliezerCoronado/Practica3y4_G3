import { Component, OnInit } from '@angular/core';
import { GiftcardsService } from 'src/app/services/giftcards.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(public service:GiftcardsService) { }
  historial:any=[];
  ngOnInit(): void {
    this.miHistorial();
  }

  miHistorial(){
    let user = {
      'id_usuario':localStorage.getItem('id')
    }
    this.service.myHistory(user).subscribe((resp:any)=>{
      this.historial=resp.historial;
      console.log(this.historial);
    })
  }

}
