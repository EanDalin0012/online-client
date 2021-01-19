import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegiProEditComponent } from './regi-pro-edit.component';

describe('RegiProEditComponent', () => {
  let component: RegiProEditComponent;
  let fixture: ComponentFixture<RegiProEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiProEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiProEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
