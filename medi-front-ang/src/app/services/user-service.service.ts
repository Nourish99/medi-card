import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  urlComplete = 'api/user';
  constructor(private http: HttpServiceService, private _authService: AuthServiceService) { }

  getAllNurses(){
    return this.http.getWithToken( this.urlComplete,  '/allNurses', this._authService.getToken());
  }

  getAllDoctors(){
    return this.http.getWithToken( this.urlComplete,  '/allDoctors', this._authService.getToken());

  }
}
