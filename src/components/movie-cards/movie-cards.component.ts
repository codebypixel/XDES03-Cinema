import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'movie-cards',
  standalone: true,
  imports: [RouterModule, CommonModule], 
  templateUrl: './movie-cards.component.html',
  styleUrls: ['./movie-cards.component.scss'],
})
export class MovieCardsComponent {
  @Input() movies: any[] = [];

  constructor() {}
}
