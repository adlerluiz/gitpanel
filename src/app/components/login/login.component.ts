import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';
import {GithubV3Service} from "../../providers/github-v3.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userToken = '';

  constructor(
    public authService: AuthService,
    public githubV3Service: GithubV3Service,
    public route: Router
  ) { }

  ngOnInit() {
    if ( this.authService.isLogged() ) {
      this.route.navigateByUrl( 'home' );
    }
  }

  login() {
    this.authService.setToken( this.userToken );
    this.githubV3Service.getUser()
      .subscribe( data => {
        this.authService.setUser( data );
        location.reload( true );
      }, error => {} );
  }

}
