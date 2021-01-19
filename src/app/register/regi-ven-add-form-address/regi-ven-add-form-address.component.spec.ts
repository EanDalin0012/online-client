import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegiVenAddFormAddressComponent } from './regi-ven-add-form-address.component';

describe('RegiVenAddFormAddressComponent', () => {
  let component: RegiVenAddFormAddressComponent;
  let fixture: ComponentFixture<RegiVenAddFormAddressComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiVenAddFormAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiVenAddFormAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
