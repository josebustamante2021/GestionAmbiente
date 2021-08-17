import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ciclo } from 'src/app/interfaces/reserva/ciclos';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/service/auth.service';
const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
  })
};
@Injectable()
export class AsignacionManualService {
  constructor(private httpClient: HttpClient,private authService:AuthService) {}
  
  /** CRUD METHODS */
  getCiclos(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/asignacion-ambientes/manual/progAcademica/ciclos`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  getProgAcademica(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/asignacion-ambientes/manual/progAcademica`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  getProgAcademicaAll(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/asignacion-ambientes/manual/progAcademicaAll`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  getProgHorario(codigoAca:number):Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/asignacion-ambientes/manual/progAcademica/horarios/${codigoAca}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  getProduccion(codigoAca:number):Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/asignacion-ambientes/manual/produccion/horarios/${codigoAca}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  reproceso(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/asignacion-ambientes/reproceso/progAcademica`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  reprocesoEliminacionMasiva(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/asignacion-ambientes/reproceso/eliminacionMasiva`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  reprocesoQuitarAmbienteAllHorarios(CodigoAca:any,idLogin:number):Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiUrl}/asignacion-ambientes/reproceso/quitarAmbiente/progAcademica/${CodigoAca}/${idLogin}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  reprocesoQuitarAmbiente(ProgramacionHorarioID:any,idLogin:number):Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiUrl}/asignacion-ambientes/reproceso/quitarAmbiente/${ProgramacionHorarioID}/${idLogin}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  buscarAmbiente(ProgramacionHorarioID:number,CodigoAca:number):Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/asignacion-ambientes/manual/buscarAmbiente/${ProgramacionHorarioID}/${CodigoAca}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  asignarAmbiente(ProgramacionHorarioID:number,AmbienteID:number,idLogin:number):Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/asignacion-ambientes/manual/asignarAmbiente/${ProgramacionHorarioID}/${AmbienteID}/${idLogin}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  cambiarCapacidad(CodigoAca:number,Capacidad:number,CapacidadDocente:number,idLogin:number):Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/asignacion-ambientes/manual/cambiarCapacidad/${CodigoAca}/${Capacidad}/${CapacidadDocente}/${idLogin}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  }  
  cambiarCapacidadxGrupo(CapacidadGrupoID:number,CodigoAca:number,Capacidad:number,CapacidadDocente:number,idLogin:number):Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/asignacion-ambientes/manual/cambiarCapacidadxGrupo/${CapacidadGrupoID}/${CodigoAca}/${Capacidad}/${CapacidadDocente}/${idLogin}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  selectCapacidadGrupo(CodigoAca:number):Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/asignacion-ambientes/manual/progAcademica/capacidadxGrupo/${CodigoAca}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
}
