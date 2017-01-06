import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import {RegisterComponent} from './register'
import { AuthorizationService } from './services/authorization.service'
//import { AuthActivateRoute } from './register/auth_activate_route'
import { DataResolver } from './app.resolver';
import {LoginComponent} from "./login/login.component";
import { ProductsComponent } from './products/products.compoennt'

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'detail', loadChildren: './+detail/index#DetailModule'},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent},
  { path: '**',    component: NoContentComponent },
];
