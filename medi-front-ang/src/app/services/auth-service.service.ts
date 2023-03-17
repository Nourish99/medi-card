import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpServiceService } from './http-service.service';
import { Router } from '@angular/router';
import { StorageServiceService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
    urlComplete = 'api/user'

  constructor(
    private http: HttpServiceService,
    private storageService: StorageServiceService,
    private router: Router,
  ) { }

  auth(credentials: any) {
    return this.http.post(this.urlComplete, '/login', credentials)
  }

  setAuth(user: any) {
    this.storageService.setItem('user-info', JSON.stringify(user));
  }

  getAuth() {
    return this.storageService.getItem('user-info');
  }

  async logOut() {
    await this.storageService.deleteItem('user-info');
    this.router.navigate(['login']);
  }

  isLogged() {
    const user = this.storageService.getItem('user-info');

    if (!user) {
      console.log('No hay user logueado');
      return false;
    }

    const token = JSON.parse(user).token;
    const payload = atob(token.split('.')[1]);
    const parsedPayload = JSON.parse(payload);

    if (!(parsedPayload.exp > Date.now() / 1000)) {
      console.log('El token ha expirado');
      this.storageService.deleteItem('user-info');
      return false;
    }

    return true;
  }

  register(credentials: any) {
    return this.http.post(this.urlComplete, '/register', credentials)
  }

  roles(userID:string) {
    return this.http.get(this.urlComplete, '/getRole/'+userID)
  }

  getToken() {
    const user = this.storageService.getItem('user-info');

    if (!user) {
      console.log('No hay user logueado');
      return false;
    }

    const token = JSON.parse(user).token;
    return token;
  }
}