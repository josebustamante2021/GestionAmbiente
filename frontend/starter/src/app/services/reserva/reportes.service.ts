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
export class ReservaReportesService {
 
  constructor(private httpClient: HttpClient,private authService:AuthService) {}
  
  /** CRUD METHODS */
  
  turnosAll():Observable<any> {
    return this.httpClient.get<any>('assets/data/turno.json'
    );
  }
  turnos():Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/simulacion/reportes/turnos`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  }
  horas(flgTurno:any):Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/simulacion/reportes/horas/${flgTurno}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  }
  asignacionHorarios(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/simulacion/reportes/asignacionHorarios`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  asignacionHorarios_donwload(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/simulacion/reportes/asignacionHorarios/download`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  }  
  disponibilidadHorarios(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/simulacion/reportes/disponibilidadHorarios`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  disponibilidadHorarios_donwload(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/simulacion/reportes/disponibilidadHorarios/download`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  capacidadOciosa(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/simulacion/reportes/capacidadOciosa`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  capacidadOciosa_donwload(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/simulacion/reportes/capacidadOciosa/download`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  ocupabilidadAmbiente(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/simulacion/reportes/ocupabilidadAmbiente`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  }  
  ocupabilidadAmbiente_download(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/simulacion/reportes/ocupabilidadAmbiente/download`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
}
