import { Component, forwardRef, Input, SimpleChange, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PasswordValidationService } from './password-validation.service';

@Component({
  selector: 'password-validation',
  templateUrl: './password-validation.component.html',
  styleUrls: ['./password-validation.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordStrongComponent),
      multi: true
    }
  ]
})
export class PasswordStrongComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() public passwordToCheck: string;
  complexity0: string;
  complexity1: string;
  complexity2: string;
  form: FormGroup;
  message = '';

  private colors = ['lightred', 'yellow', 'green', 'red'];
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  private subscription: Subscription;

  constructor(
    private passwordValidationService: PasswordValidationService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      password: [''],
    });

    this.subscription = this.form.valueChanges.subscribe(value => {
      this.onChange(value.password);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes.passwordToCheck.currentValue;
    this.setPasswordColor(3, '#DDD');
    if (password) {
      const strength = this.passwordValidationService.checkPasswordStrength(password);
      const color = this.getPasswordColor(strength);
      this.setPasswordColor(color.index, color.color);
      this.message = color.index === 4 ? 'Minimum 8 characters' : '';
    } else {
      this.message = '';
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

  private setPasswordColor(index: number, color: string) {
    for (let n = 0; n < index; n++) {
      this['complexity' + n] = color;
    }
  }

  writeValue(value: any): void {
    this.form.patchValue({ password: value }, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
}

