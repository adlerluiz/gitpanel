import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
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
        path: 'validate/:token',
        component: LoginComponent
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
    imports: [RouterModule.forRoot(routes, { useHash: false, enableTracing: false } ) ],
    exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(
    public authService: AuthService,
    public route: Router,
  ) {
    if ( !this.authService.isLogged() && !this.validateUrl() ) {
      this.route.navigateByUrl( 'login' );
    }
  }

  validateUrl(  ) {
    return location.pathname.indexOf( 'validate/' );
  }

}
