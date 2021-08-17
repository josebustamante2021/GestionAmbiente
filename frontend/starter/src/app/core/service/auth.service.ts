import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/interfaces/usuario';
import { Authentication } from 'src/app/interfaces/Authentication';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import * as _ from 'lodash';
const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
  })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private TOKEN_NAME:string = 'upsjb_reserva';
  private helper:JwtHelperService;/*
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;*/
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;
  public currentUsuario: Usuario;

  constructor(private http: HttpClient, private router: Router) {
    
    this.helper = new JwtHelperService();
    this.currentUserSubject = new BehaviorSubject<Usuario>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    

  }
  public get currentUserValue(): any {  
    return this.currentUserSubject.value;    
  }

  loginServer(authentication:Authentication) {
    return this.http
      .post<any>(`${environment.apiUrl}/login`, authentication, httpOptions)
      .pipe(
        map((user) => {
          if(user.status==1){
            this.setAuthentication(user.accessToken);
          }
          return user;
        })
      );
  }
  registerServer(authentication:Authentication) {
    return this.http
      .post<any>(`${environment.apiUrl}/register`, authentication, httpOptions)
      .pipe(
        map((user) => {
          /*if(user.status==1){
            this.setAuthentication(user.accessToken);
          }*/
          return user;
        })
      );
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/authenticate`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem(this.TOKEN_NAME);
    this.router.navigate(['/authentication/signin']);
    return of({ success: false });
  }

  setAuthentication(token:string){
    localStorage.setItem(this.TOKEN_NAME,token);
    const decoded = this.helper.decodeToken(token);
    decoded.user.token=token;
    decoded.user.img="assets/images/user/admin.jpg";
    localStorage.setItem("currentUser",JSON.stringify(decoded.user));
    this.currentUserSubject.next(decoded.user);
  }
  getToken(){
    return localStorage.getItem(this.TOKEN_NAME);
  }

  getUser(){
    const decoded = this.helper.decodeToken(this.getToken());
    return decoded.user;
  }

  getRoles(){
    const decoded = this.helper.decodeToken(this.getToken());
    return decoded.authorities;
  }

  idAuthenticated():boolean{
    const token = this.getToken();
    if(_.isNil(token) || token=='null') {
      return false;
    }
    return !this.helper.isTokenExpired(token);
  }
}
