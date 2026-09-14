import { Component, inject } from '@angular/core';
import { TuiScrollbar } from '@taiga-ui/core';
import { DatePipe } from '@angular/common';

import { PurchaseStoreService } from '../../shared/services';

@Component({
  selector: 'purchase-page',
  styleUrl: './purchase.scss',
  templateUrl: './purchase-page.html',
  imports: [TuiScrollbar, DatePipe],
})
export class PurchasePage {
  protected purchaseStore = inject(PurchaseStoreService);

  protected readonly purchases = this.purchaseStore.getPurchase;
}
