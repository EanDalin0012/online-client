import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegiCustEditComponent } from './regi-cust-edit.component';

describe('RegiCustEditComponent', () => {
  let component: RegiCustEditComponent;
  let fixture: ComponentFixture<RegiCustEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiCustEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiCustEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
