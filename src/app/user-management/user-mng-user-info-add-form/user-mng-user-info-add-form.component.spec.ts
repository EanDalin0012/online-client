import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserMngUserInfoAddFormComponent } from './user-mng-user-info-add-form.component';

describe('UserMngUserInfoAddFormComponent', () => {
  let component: UserMngUserInfoAddFormComponent;
  let fixture: ComponentFixture<UserMngUserInfoAddFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMngUserInfoAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngUserInfoAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
