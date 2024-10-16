import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MovieCardsComponent } from '../movie-cards/movie-cards.component';
import { TmdbService } from '../../services/tmdb-api.service';
import { OMDbMovie, OMDbSearchRequest } from '../../services/models/omdbTypes';
import { OmdbApiService } from '../../services/omdb-api.service';
import { SearchService } from '../../services/search.service';
import { TmdbMovie } from '../../services/models/tmdbTypes';

@Component({
  selector: 'content-search',
  standalone: true,
  imports: [CommonModule, MovieCardsComponent],
  templateUrl: './content-search.component.html',
  styleUrls: ['./content-search.component.scss'],
})
export class ContentSearchComponent implements OnInit, OnDestroy {
  movies: OMDbMovie[] | TmdbMovie[] = [];
  loading = true;
  private searchSubscription!: Subscription;

  constructor(private tmdbService: TmdbService, private searchService: SearchService, private omdbService: OmdbApiService) {}

  ngOnInit(): void {
    this.loadPopularMovies();
    this.searchSubscription = this.searchService.getSearchTextObservable().subscribe((query) => {
      this.searchMovies(query);
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe(); 
    }
  }

  loadPopularMovies(page: number = 1): void {
    this.loading = true;
    this.tmdbService.getPopularMovies(page).subscribe({
      next: (response) => {
        this.movies = response.results.map((movie: any) => ({
          title: movie.title,
          release_date: movie.release_date,
          poster_path: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
          }));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching popular movies:', error);
        this.loading = false;
      },
    });
  }
  
  private parseMovies(response: any): any[] {
    return (response.Search || []).map((movie: any) => ({
        title: movie.Title,
        release_date: movie.Released,
        poster_path: movie.Poster,
    }));
  }

  searchMovies(query: string): void {
    if(!query) {
      this.loadPopularMovies();
      return;
    }
    
    this.loading = true;

    const params: any = {
        s: query, 
        type: 'movie', 
    };

    this.omdbService.searchMovies(params).subscribe({
        next: (response) => {
          this.movies = this.parseMovies(response);
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao buscar filmes:', err);
          this.loading = false;
        }
    });
  }

}