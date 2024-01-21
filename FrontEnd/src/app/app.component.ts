import { Component } from '@angular/core';
import { LocalService } from './services/local-service';
import { DBkeys } from './services/db-keys';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Modernize Angular Admin Tempplate';

  constructor(private localService: LocalService,
    private router: Router) {
  }
  ngOnInit() {
    var isUserLoggedIn = this.localService.getData(DBkeys.IsUserLoggedIn) == "true";
    if (!isUserLoggedIn) {
      this.router.navigate(['/authentication/login']);
    }
  }
}
