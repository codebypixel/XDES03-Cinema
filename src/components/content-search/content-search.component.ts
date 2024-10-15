import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { RouterModule } from '@angular/router'; 
import { MovieCardsComponent } from '../movie-cards/movie-cards.component'; 
import { OMDbMovie } from '../../services/models/omdbTypes';
import { TmdbService } from '../../services/tmdb-api.service';

@Component({
  selector: 'content-search',
  standalone: true,
  imports: [CommonModule, RouterModule, MovieCardsComponent], 
  templateUrl: './content-search.component.html',
  styleUrls: ['./content-search.component.scss'],
})
export class ContentSearchComponent implements OnInit {
  searchText$ = new BehaviorSubject<string>('');
  movies: OMDbMovie[] = []; 
  loading = true;

  constructor(private tmdbService: TmdbService) {} 

  ngOnInit(): void {
    this.loadPopularMovies(); 
  }

  // Método para carregar filmes populares
  loadPopularMovies(page: number = 1): void {
    this.loading = true; 
    this.tmdbService.getPopularMovies(page).subscribe({
      next: (response) => {
        this.movies = response.results; 
        this.loading = false; 
      },
      error: (error) => {
        console.error('Erro ao buscar filmes populares:', error);
        this.loading = false; 
      },
      complete: () => {
        console.log('Requisição de filmes populares completa');
      }
    });
  }

  // Método para atualizar a busca de filmes
  updateSearchText(text: string): void {
    this.searchText$.next(text); 
    if (text) {
      this.searchMovies(text); 
    } else {
      this.loadPopularMovies(); 
    }
  }

  // Método para buscar filmes com base na consulta
  searchMovies(query: string): void {
    this.loading = true;
    this.tmdbService.searchMovies(query).subscribe({
      next: (response) => {
        this.movies = response.results; 
        this.loading = false; 
      },
      error: (error) => {
        console.error('Erro ao buscar filmes:', error);
        this.loading = false; 
      },
      complete: () => {
        console.log('Requisição de busca de filmes completa');
      }
    });
  }
}
