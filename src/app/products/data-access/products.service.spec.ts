import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Product } from './product.model';

describe('ProductsService (signals)', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  const API = 'http://localhost:8008/api/products';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('should load products and update signal', () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Test', price: 10 } as Product
    ];

    service.get().subscribe();

    const req = httpMock.expectOne(API);
    expect(req.request.method).toBe('GET');

    req.flush(mockProducts);

    expect(service.products()).toEqual(mockProducts);
  });
  it('should add product to signal on create', () => {
    const created = { id: 2, name: 'New' } as Product;

    service.create(created).subscribe();

    const req = httpMock.expectOne(API);
    expect(req.request.method).toBe('POST');

    req.flush(created);

    expect(service.products()).toContain(created);
  });
  it('should update product in signal', () => {
    const initial = { id: 1, name: 'Old' } as Product;
    const updated = { id: 1, name: 'New' } as Product;

    (service as any)._products.set([initial]);

    service.update(updated).subscribe();

    const req = httpMock.expectOne(`${API}/1`);
    expect(req.request.method).toBe('PUT');

    req.flush(updated);

    expect(service.products()[0].name).toBe('New');
  });
});