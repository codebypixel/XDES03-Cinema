import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';

  constructor(private router: Router, private toastService: ToastService) {}

  onSubmit(): void {
    if (!this.email || !this.isValidEmail(this.email)) {
      this.toastService.warn('Por favor, insira um e-mail válido.');
      return;
    }

    const dadosUsuariosLocais = JSON.parse(
      localStorage.getItem('dadosUsuariosLocais') || '{}'
    );

    if (dadosUsuariosLocais[this.email]) {
      sessionStorage.setItem('emailLogado', this.email);
      this.toastService.success('Login realizado com sucesso!');
      this.router.navigate(['/populares']);
    } else {
      this.toastService.error('Usuário não encontrado. Verifique seu e-mail.');
    }
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  navigateToSignUp(): void {
    this.router.navigate(['/signup']);
  }
}