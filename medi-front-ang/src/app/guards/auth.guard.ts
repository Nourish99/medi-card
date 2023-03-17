import { Injectable } from '@angular/core';  
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';  
import { AuthServiceService } from '../services/auth-service.service';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })  
export class AuthGuard implements CanActivate { 

    constructor(private _router: Router, private authService: AuthServiceService) { } 

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : 
    Observable<boolean> | Promise<boolean> | boolean  {  
        if (this.authService.isLogged()) {  
            return true;  
        }  
        this._router.navigate(['']);  
        return false;  
    }  
} 