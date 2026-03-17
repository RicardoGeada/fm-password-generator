import { Component } from '@angular/core';
import { PasswordDisplay } from '../../components/password-display/password-display';

@Component({
  selector: 'app-generator',
  imports: [PasswordDisplay],
  templateUrl: './generator.html',
  styleUrl: './generator.scss',
})
export class Generator {}
