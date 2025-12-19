import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../../products/data-access/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = signal<CartItem[]>([]);
  items = this._items.asReadonly();

  totalQuantity = computed(() =>
    this._items().reduce((sum, i) => sum + i.quantity, 0)
  );

  add(product: Product) {
    const items = [...this._items()];
    const found = items.find(i => i.product.id === product.id);
    if (found) {
      found.quantity++;
    } else {
      items.push({ product, quantity: 1 });
    }
    this._items.set(items);
  }

  remove(productId: number) {
    this._items.set(this._items().filter(i => i.product.id !== productId));
  }

  clear() {
    this._items.set([]);
  }
}
