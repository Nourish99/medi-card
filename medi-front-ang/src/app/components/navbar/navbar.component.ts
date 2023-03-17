import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MediCardLogo } from 'src/app/helpers/assets-helper';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit{

  logo = MediCardLogo;
  logged = false;

  authSub: Subscription;

  constructor(private router: Router, private authService: AuthServiceService){
    this.authSub = this.authService._auth.subscribe((data) => {
      this.logged = data;
    });

  }

  ngOnInit(): void {
    this.logged = this.authService.isLogged();
  }

  get LoginUrl(){
    return this.router.createUrlTree(['/login'])
  }

  logOut(){
    this.logged = false;
    this.authService.logOut();
    this.router.navigate([''])
  }
}
