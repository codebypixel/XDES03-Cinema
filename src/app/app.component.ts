import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ContentSearchComponent } from '../components/content-search/content-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ContentSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cineNTT';

  @ViewChild(ContentSearchComponent) contentSearchComponent!: ContentSearchComponent;

  handleSearchTextChanged(searchText: string): void {
    if(!this.contentSearchComponent) {
      return;
    }
    this.contentSearchComponent.updateSearchText(searchText);
  }
}
