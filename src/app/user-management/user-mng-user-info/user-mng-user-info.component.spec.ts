import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMngUserInfoComponent } from './user-mng-user-info.component';

describe('UserMngUserInfoComponent', () => {
  let component: UserMngUserInfoComponent;
  let fixture: ComponentFixture<UserMngUserInfoComponent>;

  beforeEach(async(() => {
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
