import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMng1200Component } from './user-mng1200.component';

describe('UserMng1200Component', () => {
  let component: UserMng1200Component;
  let fixture: ComponentFixture<UserMng1200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMng1200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMng1200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
