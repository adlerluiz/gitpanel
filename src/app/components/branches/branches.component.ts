import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { GithubV3Service } from '../../providers/github-v3.service';
import { ActivatedRoute } from '@angular/router';
import { SettingsService } from '../../providers/settings.service';
declare let M: any;

interface Branch {
  name: string;
  commit?: Commits;
  compare: object;
  isReload: boolean;
}

interface CompareBranch {
  name: string;
  ahead_by: number;
  have_script: boolean;
}

interface CommitsBranch {
  name?: string;
  compare_with?: string;
  index?: number;
  commits?: Array<object>;
  scripts?: Array<string>;
  ahead_by?: number;
  total_commits?: number;
  total_scripts?: number;
  merge_waiting?: boolean;
  merge_result_status?: string;
  merge_result_message?: string;
}

interface Commits {
  commit?: CommitCommits;
  stats?: object;
}

interface CommitCommits {
  committer?: string;
  message?: string;
}

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() owner: any;
  @Input() repository: string;
  @Input() search: string;

  @ViewChild('modalRemoveBranch') modalRemoveBranch: ElementRef;
  @ViewChild('modalCommitsBranch') modalCommitsBranch: ElementRef;
  @ViewChild('modalConfirmMerge') modalConfirmMerge: ElementRef;

  @ViewChild('dragDivMerge') dragDivMerge: ElementRef;
  @ViewChild('dropDivMerge') dropDivMerge: ElementRef;

  // @ViewChild('tapTarget') tapTarget: ElementRef;

  pattSql: any = /(\.sql)/gmi;
  apiExceded = false;

  formSearch = '';
  showLoadingBranches = false;
  formDataToRemoveBranch: any = {};
  formDataCommitsBranch: CommitsBranch = {};

  branchesData: Array<object> = [];
  branchesToCompare: Array<string> = [];
  branchesToCompareValidated: Array<object> = [];

  branchesToMerge = [];

  showMergesCheckbox: any;

  constructor(
    private githubv3Service: GithubV3Service,
    public route: ActivatedRoute,
    public settingsService: SettingsService
  ) {
    this.branchesToCompare = this.settingsService.getDefaultBranches();
  }

  ngOnInit() {
    const elems = document.querySelectorAll('.modal');
    const elemsTooltip = document.querySelectorAll('.tooltipped');

    M.Modal.init( elems );
    M.Tooltip.init( elemsTooltip );
    // M.TapTarget.init( this.tapTarget.nativeElement );
  }

  ngAfterViewInit() {
    
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

    if ( changes.search ) {
      this.formSearch = changes.search.currentValue;
    }

    if ( reload ) {
      this.preLoadBranches();
    }
  }

  preLoadBranches() {
    this.setShowLoadingBranches( true );
    this.branchesToMerge = [];
    this.branchesData = [];
    this.branchesToCompareValidated = [];

    this.githubv3Service.getBranches( { owner: this.owner, repo: this.repository } )
      .subscribe( ( data: any ) => {

        data.forEach( ( value, key ) => {
          this.updateBranchesToCompareName( value );

          if ( key + 1 === data.length) {
            this.fixBranchesToCompareValidated();
            this.loadBranches( data );
          }
        });
      } );
  }

  fixBranchesToCompareValidated() {
    this.branchesToCompareValidated = this.branchesToCompareValidated.filter( Boolean );
  }

  loadBranches( data ) {
    const arrBranches: Array<object> = [];

    data.forEach( ( value, index ) => {
      if ( this.validateBranchesToCompareName( value ) ) {

        arrBranches[ index ] = value;
        arrBranches[ index ][ 'isReload' ] = false;
        arrBranches[ index ][ 'compare' ] = {};
        arrBranches[ index ][ 'commit' ][ 'commit' ] = {};
        arrBranches[ index ][ 'commit' ][ 'commit' ][ 'committer' ] = {};

        this.branchesToCompareValidated.forEach( ( branchToCompare: any, index2 ) => {

          if ( index2 + 1 === this.branchesToCompareValidated.length ) {
            this.githubv3Service.getHash( { owner: this.owner, repo: this.repository, sha: arrBranches[ index ]['commit']['sha'] } )
              .subscribe( ( result2 ) => {
                arrBranches[ index ][ 'commit' ] = result2;
              } );
            this.branchesData.push( arrBranches[ index ] );
          }

          this.githubv3Service.getCompare( { owner: this.owner, repo: this.repository, base: branchToCompare, head: value.name } )
            .subscribe( ( result ) => {

              arrBranches[ index ][ 'compare' ][ branchToCompare ] = result;
              arrBranches[ index ][ 'compare' ][ branchToCompare ][ 'have_script' ] = false;

              arrBranches[ index ][ 'compare' ][ branchToCompare ][ 'files' ].forEach( ( file ) => {
                if ( file.filename.match( this.pattSql ) ) {
                  arrBranches[ index ][ 'compare' ][ branchToCompare ][ 'have_script' ] = true;
                }
              } ) ;
              
            }, 
            error => {
              M.toast( { html: "Erro ao listar branches" } )
            },
            () => {
              setTimeout( () => {
                this.setShowLoadingBranches( false );
                
                var tooltipElems = document.querySelectorAll( '.tooltipped' );
                M.Tooltip.init( tooltipElems, {} );
              }, 1000 );
            } );

        } );

      }

    } );
  }

  /**
   * Atualiza as compara????es de branches da branch selecionada
   * @param branch
   * @param isMerge
   */
  reloadBranch( branch, isMerge = false ) {
    branch[ 'isReload' ] = true;

    this.branchesToCompareValidated.forEach( ( branchToCompare: any, indexBranchToCompare ) => {

      this.githubv3Service.getCompare( { owner: this.owner, repo: this.repository, base: branchToCompare, head: branch.name } )
        .subscribe( ( result ) => {

          branch[ 'compare' ][ branchToCompare ] = result;
          branch[ 'compare' ][ branchToCompare ][ 'have_script' ] = false;

          branch[ 'compare' ][ branchToCompare ][ 'files' ].forEach( ( file ) => {
            if ( file.filename.match( this.pattSql ) ) {
              branch[ 'compare' ][ branchToCompare ][ 'have_script' ] = true;
            }
          } ) ;

          if ( indexBranchToCompare + 1 === this.branchesToCompareValidated.length ) {
            branch[ 'isReload' ] = false;
            if ( isMerge ) {
              this.updateArrayBranchesData( branch );
            }
          }

        } );

    } );

  }

  /**
   * Verifica se o array tem a propriedade informada
   * @param data
   * @param property
   * @returns {boolean}
   */
  verifyIfHaveProperty( data, property ) {
    if ( data ) {
      return data.hasOwnProperty( property );
    }
    return false;
  }

  /**
   * Atualiza os nomes das branches para compara????o
   *
   * Por padr??o as compara????es ser??o feitas com as branches definidas em branchesToCompare
   * Para evitar erros, ?? feita uma verifica????o se estas branches existem e uma nova vari??vel ?? criada com os nomes
   * das branches para compara????o final
   * @param value
   */
  updateBranchesToCompareName( value: any ) {
    if ( this.branchesToCompare.includes( value.name ) ) {
      if ( this.branchesToCompareValidated.includes( value.name ) ) {
      } else {
        this.branchesToCompare.forEach( ( data, key ) => {
          if ( data === value.name ) {
            this.branchesToCompareValidated[ key ] = value.name;
          }
        } );
      }
    }
  }

  /**
   * Valida????o dos nomes das branches
   * @param value
   * @returns {any}
   */
  validateBranchesToCompareName( value: Branch ) {
    if ( this.branchesToCompare.includes( value.name ) ) {
      return false;
    } else {
      return true;
    }

  }

  getClassesToButton( compare: CompareBranch ) {
    if ( this.verifyIfHaveProperty( compare, 'ahead_by' ) ) {
      if ( compare.ahead_by >= 1 && compare.have_script === false ) {
        return ' blue ';
      }

      if ( compare.ahead_by >= 1 && compare.have_script === true ) {
        return ' orange ';
      }

      if ( compare.ahead_by === 0 && compare.have_script === false ) {
        return ' green btn-flat white-text';
        // return ' transparent btn-flat green-text ';
      }
    }

    return 'btn-flat transparent disabled';
  }

  verifyIfHaveAheadCommits( data: CompareBranch ) {
    if ( this.verifyIfHaveProperty( data, 'ahead_by' ) ) {
      return data.ahead_by;
    }
    return 0;
  }

  setShowLoadingBranches( value ) {
    this.showLoadingBranches = value;
  }

  openModalToRemoveBranch( branch ) {
    delete this.formDataToRemoveBranch.confirmNameToRemoval;
    this.formDataToRemoveBranch = branch;
  }

  openModalConfirmMerge() {
    const instanceModalCommitsMerge = M.Modal.init( this.modalCommitsBranch.nativeElement );
    const instanceModalConfirmMerge = M.Modal.init( this.modalConfirmMerge.nativeElement );

    instanceModalCommitsMerge.close();
    instanceModalConfirmMerge.open();
  }

  closeModalConfirmMerge() {
    const instanceModalConfirmMerge = M.Modal.init( this.modalConfirmMerge.nativeElement );
    instanceModalConfirmMerge.close();
  }

  bindBranchDataToModal( obj: Branch, compareWith: string, index ) {
    const newObj: CommitsBranch = obj.compare[ compareWith ];

    delete newObj.merge_result_status;
    delete newObj.merge_result_message;

    newObj.name = obj.name;
    newObj.compare_with = compareWith;
    newObj.index = index;
    newObj.scripts = [];
    newObj.total_scripts = 0;

    obj.compare[ compareWith ].files.forEach( value => {

      if ( value.blob_url.match( this.pattSql ) ) {

        newObj.scripts.push( value.blob_url );
        newObj.total_scripts++;

      }

    } );

    this.formDataCommitsBranch = newObj;
  }

  /**
   * Pepara objeto para merge entre as branches
   * @param branch
   */
  mergeBranchesCompare( branch ) {
    branch.merge_waiting = true;

    const obj: object = {
      owner: this.owner,
      base: branch.compare_with,
      head: branch.name,
      repo: this.repository,
      commit_message: '???? Merge ' + branch.name + ' into ' + branch.compare_with + ' (gitpanel)'
    };

    this.githubv3Service.postMerge( obj )
      .subscribe( data => {
        branch.merge_result_status = 'ok';
        branch.merge_result_message = 'Merge realizado com sucesso!';
        branch.merge_waiting = false;
        this.reloadBranch( this.branchesData[ branch.index ], true );
        setTimeout( () => {
          this.closeModalConfirmMerge();
        }, 1800 );
      }, data => {
        branch.merge_result_status = 'error';
        branch.merge_result_message = data.error.message;
        branch.merge_waiting = false;
      } );
  }

  updateArrayBranchesData( branch: any ) {
    this.branchesData.filter( ( data: any, key ) => {
      if ( branch.name === data.name ) {
        const compare_with = branch.compare_with;
        this.branchesData[ key ]['compare'][ compare_with ] = branch;
      }
    } );
  }

  removeBranch( branch ) {
    if ( branch.name === branch.confirmNameToRemoval ) {
      const objToDelete = {
        owner: this.owner,
        ref: branch.name,
        repo: this.repository,
      };
      this.githubv3Service.deleteBranch( objToDelete )
        .subscribe( () => {
          this.preLoadBranches();
        } );
    } else {
      alert('Voc?? tentou fraudar uma valida????o. CUIDADO!');
    }
  }

  checkboxToCompare( branch, branchToMerge ) {
    const it = branch.name + '>|<' +  branchToMerge;

    if ( this.branchesToMerge.length === 0 ) {
      this.branchesToMerge.push( it );
    } else {
      if ( this.branchesToMerge.includes( it ) ) {
        this.branchesToMerge.splice( this.branchesToMerge.indexOf( it ), 1 );
      } else {
        this.branchesToMerge.push( it );
      }
    }
  }

  mergeSelectedBranches() {
    this.branchesToMerge.forEach( ( data: string ) => {
      const res = data.split( '>|<' );

      this.mergeBranchesCompare( { name: res[ 0 ], compare_with: res[ 1 ] } );
    } );
  }

  toggleMultMerges( value ) {
    if ( value === false ) {
      this.branchesToMerge = [];
    }
  }

  openBranchCommitUrl( obj ) {
    window.open('https://github.com/' + this.owner + '/' + this.repository + '/commit/' + obj.commit.sha );
  }

  openCommitUrl( commit ) {
    window.open( commit.html_url );
  }

  openScript( script ) {
    window.open( script );
  }

  openTree( branch ) {
    window.open( 'https://github.com/' + this.owner + '/' + this.repository + '/tree/' + branch );
  }

  dragstart_handler( ev ) {
    ev.dataTransfer.setData( 'text/plain', 'merge' );
    document.getElementById( 'labelDragToHere' ).innerText = "Solte aqui";
  }
   
  dragover_handler( ev ) {
    ev.preventDefault();
  }
   
  drop_handler( ev ) {
    ev.preventDefault();
    // Get the data, which is the id of the drop target
    var data = ev.dataTransfer.getData( 'text' );
    if ( data == 'merge' ) {
      //this.openModalConfirmMerge();
      this.mergeBranchesCompare( this.formDataCommitsBranch );
    }
    // Clear the drag data cache (for all formats/types)
    ev.dataTransfer.clearData();

    const drag = this.dragDivMerge.nativeElement;
    const drop = this.dropDivMerge.nativeElement;
    //drop.style.border = 'none';
    //drag.style.border = 'none';
  }

  mouseOver( ev ) {
    ev.currentTarget.classList.remove( 'blink' );
    this.dropDivMerge.nativeElement.classList.add( 'blink' );
    document.getElementById( 'labelDragToHere' ).innerText = "Arraste para c??";
    document.getElementById( 'labelDragToMerge' ).innerText = "??";
  }

  mouseOut( ev ) {
    ev.currentTarget.classList.add( 'blink' );
    ev.currentTarget.style.border = "none";

    this.dropDivMerge.nativeElement.classList.remove( 'blink' );
    document.getElementById( 'labelDragToHere' ).innerText = "??";
    document.getElementById( 'labelDragToMerge' ).innerText = "Arraste para mergear";
  }

}
