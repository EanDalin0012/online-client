import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMng3200Component } from './user-mng3200.component';

describe('UserMng3200Component', () => {
  let component: UserMng3200Component;
  let fixture: ComponentFixture<UserMng3200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMng3200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMng3200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
