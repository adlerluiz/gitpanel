import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SettingsService } from '../../providers/settings.service';
import { Router } from '@angular/router';
declare let M: any;

interface Settings {
  default_branches?: any;
  default_tab?: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @ViewChild('defaultBranches') defaultBranches: ElementRef;
  @ViewChild('formSelect') formSelect: ElementRef;

  formData: Settings;

  constructor(
    public settingsService: SettingsService,
    public route: Router
  ) {
    this.formData = this.settingsService.getSettings();
  }

  ngOnInit() {
    this.loadChips();

    setTimeout( () => {
      M.FormSelect.init( this.formSelect.nativeElement );
    } , 300 );
  }

  loadChips() {
    const chips = this.defaultBranches.nativeElement;
    const opts = {
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
    this.settingsService.setUserSettings( 'default_tab', this.formData.default_tab );

    M.toast( { html: 'Salvo com sucesso', classes: 'rounded' } );
    this.route.navigateByUrl( 'home' );
  }

}
