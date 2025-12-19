import {
  Component,
  computed,
  EventEmitter,
  input,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Product } from "app/products/data-access/product.model";
import { SelectItem } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from "primeng/rating";

@Component({
  selector: "app-product-form",
  template: `
   <form #form="ngForm" (ngSubmit)="onSave()">

  <!-- CODE -->
  <div class="form-field">
    <label for="code">Code</label>
    <input pInputText
      id="code"
      name="code"
      [(ngModel)]="editedProduct().code"
      required />
  </div>

  <!-- NAME -->
  <div class="form-field">
    <label for="name">Nom</label>
    <input pInputText
      id="name"
      name="name"
      [(ngModel)]="editedProduct().name"
      required />
  </div>

  <!-- DESCRIPTION -->
  <div class="form-field">
    <label for="description">Description</label>
    <textarea pInputTextarea
      id="description"
      name="description"
      rows="4"
      [(ngModel)]="editedProduct().description">
    </textarea>
  </div>

  <!-- IMAGE -->
  <div class="form-field">
    <label for="image">Image (URL)</label>
    <input pInputText
      id="image"
      name="image"
      [(ngModel)]="editedProduct().image" />
  </div>

  <!-- CATEGORY -->
  <div class="form-field">
    <label for="category">Catégorie</label>
    <p-dropdown
      [options]="categories"
      [(ngModel)]="editedProduct().category"
      name="category"
      placeholder="Choisir une catégorie"
      appendTo="body" />
  </div>

  <!-- PRICE -->
  <div class="form-field">
    <label for="price">Prix</label>
    <p-inputNumber
      [(ngModel)]="editedProduct().price"
      name="price"
      mode="currency"
      currency="EUR"
      required />
  </div>

  <!-- QUANTITY -->
  <div class="form-field">
    <label for="quantity">Quantité</label>
    <p-inputNumber
      [(ngModel)]="editedProduct().quantity"
      name="quantity"
      [min]="0" />
  </div>

  <!-- INTERNAL REF -->
  <div class="form-field">
    <label for="internalReference">Référence interne</label>
    <input pInputText
      id="internalReference"
      name="internalReference"
      [(ngModel)]="editedProduct().internalReference" />
  </div>

  <!-- INVENTORY STATUS -->
  <div class="form-field">
    <label for="inventoryStatus">Statut du stock</label>
    <p-dropdown
      [options]="inventoryStatuses"
      [(ngModel)]="editedProduct().inventoryStatus"
      name="inventoryStatus" />
  </div>

  <!-- RATING -->
  <div class="form-field">
    <label>Note</label>
    <p-rating
  [(ngModel)]="editedProduct().rating"
  name="rating"/>
  </div>

  <!-- ACTIONS -->
  <div class="flex justify-content-between">
    <p-button type="button" label="Annuler" severity="help" (click)="onCancel()" />
    <p-button type="submit" label="Enregistrer" severity="success" [disabled]="!form.valid" />
  </div>

</form>

  `,
  styleUrls: ["./product-form.component.scss"],
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    DropdownModule,
    RatingModule
  ],
  encapsulation: ViewEncapsulation.None
})
export class ProductFormComponent {
  public readonly product = input.required<Product>();

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Product>();

  public readonly editedProduct = computed(() => ({ ...this.product() }));

  public readonly categories: SelectItem[] = [
    { value: "Accessories", label: "Accessories" },
    { value: "Fitness", label: "Fitness" },
    { value: "Clothing", label: "Clothing" },
    { value: "Electronics", label: "Electronics" },
  ];

  public readonly inventoryStatuses: SelectItem[] = [
  { label: "En stock", value: "INSTOCK" },
  { label: "Stock faible", value: "LOWSTOCK" },
  { label: "Rupture", value: "OUTOFSTOCK" }
];

  onCancel() {
    this.cancel.emit();
  }

  onSave() {
    this.save.emit(this.editedProduct());
  }
}
