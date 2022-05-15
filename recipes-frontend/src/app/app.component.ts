import { Component, isDevMode } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recipes-frontend';

  private(keycloakService: KeycloakService) {
    keycloakService.isLoggedIn().then(isLoggedIn => console.log("Is logged in: " + isLoggedIn));
  }

  ngOnInit() {
    if (isDevMode()) {
      console.log ("Development server")
    }
    else {
      console.log("Prod server")
    }
  }
}
