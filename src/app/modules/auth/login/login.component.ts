import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../../shared/components/text-input/text-input.component';
import { AuthService } from '../../../core/auth/auth.service';
import { emailValidator } from '../../../shared/validators/email-validator';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { TranslateDirective } from '../../../shared/directives/translate.directive';
import { LanguageSelectorComponent } from '../../../shared/components/language-selector/language-selector.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    TextInputComponent,
    TranslatePipe,
    TranslateDirective,
    LanguageSelectorComponent
  ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', Validators.required]
    });

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
      return;
    }

    const { email, password } = this.loginForm.value;
    
    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = 'Błąd logowania. Spróbuj ponownie.';
        console.error('Błąd logowania:', err);
      }
    });
  }
}