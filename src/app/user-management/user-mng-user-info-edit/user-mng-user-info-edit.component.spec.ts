import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserMngUserInfoEditComponent } from './user-mng-user-info-edit.component';

describe('UserMngUserInfoEditComponent', () => {
  let component: UserMngUserInfoEditComponent;
  let fixture: ComponentFixture<UserMngUserInfoEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMngUserInfoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngUserInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
