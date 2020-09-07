import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMng3000Component } from './user-mng3000.component';

describe('UserMng3000Component', () => {
  let component: UserMng3000Component;
  let fixture: ComponentFixture<UserMng3000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMng3000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMng3000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
