import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';

import { Cart } from '../../features';
import { routes } from '../../shared/configs';
import { AuthStoreService } from '../../shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  imports: [RouterLink, RouterLinkActive, Cart, TuiButton],
})
export class Header {
  private authStore = inject(AuthStoreService);
  private router = inject(Router);
  protected isBurderOpen = signal(false);

  protected getAuth = this.authStore.getAuth;

  protected links = [
    {
      name: 'Каталог',
      href: routes.catalog,
    },
    {
      name: 'Покупки',
      href: routes.purchase,
    },
  ];

  protected handleLogOut() {
    this.authStore.logOut();

    this.router.navigate([routes.login]);
  }

  protected handleChangeOpenBurger() {
    this.isBurderOpen.update((state) => !state);

    if (this.isBurderOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
  }
}
