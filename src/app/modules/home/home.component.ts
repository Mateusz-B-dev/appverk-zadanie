import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/model/user.model';
import { AuthService } from '../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { TranslateDirective } from '../../shared/directives/translate.directive';
import { LanguageSelectorComponent } from '../../shared/components/language-selector/language-selector.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    TranslateDirective,
    LanguageSelectorComponent
  ]
})
export class HomeComponent implements OnInit {
  user: User | null = null;
  errorMessage: string = '';
  loading: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.authService.getUserData().subscribe({
      next: (userData) => {
        this.user = userData;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Błąd podczas pobierania danych użytkownika';
        this.loading = false;
        console.error('Błąd:', err);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}