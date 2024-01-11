
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, from, throwError } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';


interface ServerError {
  status: number;
  error: {
    error: string;
    error_description: string;
  };
}


@Injectable()
export class EndpointBase {
  private taskPauser: Subject<boolean> | null = null;
  private isRefreshingLogin = false;

  constructor(
    protected http: HttpClient) {
  }  
 
}
