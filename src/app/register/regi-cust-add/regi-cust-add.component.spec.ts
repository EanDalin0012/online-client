import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiCustAddComponent } from './regi-cust-add.component';

describe('RegiCustAddComponent', () => {
  let component: RegiCustAddComponent;
  let fixture: ComponentFixture<RegiCustAddComponent>;

  beforeEach(async(() => {
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
