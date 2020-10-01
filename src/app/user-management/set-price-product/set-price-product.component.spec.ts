import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPriceProductComponent } from './set-price-product.component';

describe('SetPriceProductComponent', () => {
  let component: SetPriceProductComponent;
  let fixture: ComponentFixture<SetPriceProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPriceProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPriceProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
