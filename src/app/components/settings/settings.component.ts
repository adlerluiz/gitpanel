import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SettingsService } from '../../providers/settings.service';
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
    public settingsService: SettingsService
  ) {
    // this.formData = this.settingsService.getSettings();

    this.formData = {
      default_branches: []
    };
  }

  ngOnInit() {
    const chips = this.defaultBranches.nativeElement;
    const opts = ({
      data: [{
        tag: 'Apple',
      }, {
        tag: 'Microsoft',
      }, {
        tag: 'Google',
      }],
    });

    setTimeout( () => {
      M.Chips.init( chips, opts );
    } , 300 );
  }

  save() {
    const chips = this.defaultBranches.nativeElement.M_Chips.chipsData;

    chips.forEach( value => {
      console.log( value.tag );
      this.formData.default_branches.push( value.tag );
    } );
  }

}
