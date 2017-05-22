import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AttendeesComponent} from "./attendees/attendees.component";

const routes: Routes = [
  {path: '', redirectTo: '/attendees', pathMatch: 'full'},
  {path: 'attendees', component: AttendeesComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
