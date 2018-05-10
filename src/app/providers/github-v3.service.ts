import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

const URL: any = {
  repository: 'https://api.github.com/repos/:owner/:repo:token',

  user_repositories: 'https://api.github.com/user/repos:token:perPage&affiliation=owner',
  orgs_repositories: 'https://api.github.com/orgs/:owner/repos:token:perPage',

  branch: 'https://api.github.com/repos/:owner/:repo/branches/:branch:token',
  branches: 'https://api.github.com/repos/:owner/:repo/branches:token',

  hash: 'https://api.github.com/repos/:owner/:repo/commits/:sha:token',

  compare_commits: 'https://api.github.com/repos/:owner/:repo/compare/:base...:head:token',

  merge: 'https://api.github.com/repos/:owner/:repo/merges:token',





  issues: 'https://api.github.com/repos/:owner/:repo/issues:token:state:perPage',
  issue: 'https://api.github.com/repos/:owner/:repo/issues/:issue:token',
  issueUrl: 'https://github.com/:owner/:repo/issues/:issue',

  comments: 'https://api.github.com/repos/:owner/:repo/issues/:issue/comments:token',





  releases: 'https://api.github.com/repos/:owner/:repo/releases:token',
  tags: 'https://api.github.com/repos/:owner/:repo/tags:token',




  user: 'https://api.github.com/user:token',


  orgs: 'https://api.github.com/user/orgs:token',


  delete_branch: 'https://api.github.com/repos/:owner/:repo/git/refs/heads/:ref:token'
};

@Injectable()
export class GithubV3Service {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  urlReplace( url, obj ) {
    let urlReturn = url;

    if ( url.indexOf( ':owner' ) !== -1 ) {
      //urlReturn = url.replace( ':owner', this.authService.getOrganization() );
      urlReturn = url.replace( ':owner', obj.owner );
    }

    if ( url.indexOf( ':token' ) !== -1 ) {
      urlReturn = urlReturn.replace( ':token', '?access_token=' + this.authService.getToken() + '&per_page=100' + '&no_cache=' + Math.random() );
    }

    if ( url.indexOf( ':repo' ) !== -1 ) {
      urlReturn = urlReturn.replace( ':repo', obj.repo );
    }

    if ( url.indexOf( ':sha' ) !== -1 ) {
      urlReturn = urlReturn.replace( ':sha', obj.sha );
    }

    if ( url.indexOf( ':base' ) !== -1 ) {
      urlReturn = urlReturn.replace( ':base', obj.base );
    }

    if ( url.indexOf( ':head' ) !== -1 ) {
      urlReturn = urlReturn.replace( ':head', obj.head );
    }

    if ( url.indexOf( ':branch' ) !== -1 ) {
      urlReturn = urlReturn.replace( ':branch', obj.branch );
    }

    if ( url.indexOf( ':issue' ) !== -1 ) {
      urlReturn = urlReturn.replace( ':issue', obj.issue );
    }

    if ( url.indexOf( ':state' ) !== -1 ) {
      urlReturn = urlReturn.replace( ':state', '&state=' + obj.state );
    }

    if ( url.indexOf( ':ref' ) !== -1 ) {
      urlReturn = urlReturn.replace( ':ref', obj.ref );
    }

    if ( url.indexOf( ':perPage' ) !== -1 ) {
      urlReturn = urlReturn.replace( ':perPage', '&per_page=' + obj.perPage );
    }

    return urlReturn;
  }

  getRepository( obj ) {
    return this.http.get( this.urlReplace( URL.repository, obj ) );
  }

  getUserRepositories( obj ) {
    return this.http.get( this.urlReplace( URL.user_repositories, obj ) );
  }

  getOrgRepositories( obj ) {
    return this.http.get( this.urlReplace( URL.orgs_repositories, obj ) );
  }

  getBranch( obj ) {
    return this.http.get( this.urlReplace( URL.branch, obj ) );
  }

  getBranches( obj ) {
    return this.http.get( this.urlReplace( URL.branches, obj ) );
  }

  getHash( obj ) {
    return this.http.get( this.urlReplace( URL.hash, obj ) );
  }

  getCompare( obj ) {
    obj.head = obj.head.replace( '#', '%23' );
    return this.http.get( this.urlReplace( URL.compare_commits, obj ) );
  }

  postMerge( obj ) {
    obj.head = obj.head.replace( '#', '%23' );
    return this.http.post( this.urlReplace( URL.merge, obj ), obj );
  }

  deleteBranch( obj ) {
    obj.ref = obj.ref.replace( '#', '%23' );
    return this.http.delete( this.urlReplace( URL.delete_branch, obj ) );
  }

  getIssues( obj ) {
    return this.http.get( this.urlReplace( URL.issues, obj ) );
  }

  getIssue( obj ) {
    return this.http.get( this.urlReplace( URL.issue, obj ) );
  }

  getIssueComments( obj ) {
    return this.http.get( this.urlReplace( URL.comments, obj ) );
  }

  getUrlIssue( obj ) {
    return this.urlReplace( URL.issueUrl, obj );
  }

  getReleases( obj ) {
    return this.http.get( this.urlReplace( URL.releases, obj ) );
  }

  getTags( obj ) {
    return this.http.get( this.urlReplace( URL.tags, obj ) );
  }

  getCompareCommits( obj ) {
    return this.http.get( this.urlReplace( URL.compare_commits, obj ) );
  }

  getUser() {
    return this.http.get( this.urlReplace( URL.user, null ) );
  }

  getOrgs() {
    return this.http.get( this.urlReplace( URL.orgs, null ) );
  }

}
