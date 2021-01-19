import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LayoutBlankComponent } from './layout-blank.component';

describe('LayoutBlankComponent', () => {
  let component: LayoutBlankComponent;
  let fixture: ComponentFixture<LayoutBlankComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutBlankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
