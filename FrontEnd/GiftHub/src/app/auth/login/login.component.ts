import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GiftcardsService } from 'src/app/services/giftcards.service';
import Swal from 'sweetalert2';

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

    
    if(this.forma.value.userName==='admin' && this.forma.value.password==='admin'){
      console.log('es el admin');
      localStorage.setItem('username','admin');
      localStorage.setItem('token', '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQsImlhdCI6MTYwMjg5ODUzOSwiZXhwIjoxNjAyOTg0OTM5fQ.yvYo5eGJb5Zf5AAhYwSHGiTZQN6bCdWa1cXrVkdV7i8"');
      this.route.navigate(['/home']);
      
      return true;
    }

    if(this.forma.invalid){
      Swal.fire({
        icon:'error',
        title:'Error',
        text: 'Error'
      });
      return false
    }

    this.service.login(this.forma.value).subscribe((resp:boolean)=>{
     
     if (resp === true){
      
      this.route.navigate(['/home']);
      return true;
     }
     else{
      Swal.fire({
        icon:'error',
        title:'Error',
        text:'credenciales no validas'
      });
      return false;
     }  
    }, err=>{
      Swal.fire({
        icon:'error',
        title:'Error',
        text:err.error.msg
      });
      return false;

    }
    )
    
  }




}
