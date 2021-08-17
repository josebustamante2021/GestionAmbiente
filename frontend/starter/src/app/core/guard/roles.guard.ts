import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {
  constructor(private router:Router,private authService: AuthService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const expectedRole = route.data.expectedRole;
      if(expectedRole){
        //let usuario=this.authService.getCurrentUsuario();
        const roles=this.authService.getRoles();
        let isAdmin=false;

        if(roles.includes(expectedRole)){
          isAdmin=true;
        }
        if(isAdmin==false){
          this.router.navigate(['/401']);
        }
        }
    return true;
  }
  
}
