import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMng4000Component } from './user-mng4000.component';

describe('UserMng4000Component', () => {
  let component: UserMng4000Component;
  let fixture: ComponentFixture<UserMng4000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMng4000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMng4000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
