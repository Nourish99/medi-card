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

  isAdmin= false;
  isDoctor = false;
  isFamiliar = false;
  isNurse = false;
  patientId = '';
  familiarLink = '';

  constructor(private router: Router, private authService: AuthServiceService){
    this.authSub = this.authService._auth.subscribe((data) => {
      this.logged = data;
    });
    this.isAdmin = this.authService.isAdmin();
    this.isDoctor = this.authService.isDoctor();
    this.isNurse = this.authService.isNurse();
    this.isFamiliar = this.authService.isFamiliar();

    if(this.isFamiliar){
      this.patientId = this.authService.getUserFamiliar();
      this.familiarLink = `/patients/${this.patientId}`
    }
  }

  ngOnInit(): void {
    this.logged = this.authService.isLogged();
  }

  navigateLoginUrl(){
    this.router.navigate(['login'])
  }

  navigateHome(){
    this.router.navigate([''])
  }

  forceNavigate(name: string) {
    this.router.navigate(['/home'], { fragment: name });
  }

  logOut(){
    this.logged = false;
    this.authService.logOut();
    this.router.navigate([''])
  }
}
