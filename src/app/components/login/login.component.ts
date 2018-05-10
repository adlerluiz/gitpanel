import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';
import { GithubV3Service } from '../../providers/github-v3.service';
import { SettingsService } from '../../providers/settings.service';

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
    public settingsService: SettingsService,
    public route: Router
  ) { }

  ngOnInit() {
    if ( this.authService.isLogged() ) {
      this.route.navigateByUrl( 'home' );
    }
  }

  login() {
    this.authService.setToken( this.userToken );
    this.setupDefaults();
  }

  setupDefaults() {
    let arrOrgs = [];
    // this.settingsService.setDefaultBranches( [ 'master' ] );

    this.githubV3Service.getUser()
      .subscribe( data => {
        this.authService.setUser( data );
        this.settingsService.setOrganization( data.login );
        arrOrgs.push ( { login: data.login, avatar_url: data.avatar_url, type: 'User' } );
      }, error => {} );

    this.githubV3Service.getOrgs()
      .subscribe( ( data: Array ) => {
          if ( data.length ) {
            data.forEach( org => {
              arrOrgs.push ( { login: org.login, avatar_url: org.avatar_url, type: 'Org' } );
            } );
          }
        },
        () => {},
        () => {
          this.settingsService.setOrganizations( arrOrgs )
          location.reload( true );
        } );
  }

}
