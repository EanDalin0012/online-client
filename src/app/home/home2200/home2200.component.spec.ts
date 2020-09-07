import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Home2200Component } from './home2200.component';

describe('Home2200Component', () => {
  let component: Home2200Component;
  let fixture: ComponentFixture<Home2200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Home2200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home2200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
