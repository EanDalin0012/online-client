import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMng3100Component } from './user-mng3100.component';

describe('UserMng3100Component', () => {
  let component: UserMng3100Component;
  let fixture: ComponentFixture<UserMng3100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMng3100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMng3100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
