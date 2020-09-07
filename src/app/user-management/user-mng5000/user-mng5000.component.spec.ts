import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMng5000Component } from './user-mng5000.component';

describe('UserMng5000Component', () => {
  let component: UserMng5000Component;
  let fixture: ComponentFixture<UserMng5000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMng5000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMng5000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
