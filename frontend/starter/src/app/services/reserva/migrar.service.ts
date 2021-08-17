import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/service/auth.service';
import { SimulacionReserva } from 'src/app/interfaces/reserva/simulacionReserva';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
  })
};
@Injectable()
export class MigrarService {

  constructor(private httpClient: HttpClient,private authService:AuthService) {}
  
  getAll():Observable<any> {
    return this.httpClient.get<SimulacionReserva[]>(`${environment.apiUrl}/migrar/findAll`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  Inconsistencias(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/migrar/validarInconsistencias`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  replicaGetAll():Observable<any> {
    return this.httpClient.get<SimulacionReserva[]>(`${environment.apiUrl}/migrar/sincronizar/findAll`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
/*  replicar(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/migrar/sincronizar`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } */
  migrar(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/migrar/procesarMigracion`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  existe(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/migrar/existe`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 


  
}
