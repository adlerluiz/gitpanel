import { Component } from '@angular/core';

import { AuthService } from './providers/auth.service';
import { GithubV3Service } from './providers/github-v3.service';
import { ConfigService } from './providers/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: any = {
    'token': null
  };

  organization: any;
  organizations: any;
  repositories: any;

  currentRepositoryName = '';
  formSearchRepository = '';

  constructor(
    public authService: AuthService,
    public configService: ConfigService,
    public githubv3Service: GithubV3Service
  ) {
    this.user.token = this.authService.getToken();
    this.organization = this.configService.getOrganization();
    this.organizations = this.configService.getOrganizations();
    this.getRepositoriesByOwner( this.organization );
    this.currentRepositoryName = localStorage.getItem( 'current_repository' );
  }

  isLogged() {
    return this.authService.isLogged();
  }

  setDefaultOrganization( organization: string ) {
    this.organization = organization;
    this.configService.setOrganization( organization );
    this.getRepositoriesByOwner( organization );
  }

  getRepositoriesByOwner( owner ) {
    this.repositories = [];

    this.githubv3Service.getUserRepositories( { perPage: 100 } )
      .subscribe( data => {
        if ( data ) {
          this.repositories = data;
        } else {
          this.repositories = [];
        }
      } );

    this.githubv3Service.getOrgRepositories( { owner: owner, perPage: 100 } )
      .subscribe( data => {
        if ( data ) {
          this.repositories = data;
        }
      } );
  }

  searchRepository( repo ) {
    this.currentRepositoryName = repo.name;
    this.formSearchRepository = '';
  }

  refresh() {
    location.reload( true );
  }

  logout() {
    this.authService.setToken( '' );
    this.refresh();
  }

}
