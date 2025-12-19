import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactService {

  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8008/api/contact';

  send(email: string, message: string): Observable<void> {
    return this.http.post<void>(this.apiUrl, {
      email,
      message
    });
  }
}
