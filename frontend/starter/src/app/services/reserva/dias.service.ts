import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dia } from 'src/app/interfaces/reserva/dia';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
  })
};
@Injectable()
export class DiasService {
    private readonly API_URL = 'assets/data/dias.json';
  constructor(private httpClient: HttpClient) {}

  /** CRUD METHODS */
  getAll():Observable<any> {
    return this.httpClient.get<Dia[]>(this.API_URL);
  } 
}
