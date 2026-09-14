import { computed, effect, Injectable, signal } from '@angular/core';

import { Product } from '../../types';
import { ls } from '../../configs';

const getCart = () => {
  const lsItems = localStorage.getItem(ls.cart);

  if (lsItems) {
    return JSON.parse(lsItems) as Product[];
  } else {
    return [];
  }
};

@Injectable({
  providedIn: 'root',
})
export class CartStoreService {
  private items = signal<Product[]>(getCart());

  constructor() {
    effect(() => {
      const cartItems = this.items();

      if (cartItems.length) {
        localStorage.setItem(ls.cart, JSON.stringify(cartItems));
      } else {
        localStorage.removeItem(ls.cart);
      }
    });
  }

  readonly getCartItems = this.items.asReadonly();

  readonly getCartLength = computed(() => (this.items().length ? this.items().length : ''));

  readonly getCartPrice = computed(() => this.items().reduce((a, v) => (a += v.price), 0));

  public updateCart(item: Product) {
    const findItem = this.items().find((obj) => obj.id === item.id);

    if (findItem) {
      return this.items.update((items) => items.filter((obj) => obj.id !== item.id));
    }

    return this.items.update((items) => [...items, item]);
  }

  public clearCart() {
    this.items.set([]);
  }
}
