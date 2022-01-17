import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  // home route protected by auth guard
  { path: '', component: AppComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
