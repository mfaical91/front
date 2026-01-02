import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CartService, CartItem } from '../../../shared/data-access/cart.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    InputNumberModule,
    FormsModule,
    CardModule
  ],
  templateUrl: './cart-drawer.component.html',
})
export class CartDrawerComponent {

  visible = signal(false);

  private cart = inject(CartService);

  // items du panier (signal)
  items = this.cart.items;

  // Quantité totale
  totalQuantity = computed(() =>
    this.items().reduce((sum, i) => sum + i.quantity, 0)
  );

  open() {
    this.visible.set(true);
  }

  close() {
    this.visible.set(false);
  }

  updateQuantity(item: CartItem) {
    this.cart.updateQuantity(item.product, item.quantity);
  }

  remove(item: CartItem) {
    this.cart.remove(item.product);
  }
}
