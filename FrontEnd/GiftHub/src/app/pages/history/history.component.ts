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
  isAdmin:Boolean = localStorage.getItem('username') === 'admin' ? true : false;
  usersHistory:any = [];

  ngOnInit(): void {
    this.miHistorial();
    this.getUsersHistory();
  }

  miHistorial(){
    let user = {
      'id_usuario':localStorage.getItem('id')
    }
    this.service.myHistory(user).subscribe((resp:any)=>{
      this.historial=resp.historial;
    })
  }

  getUsersHistory(){
    this.service.getUsersHistory().subscribe((resp:any)=>{
      for (const item of resp.historial) {
        let position = this.findUsersHistoryPosition(item.id_usuario);
        if(position >= 0){
          this.usersHistory[position].push(item);
        } else {
          this.usersHistory.push([item]);
        }
      }
    })
  }

  findUsersHistoryPosition(id){
    for (let i = 0; i < this.usersHistory.length; i++) {
      if(this.usersHistory[i][0].id_usuario === id){
        return i;
      }
    }
    return -1;
  }

}
