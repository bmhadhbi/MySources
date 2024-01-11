import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  get recoverPasswordUrl() { return 'https://localhost:7217/api/Account/public/recoverpassword'; }

  protected get requestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({
      //Authorization: `Bearer ${this.authService.accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*'
    });

    return { headers };
  }
  constructor(
    protected http: HttpClient) {
  }

  getRecoverPasswordEndpoint<T>(usernameOrEmail: string): Observable<T> {
    const endpointUrl = this.recoverPasswordUrl;

    return this.http.post<T>(endpointUrl, JSON.stringify({ usernameOrEmail }), this.requestHeaders);
  }
}
