import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StageDetailsComponent } from './stage-details.component';

describe('StageDetailsComponent', () => {
  let component: StageDetailsComponent;
  let fixture: ComponentFixture<StageDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
