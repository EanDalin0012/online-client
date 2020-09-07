import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Home2100Component } from './home2100.component';

describe('Home2100Component', () => {
  let component: Home2100Component;
  let fixture: ComponentFixture<Home2100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Home2100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home2100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
