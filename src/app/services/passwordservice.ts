import { computed, Injectable, Signal, signal } from '@angular/core';
import { PasswordStrengthType } from '../types/password.type';

const uppercasePool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercasePool = 'abcdefghijklmnopqrstuvwxyz';
const numbersPool = '0123456789';
const symbolsPool = '!@#$%^&*()';

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
  passwordStrength = computed<PasswordStrengthType>(() => {
    let poolSize = 0;

    if (this.uppercase()) poolSize += uppercasePool.length;
    if (this.lowercase()) poolSize += lowercasePool.length;
    if (this.numbers()) poolSize += numbersPool.length;
    if (this.symbols()) poolSize += symbolsPool.length;

    const entropy = this.length() * Math.log2(poolSize);

    if (this.length() === 0) return '';
    if (entropy < 28) return 'too-weak';
    if (entropy < 36) return 'weak';
    if (entropy < 60) return 'medium';
    return 'strong';
  });

  /**
   * Shuffles an array in place using the Fisher-Yates algorithm.
   *
   * @param array - Array of characters to shuffle
   * @returns The shuffled array
   */
  generatePassword() {
    const pools: string[] = [];

    // add all active character sets
    if (this.uppercase()) pools.push(uppercasePool);
    if (this.lowercase()) pools.push(lowercasePool);
    if (this.numbers()) pools.push(numbersPool);
    if (this.symbols()) pools.push(symbolsPool);

    const generatedPassword: string[] = [];

    // ensure at least one character from each selected set is added
    for (const pool of pools) {
      generatedPassword.push(this.getRandomChar(pool));
    }

    // create a combined pool for random selection
    const combinedChars = pools.join('');

    // fill remaining length with random characters
    for (let i = this.chosenOptionsCount(); i < this.length(); i++) {
      generatedPassword.push(this.getRandomChar(combinedChars));
    }

    // shuffle and set the final password
    this.password.set(this.shuffle(generatedPassword).join(''));
  }

  /**
   * Returns a random character from the given string.
   *
   * @param chars - String containing possible characters
   * @returns A randomly selected character
   */
  getRandomChar = (chars: string) => chars[Math.floor(Math.random() * chars.length)];

  /**
   * Shuffles an array in place using the Fisher-Yates algorithm.
   *
   * @param array - Array of characters to shuffle
   * @returns The shuffled array
   */
  shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  /**
   * Reset the password
   * @returns 
   */
  resetPassword = () => {
    return this.password.set('');
  };
}
