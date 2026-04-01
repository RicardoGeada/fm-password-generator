import { Component } from '@angular/core';
import { PasswordService } from '../../services/passwordservice';

@Component({
  selector: 'app-password-display',
  imports: [],
  templateUrl: './password-display.html',
  styleUrl: './password-display.scss',
})
export class PasswordDisplay {

  constructor(public ps: PasswordService) {}

}
