import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserMngAuthRoleComponent } from './user-mng-auth-role.component';

describe('UserMngAuthRoleComponent', () => {
  let component: UserMngAuthRoleComponent;
  let fixture: ComponentFixture<UserMngAuthRoleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMngAuthRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngAuthRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
