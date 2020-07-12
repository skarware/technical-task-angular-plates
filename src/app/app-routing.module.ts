import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlateListComponent } from './plates/plate-list/plate-list.component';
import { PlateCreateComponent } from './plates/plate-create/plate-create.component';
import { PlatesComponent } from './plates/plates.component';

// Routes config tells the Router which view to display when a user clicks a link or pastes a URL into the browser address bar.
const routes: Routes = [
  { path: '', component: PlatesComponent },
  { path: 'list-plates', component: PlateListComponent },
  { path: 'create-plate', component: PlateCreateComponent }
];

// The @NgModule metadata initializes the router and starts it listening for browser location changes.
@NgModule({
  /*
   The following line adds the RouterModule to the AppRoutingModule imports array
   and configures the router at the application's root level with the routes in one step
  */
  imports: [ RouterModule.forRoot(routes) ],
  // AppRoutingModule exports RouterModule so it will be available throughout the app.
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
