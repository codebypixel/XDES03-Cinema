import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    const dadosUsuariosLocais = JSON.parse(localStorage.getItem('dadosUsuariosLocais') || '{}');
  
    if (dadosUsuariosLocais[this.email]) {
      sessionStorage.setItem('emailLogado', this.email);
      
      this.router.navigate(['/populares']);
    } else {
      alert('Usuário não encontrado. Verifique seu e-mail.');
    }
  }

  navigateToSignUp(): void {
    this.router.navigate(['/signup']);
  }
}
