import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CheckTokenComponent } from './components/check-token/check-token.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RepositoryComponent } from './components/repository/repository.component';

import { AuthGuard } from './guard/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [ AuthGuard ]
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
        component: SettingsComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'r/:owner/:repository',
        component: RepositoryComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: '**',
        component: HomeComponent,
        canActivate: [ AuthGuard ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false } ) ],
    exports: [RouterModule]
})
export class AppRoutingModule {

  constructor() { }

}
