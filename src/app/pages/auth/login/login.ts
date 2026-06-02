import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private router = inject(Router);

  email = '';
  password = '';
  errorMsg = '';

  submit(): void {
    if (!this.email || !this.password) {
      this.errorMsg = 'Preencha todos os campos.';
      return;
    }
    sessionStorage.setItem('finansys_logged', 'true');
    this.router.navigate(['/dashboard']);
  }
}
