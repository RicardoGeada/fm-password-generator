import { Component, signal } from '@angular/core';
import { PasswordService } from '../../services/passwordservice';

@Component({
  selector: 'app-password-display',
  imports: [],
  templateUrl: './password-display.html',
  styleUrl: './password-display.scss',
})
export class PasswordDisplay {
  copied = signal(false);

  constructor(public ps: PasswordService) {}


  /**
   * Copy password to clipboard
   * - set copied state for UI
   * @returns void
   */
  copyPassword() {
    const password = this.ps.password();
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      this.copied.set(true);

      setTimeout(() => {
        this.copied.set(false);
      }, 1500);
    });
  }
}
