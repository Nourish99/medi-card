import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpServiceService } from './http-service.service';
import { Router } from '@angular/router';
import { StorageServiceService } from './storage-service.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
    urlComplete = 'api/user';

    $auth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    _auth: Observable<boolean> = this.$auth.asObservable();
  

  constructor(
    private http: HttpServiceService,
    private storageService: StorageServiceService,
    private router: Router,
  ) { }

  auth(credentials: any) {
    return this.http.post(this.urlComplete, '/login', credentials)
  }

  setAuth(user: any) {
    this.$auth.next(true);
    this.storageService.setItem('user-info', JSON.stringify(user));
  }

  getAuth() {
    return this.storageService.getItem('user-info');
  }

  async logOut() {
    await this.storageService.deleteItem('user-info');
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
    const datep = new Date();

    if (!(parsedPayload.exp > datep.getTime() / 1000)) {
      console.log('El token ha expirado');
      this.storageService.deleteItem('user-info');
      this.$auth.next(false);
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

  getUserRole(){
    const user = this.storageService.getItem('user-info');

    if (!user) {
      console.log('No hay user logueado');
      return false;
    }

    const role = JSON.parse(user).userdata.role;
    return role;
  }

  isAdmin(){
    return this.getUserRole() == 'admin'
  }

  isNurse(){
    return this.getUserRole() == 'nurse'
  }

  isDoctor(){
    return this.getUserRole() == 'doctor'
  }
}