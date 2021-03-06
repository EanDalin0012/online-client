import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserMngUserRoleEditComponent } from './user-mng-user-role-edit.component';

describe('UserMngUserRoleEditComponent', () => {
  let component: UserMngUserRoleEditComponent;
  let fixture: ComponentFixture<UserMngUserRoleEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMngUserRoleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngUserRoleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
