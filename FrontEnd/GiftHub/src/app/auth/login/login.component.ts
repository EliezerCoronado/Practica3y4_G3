import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GiftcardsService } from 'src/app/services/giftcards.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma:FormGroup;
  constructor(
    public route: Router,
    public service: GiftcardsService
    ) { 
    
  }

  ngOnInit(): void {
    this.forma = new FormGroup({
      userName: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    });
  }


  ingresar(){

    this.service.login(this.forma.value).subscribe((resp:any)=>{
     console.log(resp);
     return true 
    }, err=>{
      console.log(err);
      return false
    })
    
  }

}
