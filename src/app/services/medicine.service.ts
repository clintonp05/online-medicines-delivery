import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {publishReplay, refCount} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private httpClient: HttpClient) { }

  getMedData(userId): Observable<any> {
      let response = this.httpClient.get(environment.serverUrl + 'medicine?userId='+userId)
        .pipe(publishReplay(), refCount());
    return response;
  }
}
