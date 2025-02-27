import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationService } from '../services/translation.service';

@Directive({
  selector: '[appTranslate]',
  standalone: true
})
export class TranslateDirective implements OnInit, OnDestroy {
  @Input('appTranslate') key: string = '';
  @Input('appTranslateParams') params: Record<string, string> = {};
  
  private langChangeSubscription?: Subscription;
  
  constructor(
    private el: ElementRef<HTMLElement>,
    private translationService: TranslationService
  ) {}
  
  ngOnInit(): void {
    // Ustaw początkowe tłumaczenie
    this.updateTranslation();
    
    // Aktualizuj tłumaczenie, gdy zmieni się język
    this.langChangeSubscription = this.translationService.onLanguageChange()
      .subscribe(() => {
        this.updateTranslation();
      });
  }
  
  ngOnDestroy(): void {
    // Wyczyść subskrypcję
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
  
  private updateTranslation(): void {
    if (this.key) {
      this.el.nativeElement.innerText = this.translationService.translate(this.key, this.params);
    }
  }
}