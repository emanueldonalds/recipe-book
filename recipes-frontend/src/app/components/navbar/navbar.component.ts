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

  async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();
    console.log("Logged in: " + this.isLoggedIn);
    if (this.isLoggedIn) {
      this.keycloakService.loadUserProfile().then(userProfile => this.username = userProfile.username!);
    }
    console.log(JSON.stringify(this.keycloakService.getKeycloakInstance()));
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