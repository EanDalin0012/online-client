import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserMngUserRoleComponent } from './user-mng-user-role.component';

describe('UserMngUserRoleComponent', () => {
  let component: UserMngUserRoleComponent;
  let fixture: ComponentFixture<UserMngUserRoleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMngUserRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
