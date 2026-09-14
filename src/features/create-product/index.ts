import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TuiButton, TuiDialog, TuiInput } from '@taiga-ui/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

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
  private formBuilder = inject(FormBuilder);
  protected productsStore = inject(ProductsStoreService);

  protected form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    price: [null as number | null, [Validators.required, Validators.min(1)]],
    vat: [null as number | null, [Validators.required, Validators.min(0), Validators.max(100)]],
  });

  protected handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    const values = this.form.getRawValue();

    if (values.name === null || values.price === null || values.vat === null) {
      return;
    }

    this.productsStore.addProduct({
      name: values.name,
      price: values.price,
      vat: values.vat,
    });

    this.form.reset({ name: '', price: null, vat: null });

    this.open.set(false);
  }
}
