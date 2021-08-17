import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Authentication } from 'src/app/interfaces/Authentication';
import { MsalBroadcastService, MsalService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionStatus, PopupRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
type ProfileType = {
  displayName?: string,
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  authentication:Authentication;
  authForm: FormGroup;
  error = '';
  hide = true;
  
  loggedIn = false;
  profile!: ProfileType;
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService, private authMsalService: MsalService, private http: HttpClient, private broadcastService: MsalBroadcastService, 
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
   
    this.isIframe = window !== window.parent && !window.opener;

    this.broadcastService.inProgress$
    .pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      takeUntil(this._destroying$)
    )
    .subscribe(() => {console.log("open broadcastService ");
      this.setLoginDisplayR();
    })
  }
  get f() {
    return this.authForm.controls;
  }
  /*onSubmit() {
    this.submitted = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {
    }
  }*/
  login(){console.log("login.........");
    if (this.msalGuardConfig.authRequest){
      this.authMsalService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
        .subscribe({
          next: (result) => {
            console.log(result);console.log("open login 1 ");
            this.setLoginDisplay();
          },
          error: (error) => console.log("error1")
        });
    } else {
      this.authMsalService.loginPopup()
        .subscribe({
          next: (result) => {
            console.log(result);console.log("open login 2 ");
            this.setLoginDisplay();
          },
          error: (error) => console.log("error2")
        });
    }
  
  }

  
  logout() {
    this.authMsalService.logoutPopup({
      mainWindowRedirectUri: "/"
    });
  }
  formSubmit(){
    this.authentication= {usuario:this.authForm.controls.username.value,contrasena:this.authForm.controls.password.value,firstName:"",lastName:"",userPrincipalName:""};
          this.authService
            .loginServer(this.authentication)
            .subscribe(
              (res) => {
                if (res) {
                  if(res.status==1){
                    const roles=this.authService.getRoles();
                    console.log(roles);
                    this.router.navigate(['/admin/dashboard/main']);
                  }if(res.status==2){
                    this.error = "El usuario no existe";
                  }else{
                    this.error = res.message;
                  }
                } else {
                  this.error = 'Ocurrio un error. Intentelo más tarde.';
                }
              },
              (error) => {
              console.log(error)
              this.error = 'Ocurrio un error en la conexion.';
              }
            ),(error) => {
              console.log("error...**");
            };
  }
  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
        if(this.profile.id!=null){
          this.authentication= {usuario:this.profile.id,contrasena:this.profile.id,firstName:this.profile.givenName,lastName:this.profile.surname,userPrincipalName:this.profile.userPrincipalName};
          this.authService
            .loginServer(this.authentication)
            .subscribe(
              (res) => {
                if (res) {
                  if(res.status==1){
                    const roles=this.authService.getRoles();
                    console.log(roles);
                    this.router.navigate(['/admin/dashboard/main']);
                  }if(res.status==2){
                    this.error = "Registrando...";
                    this.registrar();
                  }else{
                    this.error = res.message;
                  }
                } else {
                  this.error = 'Ocurrio un error. Intentelo más tarde.';
                }
              },
              (error) => {
              console.log(error)
              this.error = 'Ocurrio un error en la conexion.';
              }
            ),(error) => {
              console.log("error...**");
            };
        }
      });
  }

  setLoginDisplayR() {
    this.loginDisplay = this.authMsalService.instance.getAllAccounts().length > 0;
  }

  setLoginDisplay() {
    this.loginDisplay = this.authMsalService.instance.getAllAccounts().length > 0;
    if(this.loginDisplay){ 
      this.getProfile();
    }
    console.log(this.loginDisplay);
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  registrar(){
    if(this.profile.id!=null){
      this.authentication= {usuario:this.profile.id,contrasena:this.profile.id,firstName:this.profile.givenName,lastName:this.profile.surname,userPrincipalName:this.profile.userPrincipalName};
      console.log( this.authentication);
      this.authService
      .registerServer(this.authentication)
      .subscribe(
        (res) => {
          if (res) {
            if(res.status==1){
              this.error = "Su usuario a sido registrado. Reportar con el Administrador encargado le brinde permisos para ingresar al sistema.";
            }else if(res.status==2){
              this.error = "Su usuario Ya existe. Reportar con el Administrador encargado le brinde permisos para ingresar al sistema.";
            }else{
              this.error = "Ocurrio un error al registrar su usuario. Intentelo más tarde.";
            }
          } else {
            this.error = 'Ocurrio un error. Intentelo más tarde.';
          }
        },
        (error) => {
        console.log(error);
          this.error = error;
        }
      ),(error) => {
        console.log("error...**");
      };
    }
  }
}
