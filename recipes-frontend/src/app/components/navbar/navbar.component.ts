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
    if (this.isLoggedIn) {
      this.username = (await this.keycloakService.loadUserProfile()).username!;
    }
  }

  onLogin(): void {
    this.keycloakService.login();
  }

  onLogout(): void {
    this.keycloakService.logout(window.location.origin);
  }

  onRegister(): void {
    this.keycloakService.register();
  }

}