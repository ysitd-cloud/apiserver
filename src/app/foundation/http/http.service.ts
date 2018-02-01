import { Component, Inject } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Component()
export class HttpService {
  constructor(@Inject('client') private readonly client: AxiosInstance = null) {
    if (this.client === null) {
      this.client = axios.create();
    }
  }

  request(config: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return this.client.request(config);
  }

  request$(config: AxiosRequestConfig): Observable<AxiosResponse<any>> {
    return Observable.create((observer) => {
      this.request(config)
        .then((resp) => {
          observer.next(resp);
          observer.complete();
        })
        .catch(observer.error);
    });
  }
}
