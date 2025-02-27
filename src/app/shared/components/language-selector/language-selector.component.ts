import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportedLanguage, TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LanguageSelectorComponent implements OnInit {
  currentLang!: SupportedLanguage;
  languages: { code: SupportedLanguage, name: string }[] = [
    { code: 'pl', name: 'Polski' },
    { code: 'en', name: 'English' }
  ];
  
  constructor(private translationService: TranslationService) {}
  
  ngOnInit(): void {
    this.currentLang = this.translationService.getCurrentLang();
    this.translationService.onLanguageChange().subscribe(lang => {
      this.currentLang = lang;
    });
  }
  
  changeLanguage(lang: SupportedLanguage): void {
    this.translationService.setLanguage(lang);
  }
}