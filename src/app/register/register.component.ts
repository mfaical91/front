import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService, RegisterRequest } from '../../shared/data-access/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-register',
  template: `
    <form #form="ngForm" (ngSubmit)="onRegister(form)">
      <div>
        <label>Username</label>
        <input pInputText name="username" ngModel required />
      </div>
      <div>
        <label>Firstname</label>
        <input pInputText name="firstname" ngModel required />
      </div>
      <div>
        <label>Email</label>
        <input pInputText name="email" ngModel type="email" required />
      </div>
      <div>
        <label>Password</label>
        <input pInputText name="password" ngModel type="password" required />
      </div>
      <p-button type="submit" label="Register"></p-button>
    </form>
  `,
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule]
})
export class RegisterComponent {

  constructor(private authService: AuthService) {}

  onRegister(form: NgForm) {
    if (form.valid) {
      const request: RegisterRequest = form.value;
      this.authService.register(request).subscribe({
        next: (res) => {
          console.log('Compte créé :', res);
          alert('Compte créé avec succès !');
        },
        error: (err) => {
          console.error(err);
          alert('Erreur lors de la création du compte');
        }
      });
    }
  }
}
