import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidationService {

  checkPasswordStrength(password: string): number {
    
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const letters = /[A-Za-z]+/.test(password);
    const numbers = /[0-9]+/.test(password);
    const symbols = regex.test(password);

    const flags = [letters, numbers, symbols];

    let matches = flags.reduce((acc, flag) => acc + (flag ? 1 : 0), 0)

    let strength = matches * 10;

    strength = password.length < 8 ? 0 : strength;

    strength = matches === 1 ? Math.min(strength, 10) : strength;
    strength = matches === 2 ? Math.min(strength, 20) : strength;
    strength = matches === 3 ? Math.min(strength, 30) : strength;

    return strength;
  }

}
