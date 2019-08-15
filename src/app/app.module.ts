import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientJsonpModule, HttpClientModule,} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AttendeesService} from './attendees/attendees.service';
import {AttendeesComponent} from './attendees/attendees.component';
import {
  AuthConfig,
  JwksValidationHandler,
  OAuthModule,
  OAuthModuleConfig,
  OAuthStorage,
  ValidationHandler
} from 'angular-oauth2-oidc';

const authModuleConfig: OAuthModuleConfig = {
  resourceServer: {
    allowedUrls: [
      'https://api.meetup.com/',
      'https://cors-anywhere.herokuapp.com/',
    ],
    sendAccessToken: true
  }
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    OAuthModule.forRoot(authModuleConfig),
  ],
  declarations: [
    AppComponent,
    AttendeesComponent
  ],
  providers: [
    AttendeesService,
    {provide: OAuthModuleConfig, useValue: authModuleConfig},
    {provide: ValidationHandler, useClass: JwksValidationHandler},
    {provide: OAuthStorage, useValue: localStorage},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
