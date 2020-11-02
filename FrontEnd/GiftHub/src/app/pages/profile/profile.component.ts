import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { GiftcardsService } from 'src/app/services/giftcards.service';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formUserInfo:FormGroup;
  formPassword:FormGroup;

  constructor(public service: GiftcardsService) { }

  ngOnInit(): void {
    this.formUserInfo = new FormGroup({
      user: new FormControl(localStorage.getItem('username'),Validators.required),
      email: new FormControl(localStorage.getItem('correo'),Validators.required),
      Nombre: new FormControl(localStorage.getItem('nombre'),Validators.required),
      Apellido: new FormControl(localStorage.getItem('apellido'),Validators.required),
      dpi: new FormControl(localStorage.getItem('dpi'),Validators.required),
      edad: new FormControl(formatDate(localStorage.getItem('fecha_nacimiento'),'yyyy-MM-dd', 'en'),Validators.required)
    });

    this.formPassword = new FormGroup({
      confirmPass: new FormControl('',Validators.required),
      newPass: new FormControl('',Validators.required)
    });
  }

  saveUserInfo(){
    this.service.updateUserInfo(this.formUserInfo.value).
    subscribe((resp:any)=>{
      console.log(resp);

      if(resp === undefined){
        console.log(resp);
        Swal.fire({
          icon:'error',
          title:'Error',
          text: 'Error, no se han podido guardar los cambios'
        });
        return false;
      
      }

      if(resp.ok===true){

        Swal.fire({
          icon:'success',
          title:'Success',
          text: 'Cambios guardados'
        });
        return true;
      }



    },err=>{
      console.log(err);
    });
  }

  saveUserPassword(){

    if(this.formPassword.value.newPass !== this.formPassword.value.confirmPass){
      Swal.fire({
        icon:'error',
        title:'Error',
        text: 'Las contrasenias no coinciden'
      });
      return false;
    }

    

    const user = {
      nombres:localStorage.getItem('nombre'),
      apellidos:localStorage.getItem('apellido'),
      usuario:localStorage.getItem('username'),
      dpi: localStorage.getItem('dpi'),
      correo: localStorage.getItem('correo'),
      fecha_nacimiento: localStorage.getItem('fecha_nacimiento')[8]+localStorage.getItem('fecha_nacimiento')[9]+'/'+localStorage.getItem('fecha_nacimiento')[5]+localStorage.getItem('fecha_nacimiento')[6]+'/'+localStorage.getItem('fecha_nacimiento')[0]+localStorage.getItem('fecha_nacimiento')[1]+localStorage.getItem('fecha_nacimiento')[2]+localStorage.getItem('fecha_nacimiento')[3] ,
      password: this.formPassword.value.newPass,
      password2: this.formPassword.value.confirmPass
    }


    this.service.updateUserPassword(user).
    subscribe((resp:any)=>{
      if(resp.ok===true){
        Swal.fire({
          icon:'success',
          title:'Success',
          text: 'Nueva contrasnia guardada'
        });
        this.formPassword['newPass'] = '';        
        return true;
      }
    },err=>{
      console.log(err);
    });
  }

}
