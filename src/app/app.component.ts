import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';

import { AuthService } from './providers/auth.service';
import { GithubV3Service } from './providers/github-v3.service';
import { SettingsService } from './providers/settings.service';
declare let M: any;

interface User {
  name?: string;
  avatar_url?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('sideNav') sideNav: ElementRef;

  user: User;

  organization: any;
  organizations: any;
  repositories: any = [];
  favoritesRepositoriesByOrganization: any = [];

  currentRepositoryName = '';
  formSearchRepository = '';
  loadingRepositories = false;

  constructor(
    public authService: AuthService,
    public settingsService: SettingsService,
    public githubv3Service: GithubV3Service
  ) {
    this.user = this.authService.getUser();
    this.organization = this.settingsService.getLastOrganization();
    this.organizations = this.settingsService.getOrganizations();
    if ( this.authService.isLogged() ) {
      // this.loadRepositoriesByOrganization();
    }
    this.currentRepositoryName = this.settingsService.getLastRepository();
  }

  ngAfterViewInit() {
    var tooltipElems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init( tooltipElems, {} );
  }

  isLogged() {
    return this.authService.isLogged();
  }

  setDefaultOrganization( organization: string ) {
    this.repositories = [];
    this.organization = organization;
    this.settingsService.setLastOrganization( organization );
    this.favoritesRepositoriesByOrganization = this.settingsService.getFavoriteRepositoriesByOwner( this.organization );
    // this.getRepositoriesByOrganization( organization );
  }

  getRepositoriesByOrganization( organization ) {
    this.repositories = [];

    this.githubv3Service.getUserInfo( { owner: organization } )
      .subscribe( ( data: any ) => {
        if ( data.type === 'Organization' ) {
          this.githubv3Service.getOrgRepositories( { owner: organization, perPage: 900 } )
            .subscribe( data2 => {
              if ( data2 ) {
                this.repositories = data2;
                this.hideLoadingRepositories();
              }
            } );
        } else if ( data.type === 'User' ) {
          this.githubv3Service.getUserRepositories( { owner: organization, perPage: 900 } )
            .subscribe( ( data2: any ) => {
              if ( data2 ) {
                this.repositories = data2;
                this.hideLoadingRepositories();
              } else {
                this.repositories = [];
                this.hideLoadingRepositories();
              }
            } );
        }
      } );

  }

  loadRepositoriesByOrganization() {
    this.showLoadingRepositories();
    this.organization = this.settingsService.getLastOrganization();
    this.getRepositoriesByOrganization( this.organization );
  }

  loadFavoritesRepositoriesByOrganization() {
    this.repositories = [];

    this.favoritesRepositoriesByOrganization = this.settingsService.getFavoriteRepositoriesByOwner( this.organization );
  }

  showLoadingRepositories() {
    this.loadingRepositories = true;
  }

  hideLoadingRepositories() {
    this.loadingRepositories = false;
  }

  searchRepository( repo ) {
    this.currentRepositoryName = repo.name || repo;
    this.formSearchRepository = '';
  }

  refresh() {
    location.reload();
  }

  logout() {
    this.authService.setToken( null );
    this.refresh();
  }

  closeSidenav() {
    const instance = M.Sidenav.getInstance( this.sideNav.nativeElement );
    instance.close();
  }

  isOnline() {
    return navigator.onLine;
  }

}
