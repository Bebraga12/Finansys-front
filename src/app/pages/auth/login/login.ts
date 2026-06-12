import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FinancialService } from '../../../core/services/financial';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private router = inject(Router);
  private authService = inject(AuthService);
  private financialService = inject(FinancialService);
  private cdr = inject(ChangeDetectorRef);

  email = '';
  password = '';
  errorMsg = '';
  loading = false;
  showPassword = false;

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  submit(): void {
    if (this.loading) {
      return;
    }

    this.errorMsg = '';

    if (!this.email || !this.password) {
      this.errorMsg = 'Preencha todos os campos.';
      return;
    }
    if (!this.isValidEmail(this.email)) {
      this.errorMsg = 'Informe um e-mail válido.';
      return;
    }

    this.loading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.financialService.loadAll();
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.loading = false;
        this.errorMsg = (err.status === 0 || err.status == null)
          ? 'Erro ao conectar. Tente novamente.'
          : 'E-mail ou senha incorretos.';
        this.cdr.detectChanges();
      },
    });
  }
}
