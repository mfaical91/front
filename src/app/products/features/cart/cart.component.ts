import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../../shared/data-access/cart.service';
import { CartItem } from '../../../shared/data-access/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './cart.component.html',
})
export class CartComponent {

  cartService = inject(CartService);

   items = this.cartService.items;

  remove(item: CartItem) {
    this.cartService.remove(item.product.id);
  }
}
