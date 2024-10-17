import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>; 
  name: string = '';
  email: string = '';
  photo: File | null = null;
  photoPreview: string | ArrayBuffer | null = null;  

  constructor(private router: Router) {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.photo = input.files[0];  

      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview = reader.result;
      };
      reader.readAsDataURL(this.photo);
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onSubmit(): void {
    if (this.name && this.email && this.photo) {
      const reader = new FileReader();
      reader.onload = () => {
        const photoDataUrl = reader.result as string;

        const userData = {
          name: this.name,
          email: this.email,
          photo: photoDataUrl
        };

        sessionStorage.setItem('dadosUsuarioLogado', JSON.stringify(userData));

        const dadosUsuariosLocais = JSON.parse(localStorage.getItem('dadosUsuariosLocais') || '{}');
        if (!dadosUsuariosLocais[this.email]) {
          dadosUsuariosLocais[this.email] = { nome: this.name, photo: photoDataUrl };
          localStorage.setItem('dadosUsuariosLocais', JSON.stringify(dadosUsuariosLocais));
        }
        this.router.navigate(['/login']);
      };

      reader.readAsDataURL(this.photo);
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
}