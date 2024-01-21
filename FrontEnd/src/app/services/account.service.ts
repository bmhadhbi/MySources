import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserEdit } from '../models/user-edit.model';
import { UserLogin } from '../models/user-login.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  get usersUrl() { return 'https://localhost:7217/api/account/register'; }
  get usersPublicUrl() { return 'https://localhost:7217/api/account/public/users'; }
  get recoverPasswordUrl() { return 'https://localhost:7217/api/Account/public/recoverpassword'; }
  get resetPasswordUrl() { return 'https://localhost:7217/api/account/public/resetpassword'; }
  get confirmEmailUrl() { return 'https://localhost:7217/api/account/public/confirmemail'; }
  get loginUrl() { return 'https://localhost:7217/api/account/login'; }

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

  recoverPassword<T>(usernameOrEmail: string): Observable<T> {
    const endpointUrl = this.recoverPasswordUrl;

    return this.http.post<T>(endpointUrl, JSON.stringify({ usernameOrEmail }), this.requestHeaders);
  }

  newUser<T>(user: UserEdit): Observable<T> {
    const endpointUrl = this.usersUrl;

    return this.http.post<T>(endpointUrl, JSON.stringify(user), this.requestHeaders);
  }

  resetPassword<T>(usernameOrEmail: string, newPassword: string, resetCode: string): Observable<T> {
    const endpointUrl = this.resetPasswordUrl;

    return this.http.post<T>(endpointUrl, JSON.stringify({ usernameOrEmail, password: newPassword, resetcode: resetCode }), this.requestHeaders);
  }

  confirmUserAccount<T>(userId: string, confirmationCode: string): Observable<T> {
    const endpointUrl = `${this.confirmEmailUrl}?userid=${userId}&code=${confirmationCode}`;

    return this.http.put<T>(endpointUrl, null, this.requestHeaders);
  }

  loginWithPassword<Boolean>(user: UserLogin): any {
    const endpointUrl = this.loginUrl;
    return this.http.post<Boolean>(endpointUrl, JSON.stringify({ usernameOrEmail: user.userName, password: user.password }), this.requestHeaders);
  }
}
