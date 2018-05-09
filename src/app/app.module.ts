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
import { ConfigService } from './providers/config.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RepositoryComponent } from './components/repository/repository.component';
import { BranchesComponent } from './components/branches/branches.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    TruncatePipe,
    GitmojiPipe,
    HomeComponent,
    RepositoryComponent,
    BranchesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgPipesModule
  ],
  providers: [ AuthService, GithubV3Service, ConfigService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
