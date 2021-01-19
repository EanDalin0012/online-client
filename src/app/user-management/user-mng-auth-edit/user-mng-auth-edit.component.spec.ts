import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserMngAuthEditComponent } from './user-mng-auth-edit.component';

describe('UserMngAuthEditComponent', () => {
  let component: UserMngAuthEditComponent;
  let fixture: ComponentFixture<UserMngAuthEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMngAuthEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngAuthEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
