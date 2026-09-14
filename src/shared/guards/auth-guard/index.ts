import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthStoreService } from '../../services';
import { routes } from '../../configs';

export const authGuard: CanActivateFn = (_, state) => {
  const authStore = inject(AuthStoreService);
  const router = inject(Router);

  const getAuth = authStore.getAuth;
  const isLoginPage = state.url.includes(routes.login);

  if (isLoginPage && getAuth()) {
    return router.createUrlTree([routes.catalog]);
  }

  if (!isLoginPage && !getAuth()) {
    return router.createUrlTree([routes.login]);
  }

  return true;
};
