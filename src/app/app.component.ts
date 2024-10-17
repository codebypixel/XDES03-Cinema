import { Component, ViewChild, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ContentSearchComponent } from '../components/content-search/content-search.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ContentSearchComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(ContentSearchComponent) contentSearchComponent!: ContentSearchComponent;
  currentRoute: string = '';
  loading: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = (event as NavigationEnd).url;
      });

    if (isPlatformBrowser(this.platformId)) {
      this.checkLoggedIn();
    }
  }

  ngAfterViewInit(): void {
    if (this.authService.isLoggedIn()) {
      this.contentSearchComponent.loadPopularMovies(1);
    }
  }
  
  async checkLoggedIn(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    if (!this.authService.isLoggedIn() && !this.isLoginOrSignup()) {
      this.router.navigate(['/login']);
    }

    this.loading = false;
  }

  isLoginOrSignup(): boolean {
    return this.currentRoute === '/login' || this.currentRoute === '/signup';
  }

}