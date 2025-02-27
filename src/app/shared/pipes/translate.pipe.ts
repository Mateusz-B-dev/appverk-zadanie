import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false // Pozwala na aktualizację, gdy zmienia się język
})
export class TranslatePipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}
  
  transform(key: string, params: Record<string, string> = {}): string {
    return this.translationService.translate(key, params);
  }
}