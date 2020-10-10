import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GiftcardsService {
  private SERVER_URL = "https://my-json-server.typicode.com/CoffeePaw/AyD1API"

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
    



}
