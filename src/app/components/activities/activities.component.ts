import { Component, Input, OnInit } from '@angular/core';
import { GithubV3Service } from '../../providers/github-v3.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  @Input() owner;
  @Input() repository;

  showLoadingActivities = false;
  commits: any;

  constructor(
    public githubv3Service: GithubV3Service
  ) { }

  ngOnInit() {
    this.getCommits();
  }

  openCommitUrl( commit ) {
    window.open( commit.html_url );
  }

  setShowLoadingActivities( value ) {
    this.showLoadingActivities = value;
  }

  getCommits() {
    this.setShowLoadingActivities( true );
    this.githubv3Service.getRepoCommits( { owner: this.owner, repo: this.repository, perPage: 40 } )
      .subscribe( data => {
        this.commits = data;
        this.setShowLoadingActivities( false );
      } );
  }

  // ref - https://gist.github.com/YMA-MDL/b1d7284a8cebc3ecf36829984859656b
  // ref - http://bit-booster.com/graph.html
  generateGraph() {
    /*
    const config = {
      template: 'metro',
      orientation: 'vertical'
    };
    const graph = new GitGraph( config );

    let nodesStore = [];
    let commits = this.commits;

    console.log(commits)

    commits.forEach( ( data, key ) => {
      console.log(data)
      nodesStore.push({
        'sha': data.sha,
        'message': data.commit.message,
        'author': data.commit.author.name
      });
    } );

    console.log(nodesStore)

    this.graphBranches[ 0 ] = graph.branch( 'master' );

    this.graphBranches[ 0 ].commit('This is a commit');
    */
  }

}
