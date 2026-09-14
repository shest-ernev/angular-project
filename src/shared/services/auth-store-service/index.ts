import { effect, Injectable, signal } from '@angular/core';

import { auth, ls } from '../../configs';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private isAuth = signal<boolean>(!!localStorage.getItem(ls.auth));

  constructor() {
    effect(() => {
      const authState = this.isAuth();

      if (authState) {
        localStorage.setItem(ls.auth, 'true');
      } else {
        localStorage.removeItem(ls.auth);
      }
    });
  }

  public getAuth = this.isAuth.asReadonly();

  public login(data: Record<keyof typeof auth, string>) {
    if (data.login === auth.login && data.password === auth.password) {
      this.isAuth.set(true);

      return true;
    }

    return false;
  }

  public logOut() {
    this.isAuth.set(false);
  }
}
