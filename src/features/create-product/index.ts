import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TuiButton, TuiDialog, TuiInput } from '@taiga-ui/core';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { ProductsStoreService } from '../../shared/services';

@Component({
  selector: 'create-product',
  templateUrl: './create-product.html',
  styleUrl: './create-product.scss',
  imports: [TuiButton, TuiDialog, TuiInput, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProduct {
  protected readonly open = signal(false);
  private formBuilder = inject(NonNullableFormBuilder);
  protected productsStore = inject(ProductsStoreService);

  protected form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    price: [0, [Validators.required, Validators.min(1)]],
    vat: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
  });

  protected handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    const values = this.form.getRawValue();

    this.productsStore.addProduct({
      name: values.name,
      price: values.price,
      vat: values.vat,
    });

    this.open.set(false);
  }
}
