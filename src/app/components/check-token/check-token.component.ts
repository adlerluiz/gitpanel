import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { GithubV3Service } from '../../providers/github-v3.service';
import { SettingsService } from '../../providers/settings.service';

@Component({
  selector: 'app-check-token',
  templateUrl: './check-token.component.html',
  styleUrls: ['./check-token.component.css']
})
export class CheckTokenComponent implements OnInit {

  arrOrgs = [];

  constructor(
    public authService: AuthService,
    public githubV3Service: GithubV3Service,
    public settingsService: SettingsService,
    public route: Router,
    public activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      if ( params[ 'access_token' ] ) {
        this.login( params[ 'access_token' ] );
        this.route.navigateByUrl( 'home' );
      } else {
        if ( this.authService.isLogged() ) {
          this.route.navigateByUrl( 'home' );
        }
      }
    } );
  }

  login( userToken ) {
    this.authService.setToken( userToken );

    this.githubV3Service.getUserLogged()
      .subscribe( ( data: any ) => {
          this.authService.setUser( { name: data.name, login: data.login, avatar_url: data.avatar_url } );
          this.settingsService.setLastOrganization( data.login );

          this.arrOrgs.push ( { login: data.login, avatar_url: data.avatar_url, type: 'User' } );
          this.setupDefaults();
      }, () => {
        this.authService.setToken( null );
      } );
  }

  setupDefaults() {
    this.settingsService.setUserSettings( 'default_branches', [ 'master' ] );

    this.githubV3Service.getOrgs()
      .subscribe( ( data: any ) => {
          if ( data.length ) {
            data.forEach( org => {
              this.arrOrgs.push ( { login: org.login, avatar_url: org.avatar_url, type: 'Organization' } );
            } );
          }
        },
        () => {},
        () => {
          setTimeout( () => {
            this.settingsService.setOrganizations( this.arrOrgs );
            location.reload();
          }, 300 );
        } );
  }

}
