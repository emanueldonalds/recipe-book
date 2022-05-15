import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  keycloakService: KeycloakService;
  isLoggedIn: boolean = false;
  username: string = "";

  constructor(keycloakService: KeycloakService) {
    this.keycloakService = keycloakService;
  }

  ngOnInit(): void {
    this.keycloakService.isLoggedIn().then(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.keycloakService.loadUserProfile().then(userProfile => this.username = userProfile.username!);
      }
    })
  }

  onLogin(): void {
    console.log("Login");
    this.keycloakService.login();
  }

  onLogout(): void {
    console.log("Logout");
    this.keycloakService.logout(window.location.origin);
  }

}