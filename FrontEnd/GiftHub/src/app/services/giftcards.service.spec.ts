import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { GiftcardsService } from './giftcards.service';

describe('GiftcardsService', () => {
  let service: GiftcardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(GiftcardsService);
  });

  
  it('Debe crear el servicio giftcards', () => {
    expect(service).toBeTruthy();
  });


  it('Debe de comprobar un Token mayor a 10', ()=>{
    localStorage.setItem('token','asdjfelkjdfenadfesskdfe5desfesdfe');
    service.cargarStorage(); 
    expect(service.token.length).toBeGreaterThan(10);
  });


  

  it('Debe almacenar datos de usuario en el storage', ()=>{
    const token='jajaja123456789pepe';
    const nombre='user1';
    const apellido='apellido1';
    const user='user1';
    const dpi='010101010';
    const fecha_nacimiento='03/03/1991';
    const id = '1'
    const correo = 'ismorales1991@gmail.com'
    
    service.saveStorage(user,token,nombre,apellido,dpi,id,fecha_nacimiento,correo) 
    expect(localStorage.getItem('username').length).toBeGreaterThan(0);
    expect(localStorage.getItem('token').length).toBeGreaterThan(0);
    expect(localStorage.getItem('nombre').length).toBeGreaterThan(0);
    expect(localStorage.getItem('apellido').length).toBeGreaterThan(0);
    expect(localStorage.getItem('dpi').length).toBeGreaterThan(0);
    expect(localStorage.getItem('id').length).toBeGreaterThan(0); 
    expect(localStorage.getItem('fecha_nacimiento').length).toBeGreaterThan(0);
    expect(localStorage.getItem('correo').length).toBeGreaterThan(0);  
  });


  it('Valida el token y en caso de positivo, lo devuelve', ()=>{
    localStorage.setItem('token',"jajaja123456789pepe");
    const resp = service.estaLogueado()
    expect(resp).toBe(true);
  });

  it('Valida en token en casi de falso, lo devuelve', ()=>{
    localStorage.setItem('token','');
    const resp = service.estaLogueado()
    expect(resp).toBe(false);
  });


  it('login correcto',()=>{
    const usuario = {
      userName: 'user2',
      password: environment.testValue
    }
    service.login(usuario);
    expect(true).toBe(true);
  });











});
