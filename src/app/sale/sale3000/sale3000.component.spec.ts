import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Sale3000Component } from './sale3000.component';

describe('Sale3000Component', () => {
  let component: Sale3000Component;
  let fixture: ComponentFixture<Sale3000Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Sale3000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sale3000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
