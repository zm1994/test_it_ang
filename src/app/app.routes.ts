import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from './no-content';
import {SignupComponent} from './authorization/signup/signup.component';
import { AuthorizationService } from './services/authorization.service'
import { DataResolver } from './app.resolver';
import {LoginComponent} from "./authorization/login/login.component";
import { ProductsComponent } from './products/products.component'

export const ROUTES: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: ProductsComponent},
  { path: '**',    component: NoContentComponent },
];
