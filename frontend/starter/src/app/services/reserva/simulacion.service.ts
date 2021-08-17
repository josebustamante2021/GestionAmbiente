import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/service/auth.service';
import { SimulacionReserva } from 'src/app/interfaces/reserva/simulacionReserva';
import { SimulacionProceso } from 'src/app/interfaces/reserva/simulacionProceso';
import { map } from 'rxjs/operators'

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
  })
};
@Injectable()
export class SimulacionReservaService {

  constructor(private httpClient: HttpClient,private authService:AuthService) {}
  
  /** CRUD METHODS */
  simulacion(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/simulacion/ejecutar`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  simulacionProceso(idLogin:number):Observable<any> {
    return this.httpClient.get<SimulacionProceso>(`${environment.apiUrl}/simulacion/proceso/${idLogin}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  cancelarProceso(idSimulacion:number):Observable<any> {
    return this.httpClient.get<SimulacionProceso>(`${environment.apiUrl}/simulacion/cancelarProceso/${idSimulacion}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  anularAsignacion(idSimulacion:number,idLogin:number):Observable<any> {
    return this.httpClient.get<SimulacionProceso>(`${environment.apiUrl}/simulacion/anularAsignacion/${idSimulacion}/${idLogin}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 

  getAll_SimulacionReserva():Observable<any> {
    return this.httpClient.get<SimulacionReserva[]>(`${environment.apiUrl}/simulacion/findAll`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  getAll_ProgramacionAcademica(simulacionID: number):Observable<any> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/simulacion/findAll/${simulacionID}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 

  reporteAmbientesAsignados(request:any):Observable<any>  {
    return this.httpClient.post<any>(`${environment.apiUrl}/simulacion/reportes/ambientes/download/lista`,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  }

  reporteAmbientesAsignados_calendario(request:any):Observable<any>  {
    return this.httpClient.post<any>(`${environment.apiUrl}/simulacion/reportes/ambientes/download/calendario`,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  }
  distribucionTurnos(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/simulacion/reportes/distribucionTurnos`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  validacionTurnos(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/simulacion/reportes/validacionTurnos`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  distribucionTurnos_donwload(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/simulacion/reportes/distribucionTurnos/download`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  validacionTurnos_donwload(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/simulacion/reportes/validacionTurnos/download`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 


  
}
