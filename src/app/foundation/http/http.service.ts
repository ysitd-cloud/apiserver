import { Component } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs/Observable';

@Component()
export class HttpService {
  request(config: AxiosRequestConfig): Observable<AxiosResponse<any>> {
    return Observable.create((observer) => {
      axios(config)
        .then((resp) => {
          observer.next(resp);
          observer.complete();
        })
        .catch(observer.error);
    });
  }
}
