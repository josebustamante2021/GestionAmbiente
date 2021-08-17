import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
export class UsuariosService {
  
  constructor(private httpClient: HttpClient,private authService:AuthService) {}
  /** CRUD METHODS */
  getAll():Observable<any> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/usuarios/findAll`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
/*
  registrarUsuario(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/usuarios/register`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } */

  asignarModulos(request:any):Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/usuarios/credenciales`
    ,request
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  eliminarUsuario(id_login:number):Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiUrl}/usuarios/eliminar/${id_login}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  getRoles(id_login:any,action:any):Observable<any> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/usuarios/findAllRoles/${id_login}/${action}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  asignarRol(id_login:any,id_rol:any):Observable<any> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/usuarios/asignarRol/${id_login}/${id_rol}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  quitarRol(id_login:any,id_rol:any):Observable<any> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/usuarios/quitarRol/${id_login}/${id_rol}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  accesoAlSistema(id_login:any,estado:any):Observable<any> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/usuarios/activarUsuario/${id_login}/${estado}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
}
