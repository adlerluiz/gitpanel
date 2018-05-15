import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { TruncatePipe } from './pipe/truncate.pipe';
import { GitmojiPipe } from './pipe/gitmoji.pipe';
import { NgPipesModule } from 'ngx-pipes';

import { AuthService } from './providers/auth.service';
import { GithubV3Service } from './providers/github-v3.service';
import { SettingsService } from './providers/settings.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RepositoryComponent } from './components/repository/repository.component';
import { BranchesComponent } from './components/branches/branches.component';
import { LoginComponent } from './components/login/login.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { CheckTokenComponent } from './components/check-token/check-token.component';

@NgModule({
  declarations: [
    AppComponent,
    TruncatePipe,
    GitmojiPipe,
    HomeComponent,
    RepositoryComponent,
    BranchesComponent,
    LoginComponent,
    SettingsComponent,
    ActivitiesComponent,
    CheckTokenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgPipesModule
  ],
  providers: [ AuthService, GithubV3Service, SettingsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
