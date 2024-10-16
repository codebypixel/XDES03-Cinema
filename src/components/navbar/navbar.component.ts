import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';  // Importando o Router

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterViewInit {
  isDropdownVisible = false;
  isMenuVisible = false;
  private searchTextChanged = new Subject<string>();

  constructor(private searchService: SearchService, private router: Router) { // Injetando o Router
    this.searchTextChanged.pipe(debounceTime(500)).subscribe((searchText) => {
      this.searchService.emitSearchText(searchText);
      
      if (searchText.trim()) {
        // Navega para a rota /search sem recarregar o componente
        this.router.navigate(['/search']);
      }
    });
  }

  ngAfterViewInit(): void {}

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  onSearchTextChanged(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTextChanged.next(inputElement.value);
  }
}
