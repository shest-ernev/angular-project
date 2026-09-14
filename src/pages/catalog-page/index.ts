import { Component, inject } from '@angular/core';
import { TuiButton, TuiScrollbar } from '@taiga-ui/core';

import { ProductsStoreService } from '../../shared/services';
import { CreateProduct, ProductActions } from '../../features';

@Component({
  selector: 'products-page',
  styleUrl: './catalog-page.scss',
  templateUrl: './catalog-page.html',
  imports: [TuiScrollbar, CreateProduct, ProductActions],
})
export class CatalogPage {
  protected productsStore = inject(ProductsStoreService);

  protected readonly products = this.productsStore.getProducts;
}
