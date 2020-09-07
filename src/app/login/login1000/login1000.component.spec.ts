import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Login1000Component } from './login1000.component';

describe('Login1000Component', () => {
  let component: Login1000Component;
  let fixture: ComponentFixture<Login1000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Login1000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Login1000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
