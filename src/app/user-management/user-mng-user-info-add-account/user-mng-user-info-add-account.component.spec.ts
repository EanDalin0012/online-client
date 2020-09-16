import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMngUserInfoAddAccountComponent } from './user-mng-user-info-add-account.component';

describe('UserMngUserInfoAddAccountComponent', () => {
  let component: UserMngUserInfoAddAccountComponent;
  let fixture: ComponentFixture<UserMngUserInfoAddAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMngUserInfoAddAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngUserInfoAddAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
