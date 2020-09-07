import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMng4200Component } from './user-mng4200.component';

describe('UserMng4200Component', () => {
  let component: UserMng4200Component;
  let fixture: ComponentFixture<UserMng4200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMng4200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMng4200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
