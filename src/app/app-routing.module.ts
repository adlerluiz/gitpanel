import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CheckTokenComponent } from './components/check-token/check-token.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RepositoryComponent } from './components/repository/repository.component';

import { AuthService } from './providers/auth.service';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'checkToken/:access_token',
        component: CheckTokenComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'r/:owner/:repository',
        component: RepositoryComponent
    },
    {
        path: '**',
        component: HomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false } ) ],
    exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(
    public authService: AuthService,
    public route: Router,
  ) {
    if ( !this.validateUrl() ) {
      if ( !this.authService.isLogged() ) {
        console.log('não logado');
        this.route.navigateByUrl( 'login' );
      }
    }
  }

  validateUrl() {
    if ( location.hash.indexOf( 'login' ) !== -1 || location.hash.indexOf( 'checkToken' ) !== -1 ) {
      return true;
    }
    return false;
  }

}
