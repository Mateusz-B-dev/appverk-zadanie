
# Prosty Projekt Angular

Jest to prosty projekt Angular z niestandardowym systemem tłumaczeń, który obsługuje wsparcie wielojęzyczne.

## Funkcje

- **Niestandardowy System Tłumaczeń**: Niestandardowy mechanizm tłumaczeń do obsługi dynamicznej zmiany języków w aplikacji.
- **Ustawienia Angular**: Podstawowa konfiguracja Angular z komponentami, routowaniem i serwisami.

## Rozpoczęcie pracy

### 1. Sklonuj repozytorium
```bash
git clone https://github.com/Mateusz-B-dev/appverk-zadanie.git
```

### 2. Zainstaluj zależności
Przejdź do katalogu projektu i zainstaluj zależności:
```bash
cd appverk-zadanie
npm install
```

### 3. Uruchom aplikację
Po zainstalowaniu zależności, możesz uruchomić aplikację:
```bash
ng serve
```
Aplikacja będzie dostępna pod adresem [http://localhost:4200](http://localhost:4200).

## Niestandardowy System Tłumaczeń

W projekcie zastosowano niestandardowy system tłumaczeń, w którym:

- **Serwis Tłumaczeń**: `TranslationService` odpowiada za zarządzanie danymi językowymi i dynamiczną zmianę języków w aplikacji.
- **Selektor Języka**: Prosty dropdown pozwala użytkownikowi wybrać preferowany język (np. Polski, Angielski).
- **Pliki Tłumaczeń**: Pliki językowe są strukturalnie zapisane w parach klucz-wartość, co umożliwia łatwe dodawanie nowych języków.

### Serwis Tłumaczeń

Serwis `TranslationService` znajduje się w folderze `services`. Zawiera metody takie jak:

- `getCurrentLang()`: Zwraca aktualny język.
- `setLanguage(lang: string)`: Ustawia język dynamicznie.
- `translate()`: Pobierz tłumaczenie.
- `onLanguageChange()`: Obserwowanie zmiany języka.

### Pliki Językowe

Na potrzeby zadania tłumaczenia znajdują się w `TranslationService` jednak najlepszym sposobe jest przechowywanie plików w assets/i18n/ 

### Zmiana Języka

Język można zmienić, wywołując metodę `setLanguage` z `TranslationService`:
```typescript
this.translationService.setLanguage('pl');
```

To automatycznie zaktualizuje tłumaczenie w całej aplikacji.

## Struktura Katalogów

```
src/
├── app/
│   ├── core/
|   │   ├── auth/
│   ├── modules/
|   │   ├── auth/
|   │   |   ├── login/
|   │   ├── home/
│   ├── shared/
|   │   ├── components/
|   │   ├── directives/
|   │   ├── model/
|   │   ├── pipes/
|   │   ├── services/
|   │   ├── validators/
│   └── app.component.ts
├── assets/
```

## Licencja

Ten projekt jest dostępny na licencji MIT.
