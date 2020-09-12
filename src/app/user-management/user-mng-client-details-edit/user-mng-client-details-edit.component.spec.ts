import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMngClientDetailsEditComponent } from './user-mng-client-details-edit.component';

describe('UserMngClientDetailsEditComponent', () => {
  let component: UserMngClientDetailsEditComponent;
  let fixture: ComponentFixture<UserMngClientDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMngClientDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMngClientDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
