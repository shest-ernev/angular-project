import { Component, inject } from '@angular/core';

import { AuthStoreService } from '../../shared/services';
import { routes } from '../../shared/configs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'not-found-page',
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss',
  imports: [RouterLink],
})
export class NotFoundPage {
  private authStore = inject(AuthStoreService);

  protected isAuth = this.authStore.getAuth();

  readonly href = this.isAuth ? routes.catalog : routes.login;
}
