import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-settings',
  imports: [FormsModule],
  templateUrl: './password-settings.html',
  styleUrl: './password-settings.scss',
})
export class PasswordSettings {

  characterLength: number = 0;
  maxLength: number = 20;

  get sliderPercentage(): string {
    return (this.characterLength / this.maxLength) * 100 + '%';
  }

}
