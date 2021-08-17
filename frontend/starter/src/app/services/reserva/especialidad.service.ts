import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Especialidad } from 'src/app/interfaces/reserva/especialidad';
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
export class EspecialidadService {
  constructor(private httpClient: HttpClient,private authService:AuthService) {}
  
  /** CRUD METHODS */
  getAll(CodigoArea:any):Observable<any> {
    return this.httpClient.get<Especialidad[]>(`${environment.apiUrl}/especialidadArea/findByArea/${CodigoArea}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
}
