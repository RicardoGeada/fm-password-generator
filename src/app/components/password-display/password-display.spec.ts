import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordDisplay } from './password-display';

describe('PasswordDisplay', () => {
  let component: PasswordDisplay;
  let fixture: ComponentFixture<PasswordDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
