import { computed, Injectable, Signal, signal } from '@angular/core';
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
  chosenOptionsCount: Signal<number> = computed(
    () =>
      Number(this.uppercase()) +
      Number(this.lowercase()) +
      Number(this.numbers()) +
      Number(this.symbols()),
  );
  isGenerateDisabled: Signal<boolean> = computed(
    () =>
      this.chosenOptionsCount() > this.length() ||
      this.length() === 0 ||
      this.chosenOptionsCount() === 0,
  );

  password = signal('');
  passwordStrength = signal<PasswordStrengthType>('');

  /**
   * Shuffles an array in place using the Fisher-Yates algorithm.
   *
   * @param array - Array of characters to shuffle
   * @returns The shuffled array
   */
  generatePassword() {
    const pools: string[] = [];

    // add all active character sets
    if (this.uppercase()) pools.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (this.lowercase()) pools.push('abcdefghijklmnopqrstuvwxyz');
    if (this.numbers()) pools.push('0123456789');
    if (this.symbols()) pools.push('!@#$%^&*()');

    const generatedPassword: string[] = [];

    // ensure at least one character from each selected set is added
    for (const pool of pools) {
      generatedPassword.push(getRandomChar(pool));
    }

    // create a combined pool for random selection
    const combinedChars = pools.join('');

    // fill remaining length with random characters
    for (let i = this.chosenOptionsCount(); i < this.length(); i++) {
      generatedPassword.push(getRandomChar(combinedChars));
    }

    // shuffle and set the final password
    this.password.set(shuffle(generatedPassword).join(''));
  }
}

/**
 * Returns a random character from the given string.
 *
 * @param chars - String containing possible characters
 * @returns A randomly selected character
 */
const getRandomChar = (chars: string) => chars[Math.floor(Math.random() * chars.length)];

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 *
 * @param array - Array of characters to shuffle
 * @returns The shuffled array
 */
const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
