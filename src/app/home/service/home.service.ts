import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { EquipmentsModel } from '../models/EquipmentsModel';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseService {

  constructor(private http: HttpClient) {
    super()
   }

   listEquipments() {
    return this.http
      .get<Array<EquipmentsModel>>(this.urlService + 'Equipamentos',
        super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }
  getEquipmentsById(id: any) {
    return this.http
      .get<EquipmentsModel>(this.urlService + 'Equipamentos/'+ id,
        super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }
  sendAnswerEquipment(body: any) {
    var options = super.ObterAuthHeaderJson()
    return this.http
      .post(this.urlService + 'Equipamentos', body, { ...options, responseType: 'text' })
      .pipe(catchError(super.serviceError));

  }
}
