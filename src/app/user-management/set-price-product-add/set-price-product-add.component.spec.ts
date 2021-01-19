import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SetPriceProductAddComponent } from './set-price-product-add.component';

describe('SetPriceProductAddComponent', () => {
  let component: SetPriceProductAddComponent;
  let fixture: ComponentFixture<SetPriceProductAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPriceProductAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPriceProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
