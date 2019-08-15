import {Component} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';
import {environment} from "../environments/environment";

@Component({
  selector: 'my-app',
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  logoImage: string = '/assets/img/WroclawJUG.png';
  location: Location;

  constructor(private oauthService: OAuthService, location: Location) {
    this.location = location;

    const authConfig: AuthConfig = {
      loginUrl: 'https://secure.meetup.com/oauth2/authorize',
      redirectUri: window.location.origin + this.location.prepareExternalUrl('index.html'),
      clientId: environment.oauth2ClientId,
      scope: 'basic',
      oidc: false,
    };

    this.oauthService.configure(authConfig);
  }
}
