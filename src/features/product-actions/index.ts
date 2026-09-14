import { Component, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDialog, TuiInput } from '@taiga-ui/core';

import { Product } from '../../shared/types';
import { CartStoreService, ProductsStoreService } from '../../shared/services';

@Component({
  selector: 'product-actions',
  templateUrl: './product-actions.html',
  styleUrl: './product-actions.scss',
  imports: [TuiButton, TuiDialog, TuiInput, ReactiveFormsModule],
})
export class ProductActions {
  readonly product = input.required<Product>();
  protected readonly open = signal(false);
  private formBuilder = inject(NonNullableFormBuilder);
  protected productStore = inject(ProductsStoreService);
  private cartStore = inject(CartStoreService);

  protected form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    price: [0, [Validators.required, Validators.min(1)]],
    vat: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
  });

  protected handleEdit() {
    const product = this.product();

    this.form.setValue({
      name: product.name,
      price: product.price,
      vat: product.vat,
    });
    this.open.set(true);
  }

  protected handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.productStore.editProduct(this.product().id, this.form.getRawValue());
    this.open.set(false);
  }

  protected handleDelete() {
    this.productStore.delProduct(this.product().id);
  }

  protected inCart() {
    return this.cartStore.getCartItems().find((obj) => obj.id === this.product().id);
  }

  protected handleToCart() {
    this.cartStore.updateCart(this.product());
  }
}
