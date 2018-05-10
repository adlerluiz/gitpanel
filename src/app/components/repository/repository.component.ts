import { Component, OnInit } from '@angular/core';
import { GithubV3Service } from '../../providers/github-v3.service';
import { ActivatedRoute } from '@angular/router';
import { SettingsService } from '../../providers/settings.service';

interface Repository {
  language?: string;
  open_issues?: number;
  updated_at?: any;
}

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {
  owner: any;
  repository: any;
  search: any;

  hideSearchInput = true;

  repositoryData: Repository = {};

  constructor(
    private githubv3Service: GithubV3Service,
    public route: ActivatedRoute,
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.owner = params[ 'owner' ];
      this.repository = params[ 'repository' ];

      this.settingsService.setLastOrganization( this.owner );
      this.settingsService.setLastRepository( this.repository );

      this.loadRepositoryData();
    } );
  }

  loadRepositoryData() {
    this.githubv3Service.getRepository( { owner: this.owner, repo: this.repository } )
      .subscribe( data => {
        this.repositoryData = data;
      } );
  }

  toggleSearchInput() {
    this.hideSearchInput = !this.hideSearchInput;
    this.search = '';
  }

}
