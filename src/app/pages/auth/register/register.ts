import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private router = inject(Router);

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMsg = '';

  submit(): void {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMsg = 'Preencha todos os campos.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'As senhas não conferem.';
      return;
    }
    sessionStorage.setItem('finansys_logged', 'true');
    this.router.navigate(['/dashboard']);
  }
}
