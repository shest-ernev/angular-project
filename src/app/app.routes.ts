import { Routes } from '@angular/router';

import { routes } from '../shared/configs';
import { LoginPage, CatalogPage, PurchasePage, NotFoundPage } from '../pages';
import { authGuard } from '../shared/guards';

export const appRoutes: Routes = [
  {
    title: 'Войти',
    path: routes.login,
    component: LoginPage,
    canActivate: [authGuard],
  },
  {
    title: 'Каталог',
    path: routes.catalog,
    component: CatalogPage,
    canActivate: [authGuard],
  },
  {
    title: 'Покупки',
    path: routes.purchase,
    component: PurchasePage,
    canActivate: [authGuard],
  },
  {
    title: ':(',
    path: '**',
    component: NotFoundPage,
  },
];
