import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
//  configurar url del backend
  private myAppUrl='https://localhost:44339/';
  private myApiUrl='api/Tarjeta/';
  constructor(private http:HttpClient) { }


  //conexion con el end-point para listar
    getListarTarjetas():Observable<any>{
      return this.http.get(this.myAppUrl+this.myApiUrl);
    }

    //conexion con el end-point pra eliminar
    eliminarTarjeta(id:number):Observable<any>{
      return this.http.delete(this.myAppUrl+this.myApiUrl+id);
    }
   //conexion con el end-point para crear 
  
   crearTarjeta(tarjeta:any):Observable<any>{
    return this.http.post(this.myAppUrl+this.myApiUrl,tarjeta);
  }

   //conexion con el end-point para actualizar
  
   actualizarTarjeta(id:number,tarjeta:any):Observable<any>{
    return this.http.put(this.myAppUrl+this.myApiUrl+id,tarjeta);
  }

  
}
