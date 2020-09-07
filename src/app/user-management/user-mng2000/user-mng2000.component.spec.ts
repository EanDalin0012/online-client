import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMng2000Component } from './user-mng2000.component';

describe('UserMng2000Component', () => {
  let component: UserMng2000Component;
  let fixture: ComponentFixture<UserMng2000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMng2000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMng2000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
