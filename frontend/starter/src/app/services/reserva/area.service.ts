import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Area } from 'src/app/interfaces/reserva/area';
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
export class AreaService {
  
  constructor(private httpClient: HttpClient,private authService:AuthService) {}
  
  /** CRUD METHODS */
  getAll():Observable<any> {
    return this.httpClient.get<Area[]>(`${environment.apiUrl}/areas/findAll`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  annosgetAll():Observable<any> {
    return this.httpClient.get<Area[]>(`${environment.apiUrl}/areas/annoProceso/findAll`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
  mesesgetAll():Observable<any> {
    return this.httpClient.get<Area[]>(`${environment.apiUrl}/areas/meses/findAll`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
}
