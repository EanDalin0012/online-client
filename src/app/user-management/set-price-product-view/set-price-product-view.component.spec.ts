import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPriceProductViewComponent } from './set-price-product-view.component';

describe('SetPriceProductViewComponent', () => {
  let component: SetPriceProductViewComponent;
  let fixture: ComponentFixture<SetPriceProductViewComponent>;

  beforeEach(async(() => {
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
