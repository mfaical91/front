import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { CartBadgeComponent } from "./shared/ui/cart-badge/cart-badge.component";
import { CartDrawerComponent } from './shared/ui/cart-drawer/cart-drawer.component';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterOutlet, SplitterModule, ToolbarModule, PanelMenuComponent, CartBadgeComponent, CartDrawerComponent,],
})
export class AppComponent {
  title = "ALTEN SHOP";
}