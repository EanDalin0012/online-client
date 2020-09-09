import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiCustComponent } from './regi-cust.component';

describe('RegiCustComponent', () => {
  let component: RegiCustComponent;
  let fixture: ComponentFixture<RegiCustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiCustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiCustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
