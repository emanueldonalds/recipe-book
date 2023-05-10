import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username = "";
  firstName = "";
  lastName = "";
  email = "";
  readRights = true;
  writeRights = false;

  constructor(private keycloakService: KeycloakService) { 
  }

  ngOnInit(): void {
    this.keycloakService.loadUserProfile().then(userProfile => {
      this.username = userProfile.username!;
      this.firstName = userProfile.firstName!;
      this.lastName = userProfile.lastName!;
      this.email = userProfile.email!
      this.writeRights = this.keycloakService.getUserRoles().includes('editor');
    });
  }

  onEdit() {
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

}
