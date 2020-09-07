import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMng2100Component } from './user-mng2100.component';

describe('UserMng2100Component', () => {
  let component: UserMng2100Component;
  let fixture: ComponentFixture<UserMng2100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMng2100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMng2100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
