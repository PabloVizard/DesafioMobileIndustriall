import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
 
import { Storage } from '@capacitor/storage';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  constructor(private http: HttpClient) {
    super();
   }
   login(credentials: {userName, password}): any {
    
    return this.http
      .post(this.urlService + 'login', credentials)
      .pipe(catchError(super.serviceError));
  }
}
