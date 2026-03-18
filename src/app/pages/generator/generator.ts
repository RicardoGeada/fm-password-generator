import { Component } from '@angular/core';
import { PasswordDisplay } from '../../components/password-display/password-display';
import { PasswordSettings } from "../../components/password-settings/password-settings";

@Component({
  selector: 'app-generator',
  imports: [PasswordDisplay, PasswordSettings],
  templateUrl: './generator.html',
  styleUrl: './generator.scss',
})
export class Generator {}
