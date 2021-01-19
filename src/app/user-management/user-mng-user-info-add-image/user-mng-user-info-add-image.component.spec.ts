import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserMngUserInfoAddImageComponent } from './user-mng-user-info-add-image.component';

describe('UserMngUserInfoAddImageComponent', () => {
  let component: UserMngUserInfoAddImageComponent;
  let fixture: ComponentFixture<UserMngUserInfoAddImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMngUserInfoAddImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngUserInfoAddImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
