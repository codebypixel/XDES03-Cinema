import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isDropdownVisible = false;
  isMenuVisible = false;

  @Output() searchTextChanged = new EventEmitter<string>();

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  onSearchTextChanged(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTextChanged.emit(inputElement.value);
  }
}