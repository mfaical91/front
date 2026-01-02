import { Injectable, signal,computed } from '@angular/core';
import { Product } from 'app/products/data-access/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {

  private _items = signal<CartItem[]>([]);
  items = this._items.asReadonly();

    totalQuantity = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  add(product: Product, qty: number = 1) {
    this._items.update(items => {
      const existing = items.find(i => i.product.id === product.id);

      if (existing) {
        existing.quantity = Math.min(
          existing.quantity + qty,
          product.quantity
        );
      } else {
        items.push({
          product,
          quantity: Math.min(qty, product.quantity)
        });
      }
      return [...items];
    });
  }

  updateQuantity(product: Product, qty: number) {
    this._items.update(items =>
      items.map(i =>
        i.product.id === product.id
          ? { ...i, quantity: Math.max(1, Math.min(qty, product.quantity)) }
          : i
      )
    );
  }

  remove(product: Product) {
    this._items.update(items =>
      items.filter(i => i.product.id !== product.id)
    );
  }
}
