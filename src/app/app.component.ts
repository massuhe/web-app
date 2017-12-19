import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './core/authentication.service';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  appDidInit: boolean;

  constructor(private authService: AuthenticationService) {
    this.authService.init();
    this.authService.loginChanges().subscribe(_ => {
      this.appDidInit = true;
    });
  }

}
