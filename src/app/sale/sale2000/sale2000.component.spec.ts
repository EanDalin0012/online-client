import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sale2000Component } from './sale2000.component';

describe('Sale2000Component', () => {
  let component: Sale2000Component;
  let fixture: ComponentFixture<Sale2000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sale2000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sale2000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
