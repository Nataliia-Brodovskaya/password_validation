import { Component, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-password-validation',
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

  checkStrength(password) {

    let strength = 0;

    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    
    const letters = /[A-Za-z]+/.test(password);
    const numbers = /[0-9]+/.test(password);
    const symbols = regex.test(password);
  
    const flags = [letters, numbers, symbols];
  
    let matches = 0;

    for (const flag of flags) {
      matches += flag === true ? 1 : 0;
    }

    strength += matches * 10;
  
    strength = (password.length < 8) ? 0 : strength;

    strength = (matches === 1) ? Math.min(strength, 10) : strength;
    strength = (matches === 2) ? Math.min(strength, 20) : strength;
    strength = (matches === 3) ? Math.min(strength, 30) : strength;

    return strength;

  }
  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes.passwordToCheck.currentValue;
    this.setPasswordColor(3, '#DDD');
    if (password) {
      const color = this.getColor(this.checkStrength(password));
      this.setPasswordColor(color.index, color.color);

      switch (color.index) {
        case 1:
          this.message = '';
          break;
        case 2:
          this.message = '';
          break;
        case 3:
          this.message = '';
          break;
        case 4:
          this.message = 'Minimum 8 characters';
          break;
      } 
    } else {
      this.message = '';
    }
  }
  
  private getColor(matches) {
    let index = 0;
    if (matches === 10) {
      index = 0;
    } else if (matches === 20) {
      index = 1;
    } else if (matches === 30) {
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
