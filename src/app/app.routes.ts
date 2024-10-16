import { Routes } from '@angular/router';
import { ContentSearchComponent } from '../components/content-search/content-search.component'; 
import { MovieDetailsComponent } from '../components/movie-details/movie-details.component'; 

export const routes: Routes = [
  {
    path: '',
    component: ContentSearchComponent, 
  },
  {
    path: 'populares',
    component: ContentSearchComponent,
  },
  {
    path: 'favoritos',
    component: ContentSearchComponent,
    
  },
  {
    path: 'search',
    component: ContentSearchComponent,
  },
  {
    path: 'movie/:title',
    component: MovieDetailsComponent, 
  },
  {
    path: '**', 
    redirectTo: '', 
  },
];
