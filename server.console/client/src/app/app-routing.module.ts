import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SendEmailComponent } from './components/send-email/send-email.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { StatusPageComponent } from './components/status-page/status-page.component';
import { AuthGuard } from './services/auth/auth.guard';


const ROUTES: Routes = [
  { path: 'login', component: LoginComponent, },
  { path: 'logout', component: LogoutComponent },

  // home route protected by auth guard
  {
    path: 'pages',
    component: SideBarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'status', component: StatusPageComponent },
      { path: 'sendEmail', component: SendEmailComponent },
    ]
  },
  { path: '', redirectTo: '/pages/home', pathMatch: 'full' },
  // otherwise redirect to login
  { path: '**', redirectTo: 'login' }
];
export const routing = RouterModule.forRoot(ROUTES);

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
