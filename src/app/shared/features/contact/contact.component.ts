import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from "primeng/card";
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ContactService } from '../../data-access/contact.service';

@Component({
  standalone: true,
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [
    FormsModule,
  InputTextModule,
  InputTextareaModule,
  ButtonModule,
  CardModule
  ]
})
export class ContactComponent {

  email = '';
  message = '';
  sending = false;

  constructor(
    private messageService: MessageService,
    private contactService: ContactService
  ) {}

  send() {
    if (!this.email || !this.message || this.message.length > 300) {
      return;
    }

    this.sending = true;

    this.contactService.send(this.email, this.message).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Demande de contact envoyée avec succès'
        });
        this.email = '';
        this.message = '';
        this.sending = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de l’envoi du message'
        });
        this.sending = false;
      }
    });
  }
}
