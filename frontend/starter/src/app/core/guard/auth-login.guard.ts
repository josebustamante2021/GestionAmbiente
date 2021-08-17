import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/core/models/role';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const isAuthenticated:boolean = this.authService.idAuthenticated();
      if(isAuthenticated){
        if (this.authService.currentUserValue) {
        const role = this.authService.currentUserValue.role;
        this.router.navigate(['/admin/dashboard']);
        /*if (role === Role.All || role === Role.Admin) {
          this.router.navigate(['/admin/dashboard']);
        } else if (role === Role.Teacher) {
          this.router.navigate(['/teacher/dashboard']);
        } else if (role === Role.Student) {
          this.router.navigate(['/student/dashboard']);
        }else if (role === Role.RAdmin) {
          this.router.navigate(['/admin/dashboard']);
        }*/
        return false;
        }
      }
      return true;

  }

}
