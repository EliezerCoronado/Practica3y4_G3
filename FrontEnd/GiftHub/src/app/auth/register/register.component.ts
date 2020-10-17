import { Component, IterableDiffers, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GiftcardsService } from 'src/app/services/giftcards.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  forma:FormGroup;
  constructor(
    public route: Router,
    public service: GiftcardsService
    ) { }

  ngOnInit(): void {
    this.forma = new FormGroup({
      user: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      userName: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      dpi: new FormControl('',Validators.required),
      edad: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      password2: new FormControl('',Validators.required)
    });
  }

  registrar(){


    if(this.forma.value.password !== this.forma.value.password2){
      Swal.fire({
        icon:'error',
        title:'Error',
        text:'las contrasenias no coinciden'
      });
      return false;
    }
  
    if(this.forma.invalid){
      return false;
    }
    this.service.crearUsuario(this.forma.value).
    subscribe((resp:any)=>{
      if(resp.ok===true){
        
        Swal.fire({
          icon:'success',
          title:'Ok',
          text:resp.msg
        });
      }else{
        Swal.fire({
          icon:'error',
          title:'Error',
          text:resp.msg_error
        });

      }
      
    },err=>{
      console.log(err);
    });
    
  }
  ingresar(){
    this.route.navigate(['/login']);

  }

}
