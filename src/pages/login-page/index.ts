import { Component } from '@angular/core';

import { LoginForm } from '../../features';

@Component({
  selector: 'login-page',
  styleUrl: './login-page.scss',
  templateUrl: './login-page.html',
  imports: [LoginForm],
})
export class LoginPage {}
