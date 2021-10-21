import { Component, OnInit } from '@angular/core';
import {OktaAuthStateService} from "@okta/okta-angular";
import {OktaAuth} from "@okta/okta-auth-js";

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string;

  constructor(
    private oktaAuthService: OktaAuthStateService,
    private oktaAuth: OktaAuth
  ) {

  }

  ngOnInit(): void {

    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated;
        this.getUserDetails();
      }
    )
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then(
        res => {
          this.userFullName = res.name;
        }
      );
    }
  }

  logout() {
    this.oktaAuth.signOut();
  }
}
