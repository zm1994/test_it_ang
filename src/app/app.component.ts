/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnChanges
} from '@angular/core';
import { AppState } from './app.service';
import { AuthorizationService } from './services/authorization.service'
import { Subscription } from 'rxjs/Subscription'
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../assets/css/app.component.css'],
  templateUrl: 'app.component.html',
  providers: [AuthorizationService]
})
export class AppComponent implements  OnInit {
  userLogged: boolean;
  subscription: Subscription;

  constructor(
    public appState: AppState,
    private authServ: AuthorizationService) {
      this.authServ.authentificated.subscribe((value: boolean) => console.log(value))
  }

  ngOnInit() {
    //hide links login and signup if logged
    //this.subscription = this.authServ.authentificated.subscribe((value: boolean) => this.userLogged = value);
    
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
