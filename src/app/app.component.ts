import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';

import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { CartBadgeComponent } from "./shared/ui/cart-badge/cart-badge.component";
import { CartDrawerComponent } from './shared/ui/cart-drawer/cart-drawer.component';

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [
    RouterModule,
    SplitterModule,
    ToolbarModule,
    ToastModule,
    PanelMenuComponent,
    CartBadgeComponent,
    CartDrawerComponent
  ],
})
export class AppComponent {
  title = "ALTEN SHOP";
}
