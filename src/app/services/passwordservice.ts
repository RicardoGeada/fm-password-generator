import { Injectable, signal } from '@angular/core';
import { PasswordStrengthType } from '../types/password.type';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  maxLength = 20;

  // settings states
  length = signal(0);
  uppercase = signal(false);
  lowercase = signal(false);
  numbers = signal(false);
  symbols = signal(false);

  password = signal('');
  passwordStrength = signal<PasswordStrengthType>('');
}
