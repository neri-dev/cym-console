import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-logout',
  template:''
})
export class LogoutComponent implements OnInit {

  constructor(private _authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this._authService.logout();
    this.router.navigate(['login']);
  }
}
