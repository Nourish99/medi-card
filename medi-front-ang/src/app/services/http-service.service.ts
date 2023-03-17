import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  private urlBase: string | undefined;
  private httpHeaders = new HttpHeaders().set('conten-type', 'application/json');

  constructor(
    private http: HttpClient
  ) { this.init() }

  get(module: string, service: string) {
    const url = this.urlBase + module + service;
    return this.http.get<any>(url, { headers: this.httpHeaders });
  }

  getToken(module: string, service: string, token: string, contentType: string = 'application/json') {
    const httpHeadersToken = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    if (contentType != 'multipart/form-data') {
      httpHeadersToken.set('content-type', contentType);
    }
    const url = this.urlBase + module + service;
    return this.http.get<any>(url, { headers: httpHeadersToken });
  }

  getWithToken(module: string, service: string, token: string) {
    const url = this.urlBase + module + service;
    const httpHeadersToken = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<any>(url, { headers: httpHeadersToken });
  }
  post(module: string, service: string, obj: any) {
    const url = this.urlBase + module + service;
    return this.http.post<any>(url, obj, { headers: this.httpHeaders });
  }

  postToken(module: string, service: string, obj: any, token: string, contentType: string = 'application/json') {
    const httpHeadersToken = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    if (contentType != 'multipart/form-data') {
      httpHeadersToken.set('content-type', contentType);
    }
    const url = this.urlBase + module + service;
    return this.http.post<any>(url, obj, { headers: httpHeadersToken });
  }

  put(module: string, service: string, obj: any) {
    const url = this.urlBase + module + service;
    return this.http.put<any>(url, obj, { headers: this.httpHeaders });
  }

  delete(module: string, service: string, token: string) {
    const url = this.urlBase + module + service;
    const httpHeadersToken = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete<any>(url, { headers: httpHeadersToken });
  }

  private init() {
    this.urlBase = environment.urlApi;
  }
}
