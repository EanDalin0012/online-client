import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserMngUserInfoComponent } from './user-mng-user-info.component';

describe('UserMngUserInfoComponent', () => {
  let component: UserMngUserInfoComponent;
  let fixture: ComponentFixture<UserMngUserInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMngUserInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
