import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TuiButton, TuiDropdown } from '@taiga-ui/core';
import { TuiObscured } from '@taiga-ui/cdk/directives/obscured';

import { CartStoreService, PurchaseStoreService } from '../../shared/services';

@Component({
  selector: 'cart',
  styleUrl: './cart.scss',
  templateUrl: './cart.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiButton, TuiDropdown, TuiObscured],
})
export class Cart {
  protected readonly open = signal(false);
  protected cartStore = inject(CartStoreService);
  protected purchaseStore = inject(PurchaseStoreService);

  protected handleBuy() {
    this.purchaseStore.addPurchase(this.cartStore.getCartItems());
    this.cartStore.clearCart();
    this.open.set(false)
  }
}
