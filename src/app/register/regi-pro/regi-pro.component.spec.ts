import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegiProComponent } from './regi-pro.component';

describe('RegiProComponent', () => {
  let component: RegiProComponent;
  let fixture: ComponentFixture<RegiProComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
