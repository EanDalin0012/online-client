import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMng1100Component } from './user-mng1100.component';

describe('UserMng1100Component', () => {
  let component: UserMng1100Component;
  let fixture: ComponentFixture<UserMng1100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMng1100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMng1100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
