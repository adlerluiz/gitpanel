import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public route: Router
  ) {
    if ( this.authService.isLogged() ) {
      this.route.navigateByUrl( 'home' );
    }
  }

  ngOnInit() {
  }

}
