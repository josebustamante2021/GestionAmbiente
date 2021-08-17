import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Semestre } from 'src/app/interfaces/reserva/semestre';
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
export class SemestreService {
  constructor(private httpClient: HttpClient,private authService:AuthService) {}
 
  /** CRUD METHODS */
  getAll():Observable<any> {
    return this.httpClient.get<Semestre[]>(`${environment.apiUrl}/semestre/findAll`
    ,{headers: new HttpHeaders().append('Authorization',`${this.authService.getToken()}`)}
    );
  } 
}
