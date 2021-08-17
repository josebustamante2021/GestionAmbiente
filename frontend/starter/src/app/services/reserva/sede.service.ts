import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sede } from 'src/app/interfaces/reserva/sede';
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
export class SedeService {
  constructor(private httpClient: HttpClient,private authService:AuthService) {}
  
  /** CRUD METHODS */
  getAll(FilialID:any):Observable<any> {
    return this.httpClient.get<Sede[]>(`${environment.apiUrl}/sede/filial/findByFilial/${FilialID}`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
}
