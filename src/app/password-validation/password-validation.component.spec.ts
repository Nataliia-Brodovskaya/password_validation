import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordStrongComponent } from './password-validation.component';

describe('PasswordStrongComponent', () => {
  let component: PasswordStrongComponent;
  let fixture: ComponentFixture<PasswordStrongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordStrongComponent]
    });
    fixture = TestBed.createComponent(PasswordStrongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
