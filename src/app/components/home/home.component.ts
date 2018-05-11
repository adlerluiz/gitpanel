import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../providers/settings.service';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lastOrganization: any;
  lastRepository: any;
  user: any;

  constructor(
    public settingsService: SettingsService,
    public authService: AuthService
  ) {
    this.lastOrganization = this.settingsService.getLastOrganization();
    this.lastRepository = this.settingsService.getLastRepository();
    this.user = this.authService.getUser();
  }

  ngOnInit() {

  }

}
