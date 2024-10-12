import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isDropdownVisible = false;

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  toggleMenu() {
    const menuElement = document.querySelector('.menu');
    if (menuElement) {
      menuElement.classList.toggle('show');
    }
  }

  @Output() searchTextChanged = new EventEmitter<string>();

  onSearchTextChanged(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTextChanged.emit(inputElement.value);
  }
}