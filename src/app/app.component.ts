import { Component, ViewChild, OnInit } from '@angular/core';
import { ContentSearchComponent } from '../components/content-search/content-search.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet,
    NavbarComponent,
    FooterComponent,
    ContentSearchComponent,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(ContentSearchComponent) contentSearchComponent!: ContentSearchComponent;

  ngOnInit(): void {
  }
  
}