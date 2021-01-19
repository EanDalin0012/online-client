import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserMngAuthAddComponent } from './user-mng-auth-add.component';

describe('UserMngAuthAddComponent', () => {
  let component: UserMngAuthAddComponent;
  let fixture: ComponentFixture<UserMngAuthAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMngAuthAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngAuthAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
