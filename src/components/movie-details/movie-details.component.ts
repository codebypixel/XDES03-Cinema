import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Adicionar Router para o redirecionamento
import { OmdbApiService } from '../../services/omdb-api.service';
import { OMDbMovie } from '../../services/models/omdbTypes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  movie: OMDbMovie | null = null;
  loading = true;
  isFavorite = false; // Estado para saber se o filme já é favorito

  constructor(private route: ActivatedRoute, private omdbApiService: OmdbApiService, private router: Router) {}

  ngOnInit(): void {
    const movieTitle = this.route.snapshot.paramMap.get('title');
    if (movieTitle) {
      this.omdbApiService.fetchMovieByIdOrTitle({ t: movieTitle }).subscribe({
        next: (res: OMDbMovie) => {
          if (res.Response === 'False') {
            this.loading = false;
            this.redirectToHome();
          } else {
            this.movie = res;
            this.loading = false;
            // Verificar se já é favorito
            this.checkIfFavorite();
          }
        },
        error: (error: any) => {
          console.error('Erro ao buscar detalhes do filme:', error);
          this.loading = false;
          this.redirectToHome();
        }
      });
    } else {
      this.loading = false;
      this.redirectToHome();
    }
  }

  // Função para verificar se o filme já está nos favoritos
  checkIfFavorite(): void {
    if (typeof window !== 'undefined' && sessionStorage.getItem('emailLogado')) {
      const emailLogado = sessionStorage.getItem('emailLogado');
      if (emailLogado && this.movie?.Title) {
        const favoritos = JSON.parse(localStorage.getItem('favoritos') || '{}');
        this.isFavorite = favoritos[emailLogado]?.includes(this.movie.Title);
      }
    }
  }
  

  // Função para adicionar ou remover dos favoritos
  toggleFavorite(): void {
    const emailLogado = sessionStorage.getItem('emailLogado');
    if (!emailLogado || !this.movie?.Title) return;

    let favoritos = JSON.parse(localStorage.getItem('favoritos') || '{}');

    if (!favoritos[emailLogado]) {
      favoritos[emailLogado] = [];
    }

    if (this.isFavorite) {
      // Remover dos favoritos
      favoritos[emailLogado] = favoritos[emailLogado].filter((title: string) => title !== this.movie?.Title);
    } else {
      // Adicionar aos favoritos
      favoritos[emailLogado].push(this.movie?.Title);
    }

    // Atualizar no localStorage
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    this.isFavorite = !this.isFavorite;
  }

  // Função para redirecionar à página inicial após mensagem de erro
  redirectToHome(): void {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000); // Redireciona após 3 segundos
  }

  getStarClass(star: number): string {
    if (star === 1) {
      return 'bi bi-star-fill'; // Estrela cheia
    } else if (star <= 0.5 && star > 0) {
      return 'bi bi-star-half'; // Meia estrela
    } else {
      return 'bi bi-star'; // Estrela vazia
    }
  }
  // Função para gerar o array de estrelas baseado na avaliação
  getStarsArray(): number[] {
    const maxStars = 5;
    
    // Garantir que movie e imdbRating existem
    if (!this.movie || !this.movie.imdbRating) {
      return Array(maxStars).fill(0); // Retorna 5 estrelas vazias se não houver rating
    }
  
    let rating = +this.movie.imdbRating / 2; // Ajustando o valor de 0-10 para 0-5
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 0.5 : 0;
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);
  
    return [
      ...Array(fullStars).fill(1),   // Estrelas cheias
      ...(halfStar ? [0.5] : []),    // Meia estrela
      ...Array(emptyStars).fill(0)   // Estrelas vazias
    ];
  }
  
}
