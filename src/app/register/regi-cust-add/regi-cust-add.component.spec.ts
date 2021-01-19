import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegiCustAddComponent } from './regi-cust-add.component';

describe('RegiCustAddComponent', () => {
  let component: RegiCustAddComponent;
  let fixture: ComponentFixture<RegiCustAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiCustAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiCustAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
