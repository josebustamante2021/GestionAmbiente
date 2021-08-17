import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Authentication } from 'src/app/interfaces/Authentication';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-adminsignin',
  templateUrl: './adminsignin.component.html',
  styleUrls: ['./adminsignin.component.sass']
})
export class AdminsigninComponent implements OnInit {
  authentication:Authentication;
  authForm: FormGroup;
  error = '';
  hide = true;
  
  loggedIn = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService, private http: HttpClient) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
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


  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

}
