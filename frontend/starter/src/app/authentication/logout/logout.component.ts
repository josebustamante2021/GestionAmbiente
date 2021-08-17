import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {

  constructor( private authService: AuthService, private authMsalService: MsalService) { 
    this.authMsalService.logoutPopup({
      mainWindowRedirectUri: "/"
    });
    //this.authMsalService.logout();
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authService.logout();
  }

}
