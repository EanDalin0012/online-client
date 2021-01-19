import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserMngUserRoleAddComponent } from './user-mng-user-role-add.component';

describe('UserMngUserRoleAddComponent', () => {
  let component: UserMngUserRoleAddComponent;
  let fixture: ComponentFixture<UserMngUserRoleAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMngUserRoleAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngUserRoleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
