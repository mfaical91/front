import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "./product.model";
import { Observable, tap } from "rxjs";

@Injectable({ providedIn: "root" })
export class ProductsService {

  private readonly http = inject(HttpClient);
  private readonly path = "http://localhost:8008/api/products";

  private readonly _products = signal<Product[]>([]);
  public readonly products = this._products.asReadonly();

  // GET ALL
  get(): Observable<Product[]> {
    return this.http.get<Product[]>(this.path).pipe(
      tap(products => this._products.set(products))
    );
  }

  // CREATE
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.path, product).pipe(
      tap(created =>
        this._products.update(products => [created, ...products])
      )
    );
  }

  // UPDATE
  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.path}/${product.id}`, product).pipe(
      tap(updated =>
        this._products.update(products =>
          products.map(p => p.id === updated.id ? updated : p)
        )
      )
    );
  }

  // DELETE
  delete(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.path}/${productId}`).pipe(
      tap(() =>
        this._products.update(products =>
          products.filter(p => p.id !== productId)
        )
      )
    );
  }
}
