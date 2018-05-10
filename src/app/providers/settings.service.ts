import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  constructor(

  ) { }

  setOrganization( organization ) {
    localStorage.setItem( 'current_organization', organization );
  }

  setOrganizations( organizations ) {
    const data = JSON.stringify( [ { login: 'adlerluiz', avatar_url: 'https://avatars3.githubusercontent.com/u/2112638?v=4', type: 'User' }, { login: 'PadraoiX', avatar_url: 'https://avatars0.githubusercontent.com/u/30473100?v=4', type: 'Org' } ] );
    localStorage.setItem( 'organizations', data );
  }

  setRepository( repository ) {
    localStorage.setItem( 'current_organization', repository );
  }

  setSettings( settings ) {
    settings = JSON.stringify( settings );
    localStorage.setItem( 'settings', settings );
  }

  setDefaultBranches( default_branches ) {
    default_branches = JSON.stringify( default_branches );
    localStorage.setItem( 'default_branches', default_branches );
  }

  getOrganization() {
    return localStorage.getItem( 'current_organization' );
  }

  getOrganizations() {
    const orgs = localStorage.getItem( 'organizations' );
    return JSON.parse( orgs );
  }

  getRepository() {
    return localStorage.getItem( 'current_repository' );
  }

  getSettings() {
    return JSON.parse( localStorage.getItem( 'settings' ) );
  }

  getDefaultBranches() {
    const settings = JSON.parse( localStorage.getItem( 'settings' ) );
    return settings.default_branches;
  }

}
