import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMng1000Component } from './user-mng1000.component';

describe('UserMng1000Component', () => {
  let component: UserMng1000Component;
  let fixture: ComponentFixture<UserMng1000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMng1000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMng1000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
