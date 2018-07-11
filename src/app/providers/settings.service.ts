import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  constructor(

  ) { }

  setLastOrganization( organization ) {
    localStorage.setItem( 'last_organization', organization );
  }

  setOrganizations( organizations ) {
    organizations = JSON.stringify( organizations );
    // const data = JSON.stringify( [ { login: 'adlerluiz', avatar_url: 'https://avatars3.githubusercontent.com/u/2112638?v=4', type: 'User' }, { login: 'PadraoiX', avatar_url: 'https://avatars0.githubusercontent.com/u/30473100?v=4', type: 'Organization' } ] );
    localStorage.setItem( 'organizations', organizations );
  }

  setLastRepository( repository ) {
    localStorage.setItem( 'last_repository', repository );
  }

  setSettings( settings ) {
    settings = JSON.stringify( settings );
    localStorage.setItem( 'settings', settings );
  }

  setDefaultBranches( default_branches ) {
    default_branches = JSON.stringify( default_branches );
    localStorage.setItem( 'default_branches', default_branches );
  }

  getLastOrganization() {
    return localStorage.getItem( 'last_organization' );
  }

  getOrganizations() {
    const orgs = localStorage.getItem( 'organizations' );
    return JSON.parse( orgs );
  }

  getLastRepository() {
    return localStorage.getItem( 'last_repository' );
  }

  getSettings() {
    return JSON.parse( localStorage.getItem( 'settings' ) );
  }

  getDefaultBranches() {
    const settings = JSON.parse( localStorage.getItem( 'settings' ) );
    return settings.default_branches;
  }

  setUserSettings( name, data ) {
    let settings: object;

    if ( localStorage.getItem( 'settings' ) ) {
      settings = JSON.parse( localStorage.getItem( 'settings' ) );
    } else {
      settings = {};
    }

    settings[ name ] = data;
    localStorage.setItem( 'settings', JSON.stringify( settings ) );
  }

  getUserSettings( name ) {
    const settings = JSON.parse( localStorage.getItem( 'settings' ) );
    return settings[ name ];
  }

  setFavoriteRepository( owner, repository ) {
    let favorites: object;

    if ( localStorage.getItem( 'favorites_repositories' ) ) {
      favorites = JSON.parse( localStorage.getItem( 'favorites_repositories' ) );
    } else {
      favorites = {};
    }

    if ( favorites[ owner ] ) {
      let alreadyHave = false;

      favorites[ owner ].forEach( ( data, index ) => {
        if ( data === repository ) {
          alreadyHave = true;
          favorites[ owner ].splice( index, 1 );
          return;
        }
      } );

      if ( !alreadyHave ) {
        favorites[ owner ].push( repository );
      }

    } else {
      favorites[ owner ] = [];
      favorites[ owner ].push( repository );
    }

    localStorage.setItem( 'favorites_repositories' , JSON.stringify( favorites ) );
  }

  isFavoriteRepository( owner, repository ) {
    let result = false;
    const favorites = JSON.parse( localStorage.getItem( 'favorites_repositories' ) );

    if ( favorites ) {
      favorites[ owner ].forEach( ( data ) => {
        if ( data === repository ) {
          result = repository;
        }
      } );
    }

    return result;
  }

  getFavoriteRepositoriesByOwner( owner ) {
    const favorites = JSON.parse( localStorage.getItem( 'favorites_repositories' ) );

    return favorites[ owner ] || [];
  }

}
