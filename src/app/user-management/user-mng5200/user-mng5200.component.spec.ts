import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMng5200Component } from './user-mng5200.component';

describe('UserMng5200Component', () => {
  let component: UserMng5200Component;
  let fixture: ComponentFixture<UserMng5200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMng5200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMng5200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
