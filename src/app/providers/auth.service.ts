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
    if ( token == null ) {
      localStorage.removeItem('token_github' );
    } else {
      localStorage.setItem( 'token_github', token );
    }
  }

  getUser() {
    return JSON.parse( localStorage.getItem( 'user' ) );
  }

  getToken() {
    return localStorage.getItem( 'token_github' );
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
