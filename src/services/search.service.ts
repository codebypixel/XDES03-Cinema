import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTextSubject = new BehaviorSubject<string>('');  // Armazena o último termo de busca
  searchText$ = this.searchTextSubject.asObservable();

  emitSearchText(searchText: string): void {
    this.searchTextSubject.next(searchText);  // Armazena o termo de busca atual
  }

  getLastSearchText(): string {
    return this.searchTextSubject.getValue();  // Retorna o último termo de busca
  }
}
