import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected urlService = 'https://desafio-iall.azurewebsites.net/api/';

  protected ObterHeaderJson(){
      return {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };
  }

  protected ObterAuthHeaderJson(){
      return {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.obterTokenUsuario()}`
          })
      };
  }

  protected ObterAuthHeaderUpload(){
      return {
          headers: new HttpHeaders({
              'Authorization': `Bearer ${this.obterTokenUsuario()}`
          })
      };
  }

  protected extractData(response: any){
    return response.data || {};
  }


  protected obterTokenUsuario(): string {
      return localStorage.getItem('industrial.token');
  }

  protected serviceError(error: Response | any){
      let errMsg: string;

      if (error instanceof Response) {

          errMsg = `${error.status} - ${error.statusText || ''}`;
      }
      else {
          errMsg = error.message ? error.message : error.toString();
      }
      console.error(error);
      return throwError(error);
  }
}
