import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserMngUserInfoAddComponent } from './user-mng-user-info-add.component';

describe('UserMngUserInfoAddComponent', () => {
  let component: UserMngUserInfoAddComponent;
  let fixture: ComponentFixture<UserMngUserInfoAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMngUserInfoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngUserInfoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
