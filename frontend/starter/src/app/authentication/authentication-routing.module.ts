import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockedComponent } from './locked/locked.component';
import { Page404Component } from './page404/page404.component';
import { Page401Component } from './page401/page401.component';
import { Page500Component } from './page500/page500.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthLoginGuard } from 'src/app/core/guard/auth-login.guard';
import { AdminsigninComponent } from './adminsignin/adminsignin.component';
const routes: Routes = [
  {
    path: '',
    component: SigninComponent,
    pathMatch: 'full'
  },
  {
    path: 'signin',
    canActivate:[AuthLoginGuard],
    component: SigninComponent
  },
  {
    path: 'admin',
    canActivate:[AuthLoginGuard],
    component: AdminsigninComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'locked',
    component: LockedComponent
  },
  {
    path: 'page404',
    component: Page404Component
  },
  {
    path: '401',
    component: Page401Component
  },
  {
    path: 'page500',
    component: Page500Component
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
