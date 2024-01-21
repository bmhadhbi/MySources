import { Injectable } from '@angular/core';

@Injectable()
export class DBkeys {
  public static readonly IsUserLoggedIn = 'isUserLoggedIn';
  public static readonly CurrentUserName = 'CurrentUserName';
  public static readonly CurrentUser = 'CurrentUser';
}
