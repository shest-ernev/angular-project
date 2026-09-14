import { Component, inject } from '@angular/core';
import { TuiInput, TuiButton } from '@taiga-ui/core';
import { TuiToast, TuiToastService } from '@taiga-ui/kit';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthStoreService } from '../../shared/services';
import { routes } from '../../shared/configs';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.html',
  styleUrl: './loign-form.scss',
  imports: [TuiInput, TuiButton, ReactiveFormsModule, TuiToast],
})
export class LoginForm {
  private formBuilder = inject(NonNullableFormBuilder);
  protected readonly toast = inject(TuiToastService);
  private authStore = inject(AuthStoreService);
  private router = inject(Router);

  protected form = this.formBuilder.group({
    login: ['', Validators.required],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.pattern(/^[a-zA-Z0-9]+$/)],
    ],
  });

  protected handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    const values = this.form.getRawValue();

    const isLogin = this.authStore.login(values);

    if (!isLogin) {
      this.toast
        .open('Не правильный логин или пароль', {
          autoClose: 0,
        })
        .subscribe();

      return;
    }

    this.router.navigate([routes.catalog]);
  }
}
