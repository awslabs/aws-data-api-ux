import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SecurityLoginComponent } from './security-login.component';

describe('SecurityLoginComponent', () => {
  let component: SecurityLoginComponent;
  let fixture: ComponentFixture<SecurityLoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
