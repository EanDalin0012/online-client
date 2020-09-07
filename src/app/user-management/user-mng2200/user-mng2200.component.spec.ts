import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMng2200Component } from './user-mng2200.component';

describe('UserMng2200Component', () => {
  let component: UserMng2200Component;
  let fixture: ComponentFixture<UserMng2200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMng2200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMng2200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
