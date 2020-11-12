import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NamespaceEditComponent } from './namespace-edit.component';

describe('NamespaceEditComponent', () => {
  let component: NamespaceEditComponent;
  let fixture: ComponentFixture<NamespaceEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NamespaceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamespaceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
