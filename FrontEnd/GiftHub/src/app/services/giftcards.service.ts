import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GiftcardsService {
  private SERVER_URL = "https://my-json-server.typicode.com/CoffeePaw/AyD1API"
  private SERVER_NODE =  "http://localhost:3000/api"
  constructor(private http:HttpClient) { }

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
      fecha_nacimiento:forma.edad,
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
    return this.http.post(url,usuario);
  }
    



}
