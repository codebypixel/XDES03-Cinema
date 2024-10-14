import { Component, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ContentSearchComponent } from '../components/content-search/content-search.component';
import { TmdbService } from '../services/tmdb-api.service'; 
import { HttpErrorResponse } from '@angular/common/http';
import { OMDbSearchResult } from '../services/models/omdbTypes'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    ContentSearchComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'cineNTT';
  movies: OMDbSearchResult['Search'] = []; 
  searchResults: OMDbSearchResult['Search'] = []; 

  @ViewChild(ContentSearchComponent) contentSearchComponent!: ContentSearchComponent;

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.tmdbService.getPopularMovies().subscribe(
      (response: { results: OMDbSearchResult['Search'] }) => {
        this.movies = response.results;
      },
      (error: HttpErrorResponse) => {
        console.error('Erro ao buscar filmes populares:', error.message);
      }
    );
  }

  handleSearchTextChanged(searchText: string): void {
    if (!this.contentSearchComponent) {
      return;
    }

    this.tmdbService.searchMovies(searchText).subscribe(
      (response: { Search: OMDbSearchResult['Search'] }) => {
        this.searchResults = response.Search;
      },
      (error: HttpErrorResponse) => {
        console.error('Erro ao buscar filmes:', error.message);
      }
    );
  }
}