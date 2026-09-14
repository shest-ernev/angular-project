import { effect, Injectable, signal } from '@angular/core';

import { Product, Purchase } from '../../types';
import { auth, ls } from '../../configs';

const getPurchase = () => {
  const items = localStorage.getItem(ls.purchase);

  if (items) {
    return JSON.parse(items) as Purchase[];
  } else {
    return [];
  }
};

@Injectable({
  providedIn: 'root',
})
export class PurchaseStoreService {
  private purchase = signal<Purchase[]>(getPurchase());

  constructor() {
    effect(() => {
      const items = this.purchase();

      if (!!items.length) {
        localStorage.setItem(ls.purchase, JSON.stringify(items));
      } else {
        localStorage.removeItem(ls.purchase);
      }
    });
  }

  public getPurchase = this.purchase.asReadonly();

  public addPurchase(products: Product[]) {
    const names = products.map((obj) => obj.name).join(', ');
    const amount = products.reduce((a, v) => a + v.price + (v.price * v.vat) / 100, 0);

    this.purchase.update((items) => [
      ...items,
      {
        productName: names,
        date: new Date().toDateString(),
        amount,
        username: auth.login,
        id: !!items[items.length - 1] ? items[items.length - 1].id + 1 : 0,
      },
    ]);
  }
}
