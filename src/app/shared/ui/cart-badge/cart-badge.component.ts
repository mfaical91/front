import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { CartService } from '../../data-access/cart.service';

@Component({
  selector: 'app-cart-badge',
  standalone: true,
  imports: [CommonModule, BadgeModule],
  template: `<span class="p-badge" *ngIf="total() > 0">{{ total() }}</span>`
})
export class CartBadgeComponent {
  private cart = inject(CartService);
  total = this.cart.totalQuantity;
}
