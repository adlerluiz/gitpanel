import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentOrganization = localStorage.getItem( 'current_organization' );
  currentRepository = localStorage.getItem( 'current_repository' );

  constructor(
  ) {

  }

  ngOnInit() {

  }

}
