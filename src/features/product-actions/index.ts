import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDialog, TuiDialogService, TuiInput } from '@taiga-ui/core';
import { TUI_CONFIRM } from '@taiga-ui/kit';

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
  private formBuilder = inject(FormBuilder);
  protected productStore = inject(ProductsStoreService);
  private cartStore = inject(CartStoreService);
  private dialogs = inject(TuiDialogService);

  protected form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    price: [null as number | null, [Validators.required, Validators.min(1)]],
    vat: [null as number | null, [Validators.required, Validators.min(0), Validators.max(100)]],
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

    const values = this.form.getRawValue();

    if (values.name === null || values.price === null || values.vat === null) {
      return;
    }

    this.productStore.editProduct(this.product().id, {
      name: values.name,
      price: values.price,
      vat: values.vat,
    });
    this.open.set(false);
  }

  protected handleDelete() {
    const product = this.product();

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Удалить товар?',
        size: 'm',
        data: {
          content: `Товар «${product.name}» будет удален без возможности восстановления.`,
          yes: 'Удалить',
          no: 'Отмена',
          appearance: ['negative', 'secondary'],
        },
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.productStore.delProduct(product.id);
        }
      });
  }

  protected inCart() {
    return this.cartStore.getCartItems().find((obj) => obj.id === this.product().id);
  }

  protected handleToCart() {
    this.cartStore.updateCart(this.product());
  }
}
