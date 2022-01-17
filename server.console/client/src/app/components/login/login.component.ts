import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService) { }

  submit() {
    if (this.form.valid) {
      const username = this.form.value['username'];
      const password = this.form.value['password'];

      this.authService.login(username, password).subscribe(success => {
        this.error = '';
      }, error => {
        this.error = error.statusText !== null ? "Login failed" : '';
      })
    }
  }
  @Input() error: string | null | undefined;
}
