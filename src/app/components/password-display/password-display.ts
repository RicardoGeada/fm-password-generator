import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-password-display',
  imports: [],
  templateUrl: './password-display.html',
  styleUrl: './password-display.scss',
})
export class PasswordDisplay {

  password = signal('');

}
