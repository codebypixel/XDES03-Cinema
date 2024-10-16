import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchSubject = new Subject<string>();

  emitSearchText(searchText: string) {
    this.searchSubject.next(searchText);
  }

  getSearchTextObservable() {
    return this.searchSubject.asObservable();
  }
}
