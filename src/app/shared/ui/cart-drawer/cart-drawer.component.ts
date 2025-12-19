import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CartService, CartItem } from '../../data-access/cart.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, SidebarModule, ButtonModule],
  templateUrl: './cart-drawer.component.html',
})
export class CartDrawerComponent {
  // Signal pour contrôler la visibilité du drawer
  visible = signal(false);

  // Computed pour suivre les items du panier
  items = computed(() => this.cart.items());

  // Quantité totale des produits
  totalQuantity = computed(() =>
    this.items().reduce((sum, i) => sum + i.quantity, 0)
  );

  constructor(private cart: CartService) {}

  // Supprimer un produit du panier
  remove(productId: number) {
    this.cart.remove(productId);
  }

  // Vider le panier
  clear() {
    this.cart.clear();
  }

  // Ouvrir le drawer
  open() {
    this.visible.set(true);
  }

  // Fermer le drawer
  close() {
    this.visible.set(false);
  }
}
