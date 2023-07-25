import { Component, Input, SimpleChange } from '@angular/core';

import { PasswordValidationService } from './password-validation.service';

@Component({
  selector: 'password-validation',
  templateUrl: './password-validation.component.html',
  styleUrls: ['./password-validation.component.scss']
})
export class PasswordStrongComponent {
  @Input() public passwordToCheck: string;
  complexity0: string;
  complexity1: string;
  complexity2: string;

  message = '';

  private colors = ['lightred', 'yellow', 'green', 'red'];

  constructor(private passwordValidationService: PasswordValidationService) { }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes.passwordToCheck.currentValue;
    this.setPasswordColor(3, '#DDD');
    if (password) {
      const strength = this.passwordValidationService.checkPasswordStrength(password);
      const color = this.getPasswordColor(strength);
      this.setPasswordColor(color.index, color.color);

    this.message = color.index === 4 ? 'Minimum 8 characters' : '';
    } 
  }

  getPasswordColor(strength: number) {
    let index = 0;

    if (strength === 10) {
      index = 0;
    } else if (strength === 20) {
      index = 1;
    } else if (strength === 30) {
      index = 2;
    } else {
      index = 3;
    }

    return {
      index: index + 1,
      color: this.colors[index]
    };
  }

  private setPasswordColor(index, color) {
    for (let n = 0; n < index; n++) {
      this['complexity' + n] = color;
    }
  }
}
