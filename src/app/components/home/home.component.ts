import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../providers/settings.service';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';

interface User {
  name?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lastOrganization: any;
  lastRepository: any;
  user: User;

  constructor(
    public settingsService: SettingsService,
    public authService: AuthService,
    public route: Router
  ) {
    this.authService.handleLogin();
    this.lastOrganization = this.settingsService.getLastOrganization();
    this.lastRepository = this.settingsService.getLastRepository();
    this.user = this.authService.getUser();
  }

  ngOnInit() {

  }

}
