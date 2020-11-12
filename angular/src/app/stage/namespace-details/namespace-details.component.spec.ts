import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NamespaceDetailsComponent } from './namespace-details.component';

describe('NamespaceDetailsComponent', () => {
  let component: NamespaceDetailsComponent;
  let fixture: ComponentFixture<NamespaceDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NamespaceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamespaceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
