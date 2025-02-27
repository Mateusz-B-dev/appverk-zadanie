import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TranslationDictionary {
  [key: string]: string;
}

export type SupportedLanguage = 'pl' | 'en';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = new BehaviorSubject<SupportedLanguage>('pl');
  
  private translations: Record<SupportedLanguage, TranslationDictionary> = {
    'pl': {
      'login.title': 'Logowanie',
      'login.email': 'Email',
      'login.password': 'Hasło',
      'login.submit': 'Zaloguj się',
      'login.email.placeholder': 'Wprowadź email',
      'login.password.placeholder': 'Wprowadź hasło',
      'login.error': 'Błąd logowania. Spróbuj ponownie.',
      'validation.required': 'To pole jest wymagane',
      'validation.email': 'Podaj poprawny adres email',
      'home.title': 'Strona główna',
      'home.logout': 'Wyloguj',
      'home.loading': 'Ładowanie danych użytkownika...',
      'home.error': 'Błąd podczas pobierania danych użytkownika',
      'home.user.info': 'Dane użytkownika:',
      'home.user.id': 'ID',
      'home.user.name': 'Imię i nazwisko',
      'home.user.email': 'Email',
      'home.user.role': 'Rola'
    },
    'en': {
      'login.title': 'Login',
      'login.email': 'Email',
      'login.password': 'Password',
      'login.submit': 'Sign in',
      'login.email.placeholder': 'Enter email',
      'login.password.placeholder': 'Enter password',
      'login.error': 'Login error. Please try again.',
      'validation.required': 'This field is required',
      'validation.email': 'Please enter a valid email address',
      'home.title': 'Home Page',
      'home.logout': 'Logout',
      'home.loading': 'Loading user data...',
      'home.error': 'Error while fetching user data',
      'home.user.info': 'User information:',
      'home.user.id': 'ID',
      'home.user.name': 'Full name',
      'home.user.email': 'Email',
      'home.user.role': 'Role'
    }
  };

  constructor() {
    const savedLang = localStorage.getItem('preferredLanguage') as SupportedLanguage;
    if (savedLang && this.isLanguageSupported(savedLang)) {
      this.currentLang.next(savedLang);
    }
  }

  getCurrentLang(): SupportedLanguage {
    return this.currentLang.value;
  }

  onLanguageChange(): Observable<SupportedLanguage> {
    return this.currentLang.asObservable();
  }

  setLanguage(lang: SupportedLanguage): void {
    if (this.isLanguageSupported(lang)) {
      this.currentLang.next(lang);
      localStorage.setItem('preferredLanguage', lang);
    }
  }

  translate(key: string, params: Record<string, string> = {}): string {
    const lang = this.currentLang.value;
    let translation = this.translations[lang][key] || key;
    
    Object.keys(params).forEach(param => {
      translation = translation.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
    });
    
    return translation;
  }

  private isLanguageSupported(lang: string): boolean {
    return Object.keys(this.translations).includes(lang);
  }
}