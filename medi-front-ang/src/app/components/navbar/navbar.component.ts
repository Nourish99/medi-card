import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private authService: AuthServiceService){

  }

  ngOnInit(): void {
    this.logged = this.authService.isLogged();
  }

  get LoginUrl(){
    return this.router.createUrlTree(['/login'])
  }
}
