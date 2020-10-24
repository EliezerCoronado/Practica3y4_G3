import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { GiftcardsService } from 'src/app/services/giftcards.service';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';

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
      if(resp.ok===true){
        window.alert("Cambios guardados");
      }else{
        window.alert("Error, no se han podido guardar los cambios");
      }
    },err=>{
      console.log(err);
    });
  }

  saveUserPassword(){
    const user = {
      nombres:localStorage.getItem('nombre'),
      apellidos:localStorage.getItem('apellido'),
      usuario:localStorage.getItem('username'),
      dpi: localStorage.getItem('dpi'),
      correo: localStorage.getItem('correo'),
      fecha_nacimiento: localStorage.getItem('fecha_nacimiento')[8]+localStorage.getItem('fecha_nacimiento')[9]+'/'+localStorage.getItem('fecha_nacimiento')[5]+localStorage.getItem('fecha_nacimiento')[6]+'/'+localStorage.getItem('fecha_nacimiento')[0]+localStorage.getItem('fecha_nacimiento')[1]+localStorage.getItem('fecha_nacimiento')[2]+localStorage.getItem('fecha_nacimiento')[3] ,
      password: this.formPassword.value.newPass
    }

    this.service.updateUserPassword(user).
    subscribe((resp:any)=>{
      if(resp.ok===true){
        window.alert("Cambios guardados");
        this.formPassword['newPass'] = '';
      }else{
        window.alert("Error, no se han podido guardar los cambios");
      }
    },err=>{
      console.log(err);
    });
  }

}
