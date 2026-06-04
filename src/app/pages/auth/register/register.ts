import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FinancialService } from '../../../core/services/financial';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private router = inject(Router);
  private authService = inject(AuthService);
  private financialService = inject(FinancialService);

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMsg = '';
  loading = false;
  showPassword = false;
  showConfirmPassword = false;

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  submit(): void {
    this.errorMsg = '';

    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMsg = 'Preencha todos os campos.';
      return;
    }
    if (!this.isValidEmail(this.email)) {
      this.errorMsg = 'Informe um e-mail válido.';
      return;
    }
    if (this.password.length < 6) {
      this.errorMsg = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'As senhas não conferem.';
      return;
    }

    this.loading = true;

    this.authService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.financialService.loadAll();
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.loading = false;
        if (err.status === 409) {
          this.errorMsg = 'E-mail já cadastrado.';
        } else if (err.status === 0 || err.status == null) {
          this.errorMsg = 'Erro ao conectar. Tente novamente.';
        } else {
          this.errorMsg = 'Erro ao criar conta. Tente novamente.';
        }
      },
    });
  }
}
