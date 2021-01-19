import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserMngAuthComponent } from './user-mng-auth.component';

describe('UserMngAuthComponent', () => {
  let component: UserMngAuthComponent;
  let fixture: ComponentFixture<UserMngAuthComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMngAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
