import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SetPriceProductViewComponent } from './set-price-product-view.component';

describe('SetPriceProductViewComponent', () => {
  let component: SetPriceProductViewComponent;
  let fixture: ComponentFixture<SetPriceProductViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPriceProductViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPriceProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
