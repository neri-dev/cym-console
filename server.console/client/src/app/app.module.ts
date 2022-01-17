import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AuthGuard } from './services/auth/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { StatusPageComponent } from './components/status-page/status-page.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SendEmailComponent } from './components/send-email/send-email.component';
import { authInterceptorProviders } from './heplers/auth.interceptor';


const routes: Routes = [
  { path: 'login', component: LoginComponent, },
  { path: 'logout', component: LogoutComponent },

  // home route protected by auth guard
  {
    path: 'home',

    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'status', component: StatusPageComponent},
      { path: 'sendEmail', component: SendEmailComponent},
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    StatusPageComponent,
    SendEmailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [AuthService, AuthGuard, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {

}
