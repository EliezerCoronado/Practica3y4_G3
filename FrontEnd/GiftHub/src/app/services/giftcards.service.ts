import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GiftcardsService {
  private SERVER_URL = "https://my-json-server.typicode.com/CoffeePaw/AyD1API"
  private SERVER_NODE =  "http://localhost:3000/api"
  constructor(private http:HttpClient) { }


  username:string;
  token: string;
  id:string;
  firstName: string;
  lastName: string;
  dpi: string;
  email: string;
  fecha_nacimiento: string;



  cargarStorage(){
    if ( localStorage.getItem('token') ){
      this.token = localStorage.getItem('token');
      this.id = localStorage.getItem('id');
      this.username = localStorage.getItem('username');
      this.firstName = localStorage.getItem('nombre');
      this.lastName = localStorage.getItem('apellido');
      this.dpi = localStorage.getItem('dpi');
      this.email = localStorage.getItem('correo');
      this.fecha_nacimiento = localStorage.getItem('fecha_nacimiento')
    }else{
      this.token = '';
      this.id = '';
      this.username = '';
      this.firstName = '';
      this.lastName = '';
      this.dpi = '';
      this.email='';
      this.fecha_nacimiento='';
    }
  }

  saveStorage(username:string, 
              token:string, 
              firstName:string,
              lastName:string,
              dpi:string,
              id:string,
              fecha_nacimiento:string,
              correo:string){
    localStorage.setItem('username',username);
    localStorage.setItem('token', token);
    localStorage.setItem('nombre', firstName);
    localStorage.setItem('apellido', lastName);
    localStorage.setItem('dpi',dpi);
    localStorage.setItem('id',id);
    localStorage.setItem('fecha_nacimiento',fecha_nacimiento);
    localStorage.setItem('correo',correo);
    
  }

  estaLogueado(){
    this.cargarStorage();
    if (this.token.length > 10){
      console.log('esta logueado pe');
      return true;
    }else{
      return false;
    }
  }


  public getCards(){
  const url = this.SERVER_URL + '/Card'
  return this.http.get(url);
  }

  public getValue(){
    const url = this.SERVER_URL + '/Value'
    return this.http.get(url);
    }

    
  public getTasa(){
    const url = this.SERVER_URL + '/TasaCambio'
    return this.http.get(url);
    }

  public validarToken(){
    return false;
  }

  public crearUsuario(forma:any){
    const usuario = {
      nombres:forma.userName,
      apellidos:forma.lastName,
      usuario:forma.user,
      dpi: forma.dpi,
      correo: forma.email,
      fecha_nacimiento:forma.edad[8]+forma.edad[9]+'/'+forma.edad[5]+forma.edad[6]+'/'+forma.edad[0]+forma.edad[1]+forma.edad[2]+forma.edad[3],
      password:forma.password
    }

    const url = this.SERVER_NODE + '/usuarios';
    return this.http.post(url,usuario);

  }

  public login(forma:any){
    const usuario = {
      usuario: forma.userName,
      password: forma.password
    }

    const url = this.SERVER_NODE + '/login';
    return this.http.post(url,usuario).pipe(
      map((resp:any)=>{

        if (resp.data === true || resp.ok===true){
          this.saveStorage(resp.datos_usuario.username,
                           resp.token, 
                           resp.datos_usuario.Nombres,
                           resp.datos_usuario.Apellidos,
                           resp.datos_usuario.dpi,
                           resp.datos_usuario.id_usuario,
                           resp.datos_usuario.fecha_nacimiento,
                           resp.datos_usuario.correo
                           );
         console.log(resp);
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
         console.log(err);
         return false;
   
       }
         
      ));
  }
    



}
