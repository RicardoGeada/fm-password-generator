import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordStrength } from './password-strength/password-strength';
import { PasswordService } from '../../services/passwordservice';

@Component({
  selector: 'app-password-settings',
  imports: [FormsModule, PasswordStrength],
  templateUrl: './password-settings.html',
  styleUrl: './password-settings.scss',
})
export class PasswordSettings {

  constructor(public ps: PasswordService) {}

  get sliderPercentage(): string {
    return (this.ps.length() / this.ps.maxLength) * 100 + '%';
  }

  onSliderChange(event: Event) {
    const value = +(event.target as HTMLInputElement).value;
    this.ps.length.set(value);
  }

  onCheckboxChange(event: Event, signal: { set: (value: boolean) => void}) {
    const checked = (event.target as HTMLInputElement).checked;
    signal.set(checked);
  }
}
