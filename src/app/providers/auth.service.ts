import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';

@Injectable()
export class AuthService {

  constructor(
    settingsService: SettingsService
  ) { }

  setUser( user ) {
    localStorage.setItem( 'user', JSON.stringify( user ) );
  }

  setToken( token ) {
    localStorage.setItem( 'oauth_token', token );
  }

  getUser() {
    return JSON.parse( localStorage.getItem( 'user' ) );
  }

  getToken() {
    return localStorage.getItem( 'oauth_token' );
    // return 'feee80edd4e30eef1a236783ac21f433dd14f3ce';
  }

  /**
   * isLogged
   * Verifica se o usuário está logado, caso não, é redirecionado para tela de login
   */
  isLogged() {
    if ( this.getToken() ) {
       return this.getToken();
    }
    return false;
  }

}
