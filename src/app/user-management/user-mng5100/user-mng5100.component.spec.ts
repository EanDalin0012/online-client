import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMng5100Component } from './user-mng5100.component';

describe('UserMng5100Component', () => {
  let component: UserMng5100Component;
  let fixture: ComponentFixture<UserMng5100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMng5100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMng5100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
