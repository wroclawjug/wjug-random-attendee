import {Component} from '@angular/core';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from './auth.config';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  logoImage: any = '/assets/img/WroclawJUG.png';

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
  }
}
