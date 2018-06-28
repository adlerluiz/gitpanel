import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GithubV3Service } from '../../providers/github-v3.service';
import { ActivatedRoute } from '@angular/router';
import { SettingsService } from '../../providers/settings.service';
declare let M: any;
declare let GitGraph: any;

interface Repository {
  language?: string;
  open_issues?: number;
  updated_at?: any;
}

interface CompareData {
  total_commits?: number;
}

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {
  @ViewChild('repositoryTabs') repositoryTabs: ElementRef;

  // commits: any;

  owner: any;
  repository: any;
  search: any;

  hideSearchInput = true;

  repositoryData: Repository = {};

  defaultTab: any;

  // graphBranches: any = [];

  compareData: CompareData = {};

  release_client: any;
  release_last: any;

  isFavoriteRepository = false;

  constructor(
    private githubv3Service: GithubV3Service,
    public route: ActivatedRoute,
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    const instanceRepositoryTabs = M.Tabs.init( this.repositoryTabs.nativeElement );

    this.route.params.subscribe( params => {
      this.owner = params[ 'owner' ];
      this.repository = params[ 'repository' ];

      this.settingsService.setLastOrganization( this.owner );
      this.settingsService.setLastRepository( this.repository );

      this.loadRepositoryData();
      this.checkIsFavoriteRepository();

      this.defaultTab = this.settingsService.getUserSettings( 'default_tab' );
      instanceRepositoryTabs.select( this.defaultTab );
    } );

  }

  loadRepositoryData() {
    this.githubv3Service.getRepository( { owner: this.owner, repo: this.repository } )
      .subscribe( data => {
        this.repositoryData = data;
      } );
  }

  toggleFavorite() {
    this.settingsService.setFavoriteRepository( this.owner, this.repository );
    this.checkIsFavoriteRepository();
  }

  checkIsFavoriteRepository() {
    this.isFavoriteRepository = this.settingsService.isFavoriteRepository( this.owner, this.repository );
  }

  toggleSearchInput() {
    this.hideSearchInput = !this.hideSearchInput;
    this.search = '';
  }

  compare( client, last ) {
    this.githubv3Service.getCompareCommits( { owner: this.owner, repo: this.repository, base: client, head: last } )
      .subscribe( data => {
        this.compareData = data;
      } );
  }

}
