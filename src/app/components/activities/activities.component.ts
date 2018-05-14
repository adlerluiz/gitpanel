import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { GithubV3Service } from '../../providers/github-v3.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit, OnChanges {
  @Input() owner;
  @Input() repository;

  showLoadingActivities = false;
  commits: any;
  commitsToCompare = [];

  constructor(
    public githubv3Service: GithubV3Service
  ) { }

  ngOnInit() {
    this.getCommits();
  }

  ngOnChanges( changes: SimpleChanges ) {
    let reload = false;

    if ( changes.owner ) {
      this.owner = changes.owner.currentValue;
      reload = true;
    }

    if ( changes.repository ) {
      this.repository = changes.repository.currentValue;
      reload = true;
    }

    if ( reload ) {
      this.getCommits();
    }
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

  changeCheckbox( sha ) {
    if ( this.commitsToCompare.includes( sha ) ) {
      this.commitsToCompare.splice( this.commitsToCompare.indexOf( sha ), 1 );
    } else {
      if ( this.commitsToCompare.length < 2 ) {
        this.commitsToCompare.push( sha );
      }
    }
  }

  verifyDisabled( sha ) {
    if ( this.commitsToCompare.includes( sha ) ) {
      return false;
    }

    return true;
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
