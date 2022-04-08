import { Component, isDevMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recipes-frontend';

  ngOnInit() {
    if (isDevMode()) {
      console.log ("Development server")
    }
    else {
      console.log("Prod server")
    }
  }
}
