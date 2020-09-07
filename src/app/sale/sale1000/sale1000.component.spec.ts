import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sale1000Component } from './sale1000.component';

describe('Sale1000Component', () => {
  let component: Sale1000Component;
  let fixture: ComponentFixture<Sale1000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sale1000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sale1000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
