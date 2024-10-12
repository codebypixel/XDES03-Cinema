import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'content-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-search.component.html',
  styleUrl: './content-search.component.scss'
})
export class ContentSearchComponent implements OnInit {
  searchText$ = new BehaviorSubject<string>('');

  constructor() {}

  ngOnInit(): void {}

  updateSearchText(text: string): void {
    this.searchText$.next(text);
  }
}