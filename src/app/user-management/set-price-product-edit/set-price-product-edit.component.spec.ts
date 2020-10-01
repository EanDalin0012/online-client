import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPriceProductEditComponent } from './set-price-product-edit.component';

describe('SetPriceProductEditComponent', () => {
  let component: SetPriceProductEditComponent;
  let fixture: ComponentFixture<SetPriceProductEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPriceProductEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPriceProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
