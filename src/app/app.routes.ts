import { Routes } from '@angular/router';
import { ContentSearchComponent } from '../components/content-search/content-search.component'; 
import { MovieDetailsComponent } from '../components/movie-details/movie-details.component'; 
import { LoginComponent } from '../components/login/login.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'populares',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'populares',
    component: ContentSearchComponent,
    canActivate: [AuthGuard], 
  },
  {
    path: 'favoritos',
    component: ContentSearchComponent,
    canActivate: [AuthGuard], 
  },
  {
    path: 'search',
    component: ContentSearchComponent,
    canActivate: [AuthGuard], 
  },
  {
    path: 'movie/:title',
    component: MovieDetailsComponent, 
    canActivate: [AuthGuard], 
  },
  {
    path: '**', 
    redirectTo: 'login',
  },
];
