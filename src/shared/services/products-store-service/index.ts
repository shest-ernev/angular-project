import { computed, effect, Injectable, signal } from '@angular/core';

import { ls } from '../../configs';
import { Product } from '../../types';
import { defaultProducts } from '../../constants';

const getProducts = () => {
  const products = localStorage.getItem(ls.products);

  if (products) {
    return JSON.parse(products) as Product[];
  } else {
    return defaultProducts;
  }
};

@Injectable({
  providedIn: 'root',
})
export class ProductsStoreService {
  private products = signal<Product[]>(getProducts());

  constructor() {
    effect(() => {
      const items = this.products();

      localStorage.setItem(ls.products, JSON.stringify(items));
    });
  }

  public getProducts = computed(() => this.products());

  public addProduct(item: Omit<Product, 'id'>) {
    this.products.update((items) => [
      ...items,
      {
        id: items[items.length - 1].id + 1,
        ...item,
      },
    ]);
  }

  public delProduct(id: number) {
    this.products.update((items) => items.filter((obj) => obj.id !== id));
  }

  public editProduct(id: number, data: Omit<Partial<Product>, 'id'>) {
    this.products.update((items) =>
      items.map((obj) => {
        if (obj.id === id) {
          return {
            id: obj.id,
            name: data.name || obj.name,
            price: data.price || obj.price,
            vat: data.vat || obj.vat,
          };
        }

        return obj;
      }),
    );
  }
}
