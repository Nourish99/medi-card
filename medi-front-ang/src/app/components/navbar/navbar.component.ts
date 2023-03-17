import { Component } from '@angular/core';
import { MediCardLogo } from 'src/app/helpers/assets-helper';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent {

  logo = MediCardLogo;
}
