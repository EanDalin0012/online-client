import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMngUserRoleComponent } from './user-mng-user-role.component';

describe('UserMngUserRoleComponent', () => {
  let component: UserMngUserRoleComponent;
  let fixture: ComponentFixture<UserMngUserRoleComponent>;

  beforeEach(async(() => {
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
