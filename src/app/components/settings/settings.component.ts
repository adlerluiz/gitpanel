import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SettingsService } from '../../providers/settings.service';
import { Router } from '@angular/router';
declare let M: any;

interface Settings {
  default_branches?: any;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @ViewChild('defaultBranches') defaultBranches: ElementRef;

  formData: Settings;

  constructor(
    public settingsService: SettingsService,
    public route: Router
  ) {
    this.formData = this.settingsService.getSettings();
  }

  ngOnInit() {
    this.loadChips();
  }

  loadChips() {
    const chips = this.defaultBranches.nativeElement;
    let opts = {
      data: [],
    };

    this.formData.default_branches.forEach( data => {
      opts.data.push( { tag: data });
    } );

    setTimeout( () => {
      M.Chips.init( chips, opts );
    } , 300 );
  }

  save() {
    const chips = this.defaultBranches.nativeElement.M_Chips.chipsData;
    this.formData.default_branches = [];

    chips.forEach( value => {
      this.formData.default_branches.push( value.tag );
    } );

    this.settingsService.setUserSettings( 'default_branches', this.formData.default_branches );

    M.toast( { html: 'Salvo com sucesso', classes: 'rounded' } );
    this.route.navigateByUrl( 'home' );
  }

}
