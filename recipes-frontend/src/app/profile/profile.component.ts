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

  constructor(private keycloakService: KeycloakService) { 
    keycloakService.loadUserProfile().then(userProfile => {
      this.username = userProfile.username!;
      this.firstName = userProfile.firstName!;
      this.lastName = userProfile.lastName!;
      this.email = userProfile.email!
    })
  }

  ngOnInit(): void {
  }

  onEdit() {
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

}
