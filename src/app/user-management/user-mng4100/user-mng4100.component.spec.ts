import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMng4100Component } from './user-mng4100.component';

describe('UserMng4100Component', () => {
  let component: UserMng4100Component;
  let fixture: ComponentFixture<UserMng4100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMng4100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMng4100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
