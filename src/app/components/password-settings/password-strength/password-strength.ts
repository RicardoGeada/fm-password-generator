import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { PasswordStrengthType } from '../../../types/password.type';

@Component({
  selector: 'app-password-strength',
  imports: [NgClass],
  templateUrl: './password-strength.html',
  styleUrl: './password-strength.scss',
})
export class PasswordStrength {
  @Input() value: PasswordStrengthType = '';

  get strengthText(): string {
    return this.value == 'too-weak' ? "TOO WEAK!" : this.value;
  }

  get strengthClass(): string | null {
    return this.value ? 'password-strength__value--' + this.value : null;
  }
}
