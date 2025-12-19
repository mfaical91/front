import { Component, inject } from '@angular/core';
import { CartService } from '../../data-access/cart.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  cartService = inject(CartService);
}
