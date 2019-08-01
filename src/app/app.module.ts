import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpClientModule, HttpClientJsonpModule} from "@angular/common/http";


// import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from "./app.component";
import {AttendeesService} from "./attendees/attendees.service";
import {AttendeesComponent} from "./attendees/attendees.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    // AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AttendeesComponent
  ],
  providers: [
    AttendeesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
